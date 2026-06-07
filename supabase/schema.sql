-- Run this in your Supabase project's SQL editor to set up the database.

-- Whitelist of phone numbers allowed to sign in
CREATE TABLE IF NOT EXISTS whitelist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone TEXT UNIQUE NOT NULL,   -- E.164 format: +15551234567
  name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Key-value content blocks for the feed page
CREATE TABLE IF NOT EXISTS content (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed default content keys (edit values via /admin)
INSERT INTO content (key, value) VALUES
  ('bio', ''),
  ('status', ''),
  ('reading_title', ''),
  ('reading_author', ''),
  ('reading_note', ''),
  ('address', ''),
  ('contact_email', ''),
  ('contact_phone', '')
ON CONFLICT (key) DO NOTHING;

-- Photo metadata (files live in Supabase Storage bucket named "photos")
CREATE TABLE IF NOT EXISTS photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  storage_path TEXT NOT NULL,
  caption TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Requests from people who want whitelist access
CREATE TABLE IF NOT EXISTS access_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone TEXT NOT NULL,
  name TEXT NOT NULL,
  note TEXT,
  status TEXT NOT NULL DEFAULT 'pending',  -- 'pending', 'approved', 'denied'
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE access_requests ENABLE ROW LEVEL SECURITY;

-- Row-level security: all operations go through the service role key server-side,
-- so enabling RLS here prevents any accidental direct client access.
ALTER TABLE whitelist ENABLE ROW LEVEL SECURITY;
ALTER TABLE content ENABLE ROW LEVEL SECURITY;
ALTER TABLE photos ENABLE ROW LEVEL SECURITY;

-- No client-side policies needed — the service role key bypasses RLS entirely.
-- If you want to allow authenticated users to read content directly from the client,
-- you can add policies like:
--   CREATE POLICY "auth_read_content" ON content FOR SELECT TO authenticated USING (true);
--   CREATE POLICY "auth_read_photos" ON photos FOR SELECT TO authenticated USING (true);

-- ────────────────────────────────────────────────────────────────────
-- Supabase Storage setup (do this in the Supabase dashboard):
--
-- 1. Go to Storage → New bucket
-- 2. Name: photos
-- 3. Public: NO (keep private — signed URLs are generated server-side)
-- 4. Allowed MIME types: image/*
-- ────────────────────────────────────────────────────────────────────

-- ────────────────────────────────────────────────────────────────────
-- Supabase Auth setup (do this in the Supabase dashboard):
--
-- 1. Go to Authentication → Providers → Phone
-- 2. Enable Phone provider
-- 3. Connect Twilio: add Account SID, Auth Token, and a messaging service SID
--    (or a Twilio phone number for sending SMS)
-- 4. Set OTP expiry to your preference (e.g. 600 seconds)
-- ────────────────────────────────────────────────────────────────────
