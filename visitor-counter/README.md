# Visitor Counter

This is a small counter API for the static blog.

It counts one visit per visitor per KST day, so refreshes do not increase the visible count.

The Worker derives the daily visitor key from Cloudflare's client IP header and the User-Agent, then stores only a salted SHA-256 hash. The frontend does not create or send a visitor ID.

The API keeps daily visitor keys in `visits`, but visible stats are read from `daily_counts` so the public widget does not scan the full visit log.

The frontend reads:

- `POST /hit`
- `GET /stats`

Expected response:

```json
{ "today": 1, "week": 7, "total": 42 }
```

Set the Astro frontend endpoint with:

```bash
PUBLIC_VISITOR_COUNTER_ENDPOINT=https://your-worker.example.workers.dev
```

The Worker expects a D1 binding named `DB` and uses `schema.sql`.

## Setup

Install and authenticate Wrangler:

```bash
npm create cloudflare@latest -- --help
npx wrangler login
```

Create the D1 database:

```bash
npx wrangler d1 create behind-the-frame-counter
```

Copy `wrangler.toml.example` to `wrangler.toml`, then paste the generated `database_id` into:

```toml
[[d1_databases]]
binding = "DB"
database_name = "behind-the-frame-counter"
database_id = "<D1_DATABASE_ID>"
```

`wrangler.toml` is local deployment configuration and is intentionally ignored by Git. Commit `wrangler.toml.example`, not `wrangler.toml`.

Apply the schema:

```bash
npx wrangler d1 execute behind-the-frame-counter --remote --file=./schema.sql
```

Deploy:

```bash
npx wrangler deploy
```

Then set your static blog build variable:

```bash
PUBLIC_VISITOR_COUNTER_ENDPOINT=https://behind-the-frame-counter.<your-subdomain>.workers.dev
```

Required before accepting `/hit` requests:

```bash
npx wrangler secret put VISITOR_SALT
```

Use any long random string for `VISITOR_SALT`. This makes stored visitor keys harder to correlate if the database is ever exported.

For manual hit testing, include the allowed origin header:

```bash
curl -X POST https://behind-the-frame-counter.<your-subdomain>.workers.dev/hit \
  -H "origin: https://yunsang1ee.github.io" \
  -H "content-type: application/json" \
  -d "{\"path\":\"/\"}"
```
