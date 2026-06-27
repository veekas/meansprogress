import { json } from '@sveltejs/kit';
import { submitFeedback } from '$lib/server/feedback';

export const POST = async ({ request, locals: { safeGetSession } }) => {
  const { session, user } = await safeGetSession();
  if (!session) return json({ error: 'Unauthorized' }, { status: 401 });

  const formData = await request.formData();
  const type = formData.get('type')?.toString();
  const body = formData.get('body')?.toString();
  const page = formData.get('page')?.toString().trim() || null;

  const result = await submitFeedback({ type, body, user, page });
  if (result.error) {
    return json({ error: result.error }, { status: result.status || 400 });
  }

  return json({ ok: true });
};
