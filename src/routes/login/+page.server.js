import { fail, redirect } from '@sveltejs/kit';
import { normalizePhone } from '$lib/phone';
import { ensureWhitelistEntry } from '$lib/server/whitelist';
import { isMockMode, MOCK_OTP, setMockSessionPhone } from '$lib/server/mock-mode';

export const load = async ({ locals: { safeGetSession } }) => {
  const { session } = await safeGetSession();
  if (session) redirect(303, '/feed');
  return { mockMode: isMockMode(), mockOtp: MOCK_OTP };
};

export const actions = {
  sendOtp: async ({ request, locals: { supabase } }) => {
    const data = await request.formData();
    const phone = data.get('phone')?.toString().trim();

    if (!phone) return fail(400, { error: 'Phone number is required.' });

    const normalized = normalizePhone(phone);
    if (!normalized) {
      return fail(400, {
        error: 'Use a full phone number with country code, e.g. +14805551234.'
      });
    }

    const entry = await ensureWhitelistEntry(phone);
    if (!entry) {
      return fail(403, { error: "That number isn't on the guest list.", notWhitelisted: true, rejectedPhone: phone });
    }

    if (!isMockMode()) {
      const { error } = await supabase.auth.signInWithOtp({ phone: normalized });
      if (error) return fail(500, { error: 'Could not send code. Try again.' });
    }

    return { sent: true, phone: normalized };
  },

  verifyOtp: async ({ request, locals: { supabase }, cookies }) => {
    const data = await request.formData();
    const phone = data.get('phone')?.toString().trim();
    const token = data.get('token')?.toString().trim();

    if (!phone || !token) return fail(400, { error: 'Phone and code are required.' });

    const normalized = normalizePhone(phone);
    if (!normalized) return fail(400, { error: 'Invalid phone number.' });

    if (isMockMode()) {
      if (token !== MOCK_OTP) return fail(400, { error: 'Invalid or expired code.' });
      setMockSessionPhone(cookies, normalized);
      redirect(303, '/feed');
    }

    const { error } = await supabase.auth.verifyOtp({ phone: normalized, token, type: 'sms' });
    if (error) return fail(400, { error: 'Invalid or expired code.' });

    redirect(303, '/feed');
  }
};
