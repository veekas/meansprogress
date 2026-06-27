import { dev } from '$app/environment';
import { env } from '$env/dynamic/private';

/** Fixed OTP accepted in local mock mode. */
export const MOCK_OTP = '000000';

export const MOCK_SESSION_COOKIE = 'dev_mock_phone';

/** True when `npm run dev` and DEV_MOCK is enabled — never in production builds. */
export function isMockMode() {
  if (!dev) return false;
  const v = env.DEV_MOCK?.toLowerCase();
  return v === '1' || v === 'true' || v === 'yes';
}

/** @param {import('@sveltejs/kit').Cookies} cookies */
export function getMockSessionPhone(cookies) {
  if (!isMockMode()) return null;
  return cookies.get(MOCK_SESSION_COOKIE) || null;
}

/** @param {import('@sveltejs/kit').Cookies} cookies @param {string} phone */
export function setMockSessionPhone(cookies, phone) {
  cookies.set(MOCK_SESSION_COOKIE, phone, {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30
  });
}

/** @param {import('@sveltejs/kit').Cookies} cookies */
export function clearMockSession(cookies) {
  cookies.delete(MOCK_SESSION_COOKIE, { path: '/' });
}

/** @param {string} phone */
export function mockAuthUser(phone) {
  return { id: 'mock-dev-user', phone };
}
