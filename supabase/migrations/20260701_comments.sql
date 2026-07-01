-- Comments on feed posts (status, reading, photo)
CREATE TABLE IF NOT EXISTS comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_type TEXT NOT NULL CHECK (post_type IN ('status', 'reading', 'photo')),
  post_id UUID NOT NULL,
  user_id UUID NOT NULL,
  user_phone TEXT,
  body TEXT NOT NULL CHECK (char_length(btrim(body)) > 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS comments_post_idx ON comments (post_type, post_id, created_at);
CREATE INDEX IF NOT EXISTS comments_user_idx ON comments (user_id);

ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
-- No policies, consistent with every other table: all access goes through
-- the service-role client (adminSupabase) in server-side code.
