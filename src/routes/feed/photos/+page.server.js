import { fail } from '@sveltejs/kit';
import { adminSupabase } from '$lib/server/supabase';
import { PHOTOS_PAGE_SIZE, getPage, paginate } from '$lib/server/pagination';
import { addComment, deleteComment, getCommentsForPosts } from '$lib/server/comments';
import { isAdminUser } from '$lib/server/admin';

const POST_TYPE = 'photo';

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

  const commentsByPost = await getCommentsForPosts(
    POST_TYPE,
    (photoRows || []).map((photo) => photo.id)
  );

  const photos = await Promise.all(
    (photoRows || []).map(async (photo) => {
      const { data } = await adminSupabase.storage
        .from('photos')
        .createSignedUrl(photo.storage_path, 3600);
      return {
        id: photo.id,
        caption: photo.caption,
        created_at: photo.created_at,
        url: data?.signedUrl || null,
        comments: commentsByPost[photo.id] || []
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
