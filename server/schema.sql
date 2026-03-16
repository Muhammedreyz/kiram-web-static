CREATE TABLE IF NOT EXISTS early_access_submissions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  city TEXT DEFAULT '',
  user_type TEXT DEFAULT '',
  rent_amount TEXT DEFAULT '',
  consent_privacy INTEGER NOT NULL DEFAULT 0,
  consent_data_processing INTEGER NOT NULL DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now'))
);
