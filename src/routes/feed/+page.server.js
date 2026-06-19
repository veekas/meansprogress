import { adminSupabase } from '$lib/server/supabase';

export const load = async ({ parent }) => {
  const { isAdmin } = await parent();

  const [
    { data: contentRows },
    { data: photoRows },
    { data: statusPosts },
    { data: readingPosts },
    { count: statusCount },
    { count: readingCount },
    { count: photoCount }
  ] = await Promise.all([
    adminSupabase.from('content').select('key, value'),
    adminSupabase
      .from('photos')
      .select('id, storage_path, caption, sort_order')
      .order('sort_order', { ascending: false })
      .limit(1),
    adminSupabase
      .from('status_posts')
      .select('id, body, created_at')
      .order('created_at', { ascending: false })
      .limit(1),
    adminSupabase
      .from('reading_posts')
      .select('id, title, author, note, created_at')
      .order('created_at', { ascending: false })
      .limit(1),
    adminSupabase.from('status_posts').select('id', { count: 'exact', head: true }),
    adminSupabase.from('reading_posts').select('id', { count: 'exact', head: true }),
    adminSupabase.from('photos').select('id', { count: 'exact', head: true })
  ]);

  const content = Object.fromEntries((contentRows || []).map((r) => [r.key, r.value]));

  const photos = await Promise.all(
    (photoRows || []).map(async (photo) => {
      const { data } = await adminSupabase.storage
        .from('photos')
        .createSignedUrl(photo.storage_path, 3600);
      return { id: photo.id, caption: photo.caption, url: data?.signedUrl || null };
    })
  );

  return {
    content,
    photos,
    isAdmin,
    latestStatus: statusPosts?.[0] ?? null,
    latestReading: readingPosts?.[0] ?? null,
    statusCount: statusCount ?? 0,
    readingCount: readingCount ?? 0,
    photoCount: photoCount ?? 0
  };
};
