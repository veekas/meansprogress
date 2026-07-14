import { fail } from '@sveltejs/kit';
import { adminSupabase } from '$lib/server/supabase';
import { FEED_PAGE_SIZE, getPage, paginate } from '$lib/server/pagination';
import { addComment, deleteComment, getCommentsForPosts } from '$lib/server/comments';
import { isAdminUser } from '$lib/server/admin';

const POST_TYPE = 'music';

export const load = async ({ parent, url }) => {
  await parent();

  const page = getPage(url);
  const { count } = await adminSupabase
    .from('music_posts')
    .select('id', { count: 'exact', head: true });

  const totalCount = count ?? 0;
  const { currentPage, totalPages, from, to } = paginate(page, FEED_PAGE_SIZE, totalCount);

  const { data: postRows } = await adminSupabase
    .from('music_posts')
    .select('id, title, embed_url, height, note, created_at')
    .order('created_at', { ascending: false })
    .range(from, to);

  const commentsByPost = await getCommentsForPosts(
    POST_TYPE,
    (postRows || []).map((post) => post.id)
  );
  const posts = (postRows || []).map((post) => ({
    ...post,
    comments: commentsByPost[post.id] || []
  }));

  return {
    posts,
    page: currentPage,
    totalPages,
    totalCount
  };
};

export const actions = {
  addComment: async ({ request, locals: { safeGetSession } }) => {
    const { session, user } = await safeGetSession();
    if (!session) return fail(401, { commentError: 'Please sign in to comment.' });

    const formData = await request.formData();
    const postId = formData.get('post_id')?.toString();
    const body = formData.get('body')?.toString();

    const result = await addComment({ postType: POST_TYPE, postId, user, body });
    if (result.error) return fail(result.status, { commentError: result.error });

    return { commentAdded: true };
  },

  deleteComment: async ({ request, locals: { safeGetSession } }) => {
    const { session, user } = await safeGetSession();
    if (!session) return fail(401, { commentDeleteError: 'Please sign in.' });

    const formData = await request.formData();
    const id = formData.get('id')?.toString();

    const result = await deleteComment({ id, userId: user.id, isAdmin: isAdminUser(user) });
    if (result.error) return fail(result.status, { commentDeleteError: result.error });

    return { commentDeleted: true };
  }
};
