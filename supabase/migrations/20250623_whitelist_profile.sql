-- Contact fields guests can fill in via /settings.

ALTER TABLE whitelist
  ADD COLUMN IF NOT EXISTS email TEXT NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS address TEXT NOT NULL DEFAULT '';
