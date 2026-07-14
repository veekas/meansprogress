-- Run this in your Supabase project's SQL editor to set up the database.

-- Whitelist of phone numbers allowed to sign in
CREATE TABLE IF NOT EXISTS whitelist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone TEXT UNIQUE NOT NULL,   -- E.164 format: +15551234567
  name TEXT,
  email TEXT NOT NULL DEFAULT '',
  address TEXT NOT NULL DEFAULT '',
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

-- Historical status and reading posts for the feed
CREATE TABLE IF NOT EXISTS status_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  body TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS reading_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  author TEXT NOT NULL DEFAULT '',
  note TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Apple Music embeds for the feed
CREATE TABLE IF NOT EXISTS music_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL DEFAULT '',
  embed_url TEXT NOT NULL,
  height INTEGER NOT NULL DEFAULT 450,
  note TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Photo metadata (files live in Supabase Storage bucket named "photos")
CREATE TABLE IF NOT EXISTS photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  storage_path TEXT NOT NULL,
  caption TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Feedback from logged-in feed users
CREATE TABLE IF NOT EXISTS feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL CHECK (type IN ('bug', 'feature', 'other')),
  body TEXT NOT NULL,
  user_phone TEXT,
  user_id UUID,
  page_url TEXT,
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

-- Comments on feed posts (status, reading, photo, music)
CREATE TABLE IF NOT EXISTS comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_type TEXT NOT NULL CHECK (post_type IN ('status', 'reading', 'photo', 'music')),
  post_id UUID NOT NULL,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  user_phone TEXT,
  body TEXT NOT NULL CHECK (char_length(btrim(body)) > 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS comments_post_idx ON comments (post_type, post_id, created_at);
CREATE INDEX IF NOT EXISTS comments_user_idx ON comments (user_id);

ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;
CREATE INDEX IF NOT EXISTS feedback_created_at_idx ON feedback (created_at DESC);
ALTER TABLE access_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Row-level security: all operations go through the service role key server-side,
-- so enabling RLS here prevents any accidental direct client access.
ALTER TABLE whitelist ENABLE ROW LEVEL SECURITY;
ALTER TABLE content ENABLE ROW LEVEL SECURITY;
ALTER TABLE status_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE reading_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE music_posts ENABLE ROW LEVEL SECURITY;
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
