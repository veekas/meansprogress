import { normalizePhone } from '$lib/phone';
import { notifyFeedback } from '$lib/server/notify';
import { adminSupabase } from '$lib/server/supabase';

const VALID_TYPES = new Set(['bug', 'feature', 'other']);

const TYPE_LABELS = {
  bug: 'Bug report',
  feature: 'Feature request',
  other: 'Other'
};

/** Validate, persist, and notify on feedback submission. */
export async function submitFeedback({ type, body, user, page }) {
  if (!type || !VALID_TYPES.has(type)) {
    return { error: 'Pick a feedback type.', status: 400 };
  }

  const message = body?.trim();
  if (!message) return { error: 'Message is required.', status: 400 };
  if (message.length > 5000) return { error: 'Message is too long.', status: 400 };

  const phone = normalizePhone(user?.phone) || user?.phone || null;

  const { error } = await adminSupabase.from('feedback').insert({
    type,
    body: message,
    user_phone: phone,
    user_id: user?.id || null,
    page_url: page || null
  });

  if (error) {
    console.error('Failed to save feedback:', error);
    return { error: 'Something went wrong. Try again.', status: 500 };
  }

  await notifyFeedback({
    type: TYPE_LABELS[type] || type,
    body: message,
    phone,
    page
  });

  return { ok: true };
}
