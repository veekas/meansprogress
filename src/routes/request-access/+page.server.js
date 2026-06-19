import { fail } from '@sveltejs/kit';
import { normalizePhone } from '$lib/phone';
import { adminSupabase } from '$lib/server/supabase';

export const load = async ({ url }) => {
  const raw = url.searchParams.get('phone') || '';
  return { prefillPhone: normalizePhone(raw) || raw };
};

export const actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    const rawPhone = formData.get('phone')?.toString().trim();
    const phone = normalizePhone(rawPhone);
    const name = formData.get('name')?.toString().trim();
    const note = formData.get('note')?.toString().trim() || null;

    if (!rawPhone) return fail(400, { error: 'Phone number is required.' });
    if (!phone) {
      return fail(400, {
        error: 'Use a full phone number, e.g. +14805551234 or 4805551234.'
      });
    }
    if (!name) return fail(400, { error: 'Name is required.' });

    const [{ data: whitelistRows }, { data: pendingRows }] = await Promise.all([
      adminSupabase.from('whitelist').select('phone'),
      adminSupabase.from('access_requests').select('id, phone').eq('status', 'pending')
    ]);

    const onWhitelist = (whitelistRows || []).some(
      (row) => normalizePhone(row.phone) === phone
    );
    if (onWhitelist) {
      return fail(400, {
        error: 'That number already has access. Try signing in.',
        alreadyHasAccess: true
      });
    }

    const hasPending = (pendingRows || []).some(
      (row) => normalizePhone(row.phone) === phone
    );
    if (hasPending) {
      return { alreadySent: true };
    }

    const { error } = await adminSupabase
      .from('access_requests')
      .insert({ phone, name, note });

    if (error) return fail(500, { error: 'Something went wrong. Try again.' });

    return { sent: true };
  }
};
