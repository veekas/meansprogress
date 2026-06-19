import { adminSupabase } from '$lib/server/supabase';
import { FEED_PAGE_SIZE, getPage, paginate } from '$lib/server/pagination';

export const load = async ({ parent, url }) => {
  await parent();

  const page = getPage(url);
  const { count } = await adminSupabase
    .from('reading_posts')
    .select('id', { count: 'exact', head: true });

  const totalCount = count ?? 0;
  const { currentPage, totalPages, from, to } = paginate(page, FEED_PAGE_SIZE, totalCount);

  const { data: posts } = await adminSupabase
    .from('reading_posts')
    .select('id, title, author, note, created_at')
    .order('created_at', { ascending: false })
    .range(from, to);

  return {
    posts: posts || [],
    page: currentPage,
    totalPages,
    totalCount
  };
};
