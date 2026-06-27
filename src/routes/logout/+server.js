import { redirect } from '@sveltejs/kit';
import { clearMockSession, isMockMode } from '$lib/server/mock-mode';

export const POST = async ({ locals: { supabase }, cookies }) => {
  if (isMockMode()) {
    clearMockSession(cookies);
  } else {
    await supabase.auth.signOut();
  }
  redirect(303, '/');
};
