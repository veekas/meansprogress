import { redirect } from '@sveltejs/kit';
import { isAdminUser } from '$lib/server/admin';
import { ensureWhitelistEntry, getGuestContact, isProfileIncomplete } from '$lib/server/whitelist';

/** Redirect to login when there is no session; returns feed layout data. */
export async function requireFeedSession(safeGetSession) {
  const { session, user } = await safeGetSession();
  if (!session) redirect(303, '/login');

  const isAdmin = isAdminUser(user);
  let profileIncomplete = false;

  if (!isAdmin) {
    const entry = await ensureWhitelistEntry(user?.phone);
    const contact = await getGuestContact(entry);
    profileIncomplete = isProfileIncomplete(contact);
  }

  return { isAdmin, profileIncomplete };
}
