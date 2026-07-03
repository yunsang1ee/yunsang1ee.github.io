const TIME_ZONE = "Asia/Seoul";
const DEFAULT_ALLOWED_ORIGIN = "https://yunsang1ee.github.io";
const MAX_HIT_BODY_BYTES = 1024;

const json = (data, init = {}) =>
  new Response(JSON.stringify(data), {
    ...init,
    headers: {
      "content-type": "application/json; charset=utf-8",
      ...(init.headers ?? {})
    }
  });

const getAllowedOrigin = (request, env) => {
  const origin = request.headers.get("origin") ?? "";
  const allowed = (env.ALLOWED_ORIGIN ?? DEFAULT_ALLOWED_ORIGIN)
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);

  if (allowed.includes("*")) return "*";
  if (allowed.includes(origin)) return origin;
  if (origin.startsWith("http://127.0.0.1:") || origin.startsWith("http://localhost:")) return origin;
  return allowed[0] ?? DEFAULT_ALLOWED_ORIGIN;
};

const isAllowedOrigin = (request, env) => {
  const origin = request.headers.get("origin") ?? "";
  if (!origin) return false;

  const allowed = (env.ALLOWED_ORIGIN ?? DEFAULT_ALLOWED_ORIGIN)
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);

  return (
    allowed.includes("*") ||
    allowed.includes(origin) ||
    origin.startsWith("http://127.0.0.1:") ||
    origin.startsWith("http://localhost:")
  );
};

const corsHeaders = (request, env) => ({
  "access-control-allow-origin": getAllowedOrigin(request, env),
  "access-control-allow-methods": "GET,POST,OPTIONS",
  "access-control-allow-headers": "content-type",
  "access-control-max-age": "86400",
  "cache-control": "no-store",
  vary: "Origin"
});

const kstDate = (offsetDays = 0) => {
  const date = new Date(Date.now() + offsetDays * 24 * 60 * 60 * 1000);
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(date);
};

const recentDates = (count) => Array.from({ length: count }, (_, index) => kstDate(-index));

const hashText = async (text) => {
  const data = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
};

const readJson = async (request) => {
  try {
    return await request.json();
  } catch {
    return {};
  }
};

const getVisitorSalt = (env) => {
  const salt = env.VISITOR_SALT;
  if (typeof salt !== "string" || salt.length < 16) {
    throw new Error("VISITOR_SALT is not configured");
  }
  return salt;
};

const isOversizedHit = (request) => {
  const contentLength = Number(request.headers.get("content-length") ?? "0");
  return Number.isFinite(contentLength) && contentLength > MAX_HIT_BODY_BYTES;
};

const sanitizePath = (path) => {
  if (typeof path !== "string") return "/";
  const trimmed = path.trim();
  if (!trimmed.startsWith("/")) return "/";
  return trimmed.slice(0, 300);
};

const getStats = async (db) => {
  const today = kstDate();
  const weekDates = recentDates(7);
  const placeholders = weekDates.map(() => "?").join(",");

  const todayRow = await db.prepare("SELECT unique_visitors AS count FROM daily_counts WHERE visit_date = ?").bind(today).first();
  const weekRow = await db
    .prepare(`SELECT COALESCE(SUM(unique_visitors), 0) AS count FROM daily_counts WHERE visit_date IN (${placeholders})`)
    .bind(...weekDates)
    .first();
  const totalRow = await db.prepare("SELECT COALESCE(SUM(unique_visitors), 0) AS count FROM daily_counts").first();

  return {
    today: Number(todayRow?.count ?? 0),
    week: Number(weekRow?.count ?? 0),
    total: Number(totalRow?.count ?? 0)
  };
};

const recordVisit = async (request, env) => {
  const body = await readJson(request);
  const userAgent = (request.headers.get("user-agent") ?? "").slice(0, 300);
  const ip =
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";
  const rawVisitorId = `${ip}|${userAgent}`;

  const salt = getVisitorSalt(env);
  const visitorKey = await hashText(`${salt}:${rawVisitorId}`);
  const visitDate = kstDate();
  const now = new Date().toISOString();
  const path = sanitizePath(body.path);

  const inserted = await env.DB.prepare(
    `INSERT INTO visits (visitor_key, visit_date, first_path, first_seen, last_seen)
     VALUES (?, ?, ?, ?, ?)
     ON CONFLICT(visitor_key, visit_date) DO NOTHING
     RETURNING 1 AS inserted`
  )
    .bind(visitorKey, visitDate, path, now, now)
    .first();

  if (inserted?.inserted) {
    await env.DB.prepare(
      `INSERT INTO daily_counts (visit_date, unique_visitors)
       VALUES (?, 1)
       ON CONFLICT(visit_date) DO UPDATE SET unique_visitors = unique_visitors + 1`
    )
      .bind(visitDate)
      .run();
  } else {
    await env.DB.prepare("UPDATE visits SET last_seen = ? WHERE visitor_key = ? AND visit_date = ?")
      .bind(now, visitorKey, visitDate)
      .run();
  }

  return getStats(env.DB);
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const headers = corsHeaders(request, env);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers });
    }

    if (url.pathname === "/stats" && request.method === "GET") {
      return json(await getStats(env.DB), { headers });
    }

    if (url.pathname === "/hit" && request.method === "POST") {
      if (!isAllowedOrigin(request, env)) {
        return json({ error: "forbidden_origin" }, { status: 403, headers });
      }

      if (isOversizedHit(request)) {
        return json({ error: "payload_too_large" }, { status: 413, headers });
      }

      return json(await recordVisit(request, env), { headers });
    }

    return json({ error: "not_found" }, { status: 404, headers });
  }
};
