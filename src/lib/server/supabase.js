import { createClient } from '@supabase/supabase-js';
import { env as pubEnv } from '$env/dynamic/public';
import { env as privEnv } from '$env/dynamic/private';

let _client = null;

function client() {
  if (!_client) {
    _client = createClient(
      pubEnv.PUBLIC_SUPABASE_URL,
      privEnv.SUPABASE_SERVICE_ROLE_KEY,
      { auth: { persistSession: false } }
    );
  }
  return _client;
}

// Proxy defers createClient() until first property access (i.e. first request),
// so SvelteKit's build-time analysis doesn't try to instantiate with missing env vars.
export const adminSupabase = new Proxy(
  {},
  {
    get(_, prop) {
      const val = client()[prop];
      return typeof val === 'function' ? val.bind(client()) : val;
    }
  }
);
