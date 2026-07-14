-- Music posts (Apple Music embeds) for the feed
CREATE TABLE IF NOT EXISTS music_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL DEFAULT '',
  embed_url TEXT NOT NULL,
  height INTEGER NOT NULL DEFAULT 450,
  note TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE music_posts ENABLE ROW LEVEL SECURITY;

-- Allow comments on music posts
ALTER TABLE comments DROP CONSTRAINT IF EXISTS comments_post_type_check;
ALTER TABLE comments ADD CONSTRAINT comments_post_type_check
  CHECK (post_type IN ('status', 'reading', 'photo', 'music'));
