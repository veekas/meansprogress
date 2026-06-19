import { fail, redirect } from '@sveltejs/kit';
import { adminSupabase } from '$lib/server/supabase';
import { normalizePhone } from '$lib/phone';

export const load = async ({ locals: { safeGetSession } }) => {
  const { session } = await safeGetSession();
  if (session) redirect(303, '/feed');
  return {};
};

async function findWhitelistedPhone(phone) {
  const normalized = normalizePhone(phone);
  if (!normalized) return { normalized: null, entry: null };

  const { data: rows, error } = await adminSupabase.from('whitelist').select('phone');
  if (error) return { normalized, entry: null };

  const entry = (rows || []).find((row) => normalizePhone(row.phone) === normalized);
  if (entry && entry.phone !== normalized) {
    await adminSupabase.from('whitelist').update({ phone: normalized }).eq('phone', entry.phone);
    entry.phone = normalized;
  }
  return { normalized, entry: entry ?? null };
}

export const actions = {
  sendOtp: async ({ request, locals: { supabase } }) => {
    const data = await request.formData();
    const phone = data.get('phone')?.toString().trim();

    if (!phone) return fail(400, { error: 'Phone number is required.' });

    const { normalized, entry } = await findWhitelistedPhone(phone);

    if (!normalized) {
      return fail(400, {
        error: 'Use a full phone number with country code, e.g. +14805551234.'
      });
    }

    if (!entry) {
      return fail(403, { error: "That number isn't on the guest list.", notWhitelisted: true, rejectedPhone: phone });
    }

    const { error } = await supabase.auth.signInWithOtp({ phone: normalized });
    if (error) return fail(500, { error: 'Could not send code. Try again.' });

    return { sent: true, phone: normalized };
  },

  verifyOtp: async ({ request, locals: { supabase } }) => {
    const data = await request.formData();
    const phone = data.get('phone')?.toString().trim();
    const token = data.get('token')?.toString().trim();

    if (!phone || !token) return fail(400, { error: 'Phone and code are required.' });

    const normalized = normalizePhone(phone);
    if (!normalized) return fail(400, { error: 'Invalid phone number.' });

    const { error } = await supabase.auth.verifyOtp({ phone: normalized, token, type: 'sms' });
    if (error) return fail(400, { error: 'Invalid or expired code.' });

    redirect(303, '/feed');
  }
};
