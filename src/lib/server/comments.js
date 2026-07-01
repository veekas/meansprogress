import { normalizePhone } from '$lib/phone';
import { notifyComment } from '$lib/server/notify';
import { adminSupabase } from '$lib/server/supabase';

const MAX_COMMENT_LENGTH = 2000;

/** Fetch comments for a page of posts, grouped by post_id. */
export async function getCommentsForPosts(postType, postIds) {
  if (!postIds?.length) return {};

  const { data, error } = await adminSupabase
    .from('comments')
    .select('id, post_id, user_id, user_phone, body, created_at')
    .eq('post_type', postType)
    .in('post_id', postIds)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Failed to load comments:', error);
    return {};
  }

  const byPost = {};
  for (const comment of data || []) {
    (byPost[comment.post_id] ||= []).push(comment);
  }
  return byPost;
}

/** Validate, persist, and notify on a new comment. */
export async function addComment({ postType, postId, user, body }) {
  if (!user?.id) return { error: 'Unauthorized.', status: 401 };
  if (!postId) return { error: 'Missing post.', status: 400 };

  const message = body?.trim();
  if (!message) return { error: 'Comment is required.', status: 400 };
  if (message.length > MAX_COMMENT_LENGTH) return { error: 'Comment is too long.', status: 400 };

  const phone = normalizePhone(user?.phone) || user?.phone || null;

  const { error } = await adminSupabase.from('comments').insert({
    post_type: postType,
    post_id: postId,
    user_id: user.id,
    user_phone: phone,
    body: message
  });

  if (error) {
    console.error('Failed to save comment:', error);
    return { error: 'Something went wrong. Try again.', status: 500 };
  }

  await notifyComment({ postType, body: message, phone });

  return { ok: true };
}

/** Delete a comment if the requester owns it or is the admin. */
export async function deleteComment({ id, userId, isAdmin }) {
  if (!userId) return { error: 'Unauthorized.', status: 401 };
  if (!id) return { error: 'Missing comment ID.', status: 400 };

  const { data: comment, error: fetchError } = await adminSupabase
    .from('comments')
    .select('user_id')
    .eq('id', id)
    .maybeSingle();

  if (fetchError) {
    console.error('Failed to load comment:', fetchError);
    return { error: 'Something went wrong. Try again.', status: 500 };
  }

  if (!comment) return { error: 'Comment not found.', status: 404 };
  if (comment.user_id !== userId && !isAdmin) {
    return { error: 'You cannot delete this comment.', status: 403 };
  }

  const { error } = await adminSupabase.from('comments').delete().eq('id', id);
  if (error) {
    console.error('Failed to delete comment:', error);
    return { error: 'Something went wrong. Try again.', status: 500 };
  }

  return { ok: true };
}
