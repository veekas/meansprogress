-- Historical status and reading posts for the feed.

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

ALTER TABLE status_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE reading_posts ENABLE ROW LEVEL SECURITY;

-- Migrate existing single-value content into the first history row.
INSERT INTO status_posts (body, created_at)
SELECT value, COALESCE(updated_at, NOW())
FROM content
WHERE key = 'status'
  AND value <> ''
  AND NOT EXISTS (SELECT 1 FROM status_posts);

INSERT INTO reading_posts (title, author, note, created_at)
SELECT
  title.value,
  COALESCE(author.value, ''),
  COALESCE(note.value, ''),
  COALESCE(title.updated_at, NOW())
FROM content AS title
LEFT JOIN content AS author ON author.key = 'reading_author'
LEFT JOIN content AS note ON note.key = 'reading_note'
WHERE title.key = 'reading_title'
  AND title.value <> ''
  AND NOT EXISTS (SELECT 1 FROM reading_posts);
