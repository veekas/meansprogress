import { redirect } from '@sveltejs/kit';

export const POST = async ({ locals: { supabase } }) => {
  await supabase.auth.signOut();
  redirect(303, '/');
};
