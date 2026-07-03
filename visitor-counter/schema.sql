CREATE TABLE IF NOT EXISTS visits (
  visitor_key TEXT NOT NULL,
  visit_date TEXT NOT NULL,
  first_path TEXT,
  first_seen TEXT NOT NULL,
  last_seen TEXT NOT NULL,
  PRIMARY KEY (visitor_key, visit_date)
);

CREATE INDEX IF NOT EXISTS idx_visits_date ON visits (visit_date);

CREATE TABLE IF NOT EXISTS daily_counts (
  visit_date TEXT PRIMARY KEY,
  unique_visitors INTEGER NOT NULL DEFAULT 0
);

INSERT OR IGNORE INTO daily_counts (visit_date, unique_visitors)
SELECT visit_date, COUNT(*)
FROM visits
GROUP BY visit_date;
