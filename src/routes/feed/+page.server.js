import { redirect } from '@sveltejs/kit';
import { adminSupabase } from '$lib/server/supabase';
import { env } from '$env/dynamic/private';

export const load = async ({ locals: { safeGetSession } }) => {
  const { session, user } = await safeGetSession();
  if (!session) redirect(303, '/login');

  const isAdmin = !!(user?.phone && env.ADMIN_PHONE && user.phone === env.ADMIN_PHONE);

  const [{ data: contentRows }, { data: photoRows }] = await Promise.all([
    adminSupabase.from('content').select('key, value'),
    adminSupabase.from('photos').select('id, storage_path, caption, sort_order').order('sort_order')
  ]);

  const content = Object.fromEntries((contentRows || []).map((r) => [r.key, r.value]));

  const photos = await Promise.all(
    (photoRows || []).map(async (photo) => {
      const { data } = await adminSupabase.storage
        .from('photos')
        .createSignedUrl(photo.storage_path, 3600);
      return { id: photo.id, caption: photo.caption, url: data?.signedUrl || null };
    })
  );

  return { content, photos, isAdmin };
};
