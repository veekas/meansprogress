import { fail, redirect } from '@sveltejs/kit';
import { friendlyDbError } from '$lib/adminForm';
import { isAdminUser } from '$lib/server/admin';
import { ensureWhitelistEntry, getGuestContact, updateGuestContact } from '$lib/server/whitelist';

export const load = async ({ locals: { safeGetSession } }) => {
  const { session, user } = await safeGetSession();
  if (!session) redirect(303, '/login');
  if (isAdminUser(user)) redirect(303, '/admin');

  const entry = await ensureWhitelistEntry(user?.phone);
  if (!entry) redirect(303, '/feed');

  const contact = await getGuestContact(entry);
  if (!contact) redirect(303, '/feed');

  return { profile: contact };
};

export const actions = {
  default: async ({ request, locals: { safeGetSession } }) => {
    const { session, user } = await safeGetSession();
    if (!session) return fail(401, { error: 'Sign in to update your info.' });
    if (isAdminUser(user)) return fail(403, { error: 'Unauthorized' });

    const entry = await ensureWhitelistEntry(user?.phone);
    if (!entry) return fail(403, { error: 'Your account was not found.' });

    const formData = await request.formData();
    const email = formData.get('email')?.toString().trim() || '';
    const address = formData.get('address')?.toString().trim() || '';

    const result = await updateGuestContact(user?.phone, { email, address });

    if (!result.ok) {
      if (result.reason === 'not_found') {
        return fail(403, { error: 'Your account was not found.', profile: { phone: entry.phone, email, address } });
      }
      return fail(500, {
        error: friendlyDbError(result.error),
        profile: { phone: entry.phone, email, address }
      });
    }

    return { saved: true, profile: result.profile };
  }
};
