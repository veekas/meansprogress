import { adminSupabase } from '$lib/server/supabase';
import { PHOTOS_PAGE_SIZE, getPage, paginate } from '$lib/server/pagination';

export const load = async ({ parent, url }) => {
  await parent();

  const page = getPage(url);
  const { count } = await adminSupabase.from('photos').select('id', { count: 'exact', head: true });

  const totalCount = count ?? 0;
  const { currentPage, totalPages, from, to } = paginate(page, PHOTOS_PAGE_SIZE, totalCount);

  const { data: photoRows } = await adminSupabase
    .from('photos')
    .select('id, storage_path, caption, sort_order, created_at')
    .order('sort_order', { ascending: false })
    .range(from, to);

  const photos = await Promise.all(
    (photoRows || []).map(async (photo) => {
      const { data } = await adminSupabase.storage
        .from('photos')
        .createSignedUrl(photo.storage_path, 3600);
      return {
        id: photo.id,
        caption: photo.caption,
        created_at: photo.created_at,
        url: data?.signedUrl || null
      };
    })
  );

  return {
    photos,
    page: currentPage,
    totalPages,
    totalCount
  };
};
