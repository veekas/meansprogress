import { normalizePhone } from '$lib/phone';
import { env } from '$env/dynamic/private';

/** True when the signed-in user's phone matches ADMIN_PHONE (E.164, normalized). */
export function isAdminUser(user) {
  const userPhone = normalizePhone(user?.phone);
  const adminPhone = normalizePhone(env.ADMIN_PHONE);
  return !!(userPhone && adminPhone && userPhone === adminPhone);
}
