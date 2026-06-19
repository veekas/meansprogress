import { redirect } from '@sveltejs/kit';
import { isAdminUser } from '$lib/server/admin';

/** Redirect to login when there is no session; returns isAdmin for feed routes. */
export async function requireFeedSession(safeGetSession) {
  const { session, user } = await safeGetSession();
  if (!session) redirect(303, '/login');
  return { isAdmin: isAdminUser(user) };
}
