import { fail } from '@sveltejs/kit';
import { adminSupabase } from '$lib/server/supabase';

export const load = async ({ url }) => {
  // Pre-fill phone if arriving from the login rejection flow
  return { prefillPhone: url.searchParams.get('phone') || '' };
};

export const actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    const phone = formData.get('phone')?.toString().trim();
    const name = formData.get('name')?.toString().trim();
    const note = formData.get('note')?.toString().trim() || null;

    if (!phone) return fail(400, { error: 'Phone number is required.' });
    if (!name) return fail(400, { error: 'Name is required.' });

    // Already on whitelist → just tell them to sign in
    const { data: existing } = await adminSupabase
      .from('whitelist')
      .select('phone')
      .eq('phone', phone)
      .single();

    if (existing) {
      return fail(400, { error: 'That number already has access. Try signing in.', alreadyHasAccess: true });
    }

    // Duplicate pending request guard
    const { data: pending } = await adminSupabase
      .from('access_requests')
      .select('id')
      .eq('phone', phone)
      .eq('status', 'pending')
      .single();

    if (pending) {
      return { alreadySent: true };
    }

    const { error } = await adminSupabase
      .from('access_requests')
      .insert({ phone, name, note });

    if (error) return fail(500, { error: 'Something went wrong. Try again.' });

    return { sent: true };
  }
};
