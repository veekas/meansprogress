import { fail, redirect } from '@sveltejs/kit';
import { adminSupabase } from '$lib/server/supabase';
import { env } from '$env/dynamic/private';

async function requireAdmin(safeGetSession) {
  const { session, user } = await safeGetSession();
  if (!session) return { error: 'unauthenticated' };
  if (!user?.phone || !env.ADMIN_PHONE || user.phone !== env.ADMIN_PHONE) {
    return { error: 'forbidden' };
  }
  return { user };
}

export const load = async ({ locals: { safeGetSession } }) => {
  const auth = await requireAdmin(safeGetSession);
  if (auth.error === 'unauthenticated') redirect(303, '/login');
  if (auth.error === 'forbidden') redirect(303, '/feed');

  const [{ data: contentRows }, { data: whitelist }, { data: photoRows }, { data: requests }] =
    await Promise.all([
      adminSupabase.from('content').select('key, value').order('key'),
      adminSupabase.from('whitelist').select('*').order('name'),
      adminSupabase.from('photos').select('*').order('sort_order'),
      adminSupabase
        .from('access_requests')
        .select('*')
        .eq('status', 'pending')
        .order('created_at')
    ]);

  const content = Object.fromEntries((contentRows || []).map((r) => [r.key, r.value]));

  const photos = await Promise.all(
    (photoRows || []).map(async (photo) => {
      const { data } = await adminSupabase.storage
        .from('photos')
        .createSignedUrl(photo.storage_path, 3600);
      return { ...photo, url: data?.signedUrl || null };
    })
  );

  return { content, whitelist: whitelist || [], photos, requests: requests || [] };
};

export const actions = {
  updateContent: async ({ request, locals: { safeGetSession } }) => {
    const auth = await requireAdmin(safeGetSession);
    if (auth.error) return fail(403, { error: 'Unauthorized' });

    const formData = await request.formData();

    const keys = [
      'bio',
      'status',
      'reading_title',
      'reading_author',
      'reading_note',
      'address',
      'contact_email',
      'contact_phone'
    ];

    await Promise.all(
      keys.map((key) =>
        adminSupabase
          .from('content')
          .upsert(
            { key, value: formData.get(key)?.toString() || '', updated_at: new Date().toISOString() },
            { onConflict: 'key' }
          )
      )
    );

    return { contentSaved: true };
  },

  addContact: async ({ request, locals: { safeGetSession } }) => {
    const auth = await requireAdmin(safeGetSession);
    if (auth.error) return fail(403, { error: 'Unauthorized' });

    const formData = await request.formData();
    const phone = formData.get('phone')?.toString().trim();
    const name = formData.get('name')?.toString().trim() || null;

    if (!phone) return fail(400, { contactError: 'Phone number is required.' });

    const { error } = await adminSupabase.from('whitelist').insert({ phone, name });
    if (error) return fail(400, { contactError: error.message });

    return { contactAdded: true };
  },

  removeContact: async ({ request, locals: { safeGetSession } }) => {
    const auth = await requireAdmin(safeGetSession);
    if (auth.error) return fail(403, { error: 'Unauthorized' });

    const formData = await request.formData();
    const id = formData.get('id')?.toString();

    if (!id) return fail(400, { error: 'Missing ID' });

    await adminSupabase.from('whitelist').delete().eq('id', id);
    return { contactRemoved: true };
  },

  uploadPhoto: async ({ request, locals: { safeGetSession } }) => {
    const auth = await requireAdmin(safeGetSession);
    if (auth.error) return fail(403, { error: 'Unauthorized' });

    const formData = await request.formData();
    const file = formData.get('photo');
    const caption = formData.get('caption')?.toString().trim() || '';

    if (!file || !(file instanceof File) || file.size === 0) {
      return fail(400, { photoError: 'Please select a photo.' });
    }

    const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const bytes = await file.arrayBuffer();
    const { error: uploadError } = await adminSupabase.storage
      .from('photos')
      .upload(filename, bytes, { contentType: file.type });

    if (uploadError) return fail(500, { photoError: 'Upload failed. Try again.' });

    const { data: maxRow } = await adminSupabase
      .from('photos')
      .select('sort_order')
      .order('sort_order', { ascending: false })
      .limit(1)
      .single();

    await adminSupabase.from('photos').insert({
      storage_path: filename,
      caption,
      sort_order: (maxRow?.sort_order ?? -1) + 1
    });

    return { photoUploaded: true };
  },

  approveRequest: async ({ request, locals: { safeGetSession } }) => {
    const auth = await requireAdmin(safeGetSession);
    if (auth.error) return fail(403, { error: 'Unauthorized' });

    const formData = await request.formData();
    const id = formData.get('id')?.toString();
    const phone = formData.get('phone')?.toString();
    const name = formData.get('name')?.toString() || null;

    if (!id || !phone) return fail(400, { error: 'Missing fields' });

    await Promise.all([
      adminSupabase.from('whitelist').upsert({ phone, name }, { onConflict: 'phone' }),
      adminSupabase.from('access_requests').update({ status: 'approved' }).eq('id', id)
    ]);

    return { requestApproved: true };
  },

  denyRequest: async ({ request, locals: { safeGetSession } }) => {
    const auth = await requireAdmin(safeGetSession);
    if (auth.error) return fail(403, { error: 'Unauthorized' });

    const formData = await request.formData();
    const id = formData.get('id')?.toString();

    if (!id) return fail(400, { error: 'Missing ID' });

    await adminSupabase.from('access_requests').update({ status: 'denied' }).eq('id', id);
    return { requestDenied: true };
  },

  deletePhoto: async ({ request, locals: { safeGetSession } }) => {
    const auth = await requireAdmin(safeGetSession);
    if (auth.error) return fail(403, { error: 'Unauthorized' });

    const formData = await request.formData();
    const id = formData.get('id')?.toString();
    const storagePath = formData.get('storage_path')?.toString();

    if (!id) return fail(400, { error: 'Missing ID' });

    await Promise.all([
      storagePath ? adminSupabase.storage.from('photos').remove([storagePath]) : Promise.resolve(),
      adminSupabase.from('photos').delete().eq('id', id)
    ]);

    return { photoDeleted: true };
  }
};
