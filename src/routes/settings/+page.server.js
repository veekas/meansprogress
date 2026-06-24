import { fail, redirect } from '@sveltejs/kit';
import { isAdminUser } from '$lib/server/admin';
import { adminSupabase } from '$lib/server/supabase';
import { normalizePhone } from '$lib/phone';
import { findWhitelistEntryByPhone, ensureWhitelistEntry } from '$lib/server/whitelist';

export const load = async ({ locals: { safeGetSession } }) => {
  const { session, user } = await safeGetSession();
  if (!session) redirect(303, '/login');
  if (isAdminUser(user)) redirect(303, '/admin');

  const entry = await ensureWhitelistEntry(user?.phone);
  if (!entry) redirect(303, '/feed');

  return {
    profile: {
      phone: entry.phone,
      email: entry.email || '',
      address: entry.address || ''
    }
  };
};

export const actions = {
  default: async ({ request, locals: { safeGetSession } }) => {
    const { session, user } = await safeGetSession();
    if (!session) return fail(401, { error: 'Sign in to update your info.' });
    if (isAdminUser(user)) return fail(403, { error: 'Unauthorized' });

    const entry = await ensureWhitelistEntry(user?.phone);
    if (!entry) return fail(403, { error: 'Your account was not found.' });

    const formData = await request.formData();
    const rawPhone = formData.get('phone')?.toString().trim();
    const phone = normalizePhone(rawPhone);
    const email = formData.get('email')?.toString().trim() || '';
    const address = formData.get('address')?.toString().trim() || '';

    if (!rawPhone) return fail(400, { error: 'Phone number is required.' });
    if (!phone) {
      return fail(400, {
        error: 'Use a full phone number with country code, e.g. +14805551234.'
      });
    }

    if (phone !== normalizePhone(entry.phone)) {
      const taken = await findWhitelistEntryByPhone(phone);
      if (taken && taken.id !== entry.id) {
        return fail(400, { error: 'That phone number is already in use.' });
      }
    }

    const { error } = await adminSupabase
      .from('whitelist')
      .update({ phone, email, address })
      .eq('id', entry.id);

    if (error) return fail(500, { error: 'Something went wrong. Try again.' });

    return { saved: true, profile: { phone, email, address } };
  }
};
