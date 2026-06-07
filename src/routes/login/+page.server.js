import { fail, redirect } from '@sveltejs/kit';
import { adminSupabase } from '$lib/server/supabase';

export const load = async ({ locals: { safeGetSession } }) => {
  const { session } = await safeGetSession();
  if (session) redirect(303, '/feed');
  return {};
};

export const actions = {
  sendOtp: async ({ request, locals: { supabase } }) => {
    const data = await request.formData();
    const phone = data.get('phone')?.toString().trim();

    if (!phone) return fail(400, { error: 'Phone number is required.' });

    const { data: entry } = await adminSupabase
      .from('whitelist')
      .select('phone')
      .eq('phone', phone)
      .single();

    if (!entry) {
      return fail(403, { error: "That number isn't on the guest list." });
    }

    const { error } = await supabase.auth.signInWithOtp({ phone });
    if (error) return fail(500, { error: 'Could not send code. Try again.' });

    return { sent: true, phone };
  },

  verifyOtp: async ({ request, locals: { supabase } }) => {
    const data = await request.formData();
    const phone = data.get('phone')?.toString().trim();
    const token = data.get('token')?.toString().trim();

    if (!phone || !token) return fail(400, { error: 'Phone and code are required.' });

    const { error } = await supabase.auth.verifyOtp({ phone, token, type: 'sms' });
    if (error) return fail(400, { error: 'Invalid or expired code.' });

    redirect(303, '/feed');
  }
};
