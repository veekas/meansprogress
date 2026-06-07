import { adminSupabase } from '$lib/server/supabase';

export const load = async () => {
  const { data } = await adminSupabase
    .from('content')
    .select('value')
    .eq('key', 'bio')
    .single();

  return { bio: data?.value || '' };
};
