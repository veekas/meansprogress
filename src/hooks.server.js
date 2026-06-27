import { createServerClient } from '@supabase/ssr';
import { env as pubEnv } from '$env/dynamic/public';
import {
  getMockSessionPhone,
  isMockMode,
  mockAuthUser
} from '$lib/server/mock-mode';

export async function handle({ event, resolve }) {
  if (isMockMode()) {
    event.locals.supabase = null;
    event.locals.safeGetSession = async () => {
      const phone = getMockSessionPhone(event.cookies);
      if (!phone) return { session: null, user: null };
      const user = mockAuthUser(phone);
      return { session: { user }, user };
    };
  } else {
    event.locals.supabase = createServerClient(
      pubEnv.PUBLIC_SUPABASE_URL,
      pubEnv.PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          getAll() {
            return event.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              event.cookies.set(name, value, { ...options, path: '/' });
            });
          }
        }
      }
    );

    event.locals.safeGetSession = async () => {
      const {
        data: { session }
      } = await event.locals.supabase.auth.getSession();
      if (!session) return { session: null, user: null };
      const {
        data: { user },
        error
      } = await event.locals.supabase.auth.getUser();
      if (error) return { session: null, user: null };
      return { session, user };
    };
  }

  return resolve(event, {
    filterSerializedResponseHeaders(name) {
      return name === 'content-range' || name === 'x-supabase-api-version';
    }
  });
}
