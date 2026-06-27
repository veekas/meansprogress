import { fail, redirect } from '@sveltejs/kit';
import { adminSupabase } from '$lib/server/supabase';
import { normalizePhone } from '$lib/phone';
import { isAdminUser } from '$lib/server/admin';
import { preparePhotoUpload } from '$lib/server/photos';
import { friendlyDbError } from '$lib/adminForm';

async function requireAdmin(safeGetSession) {
  const { session, user } = await safeGetSession();
  if (!session) return { error: 'unauthenticated' };
  if (!isAdminUser(user)) {
    return { error: 'forbidden' };
  }
  return { user };
}

function unauthorizedFail() {
  return fail(403, { message: 'You are not authorized to make this change.' });
}

export const load = async ({ locals: { safeGetSession } }) => {
  const auth = await requireAdmin(safeGetSession);
  if (auth.error === 'unauthenticated') redirect(303, '/login');
  if (auth.error === 'forbidden') redirect(303, '/feed');

  const [{ data: contentRows }, { data: whitelist }, { data: photoRows }, { data: requests }, { data: latestStatus }, { data: latestReading }] =
    await Promise.all([
      adminSupabase.from('content').select('key, value').order('key'),
      adminSupabase.from('whitelist').select('*').order('name'),
      adminSupabase.from('photos').select('*').order('sort_order'),
      adminSupabase
        .from('access_requests')
        .select('*')
        .eq('status', 'pending')
        .order('created_at'),
      adminSupabase
        .from('status_posts')
        .select('body')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle(),
      adminSupabase
        .from('reading_posts')
        .select('title, author, note')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle()
    ]);

  const content = Object.fromEntries((contentRows || []).map((r) => [r.key, r.value]));
  content.status = latestStatus?.body || '';
  content.reading_title = latestReading?.title || '';
  content.reading_author = latestReading?.author || '';
  content.reading_note = latestReading?.note || '';

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
  updateBio: async ({ request, locals: { safeGetSession } }) => {
    const auth = await requireAdmin(safeGetSession);
    if (auth.error) return unauthorizedFail();

    const formData = await request.formData();
    const bio = formData.get('bio')?.toString() || '';

    try {
      const { error } = await adminSupabase
        .from('content')
        .upsert({ key: 'bio', value: bio, updated_at: new Date().toISOString() }, { onConflict: 'key' });

      if (error) return fail(500, { bioError: friendlyDbError(error), bio });
    } catch (err) {
      return fail(500, { bioError: friendlyDbError(err), bio });
    }

    return { bioSaved: true };
  },

  updateStatus: async ({ request, locals: { safeGetSession } }) => {
    const auth = await requireAdmin(safeGetSession);
    if (auth.error) return unauthorizedFail();

    const formData = await request.formData();
    const status = formData.get('status')?.toString().trim() || '';

    try {
      const { data: latestStatus, error: fetchError } = await adminSupabase
        .from('status_posts')
        .select('body')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (fetchError) return fail(500, { statusError: friendlyDbError(fetchError), status });

      if (status && status !== (latestStatus?.body || '')) {
        const { error: insertError } = await adminSupabase.from('status_posts').insert({ body: status });
        if (insertError) return fail(500, { statusError: friendlyDbError(insertError), status });
      }
    } catch (err) {
      return fail(500, { statusError: friendlyDbError(err), status });
    }

    return { statusSaved: true };
  },

  updateReading: async ({ request, locals: { safeGetSession } }) => {
    const auth = await requireAdmin(safeGetSession);
    if (auth.error) return unauthorizedFail();

    const formData = await request.formData();
    const readingTitle = formData.get('reading_title')?.toString().trim() || '';
    const readingAuthor = formData.get('reading_author')?.toString().trim() || '';
    const readingNote = formData.get('reading_note')?.toString().trim() || '';
    const draft = {
      reading_title: readingTitle,
      reading_author: readingAuthor,
      reading_note: readingNote
    };

    try {
      const { data: latestReading, error: fetchError } = await adminSupabase
        .from('reading_posts')
        .select('title, author, note')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (fetchError) return fail(500, { readingError: friendlyDbError(fetchError), ...draft });

      const readingChanged =
        readingTitle &&
        (readingTitle !== (latestReading?.title || '') ||
          readingAuthor !== (latestReading?.author || '') ||
          readingNote !== (latestReading?.note || ''));

      if (readingChanged) {
        const { error: insertError } = await adminSupabase.from('reading_posts').insert({
          title: readingTitle,
          author: readingAuthor,
          note: readingNote
        });
        if (insertError) return fail(500, { readingError: friendlyDbError(insertError), ...draft });
      }
    } catch (err) {
      return fail(500, { readingError: friendlyDbError(err), ...draft });
    }

    return { readingSaved: true };
  },

  updateContact: async ({ request, locals: { safeGetSession } }) => {
    const auth = await requireAdmin(safeGetSession);
    if (auth.error) return unauthorizedFail();

    const formData = await request.formData();
    const address = formData.get('address')?.toString() || '';
    const contactEmail = formData.get('contact_email')?.toString() || '';
    const contactPhone = formData.get('contact_phone')?.toString() || '';
    const draft = { address, contact_email: contactEmail, contact_phone: contactPhone };

    try {
      const keys = ['address', 'contact_email', 'contact_phone'];
      const results = await Promise.all(
        keys.map((key) =>
          adminSupabase
            .from('content')
            .upsert(
              { key, value: formData.get(key)?.toString() || '', updated_at: new Date().toISOString() },
              { onConflict: 'key' }
            )
        )
      );

      const failed = results.find((result) => result.error);
      if (failed?.error) return fail(500, { contactInfoError: friendlyDbError(failed.error), ...draft });
    } catch (err) {
      return fail(500, { contactInfoError: friendlyDbError(err), ...draft });
    }

    return { contactSaved: true };
  },

  addContact: async ({ request, locals: { safeGetSession } }) => {
    const auth = await requireAdmin(safeGetSession);
    if (auth.error) return unauthorizedFail();

    const formData = await request.formData();
    const rawPhone = formData.get('phone')?.toString().trim() || '';
    const name = formData.get('name')?.toString().trim() || '';
    const phone = normalizePhone(rawPhone);
    const draft = { phone: rawPhone, name };

    if (!phone) {
      return fail(400, {
        contactError: 'Use a US or Canada phone number, e.g. 4805551234 or +14805551234.',
        ...draft
      });
    }

    try {
      const { error } = await adminSupabase.from('whitelist').insert({ phone, name: name || null });
      if (error) return fail(400, { contactError: friendlyDbError(error), ...draft });
    } catch (err) {
      return fail(500, { contactError: friendlyDbError(err), ...draft });
    }

    return { contactAdded: true };
  },

  removeContact: async ({ request, locals: { safeGetSession } }) => {
    const auth = await requireAdmin(safeGetSession);
    if (auth.error) return unauthorizedFail();

    const formData = await request.formData();
    const id = formData.get('id')?.toString();

    if (!id) return fail(400, { removeContactError: 'Missing contact ID.' });

    try {
      const { error } = await adminSupabase.from('whitelist').delete().eq('id', id);
      if (error) return fail(500, { removeContactError: friendlyDbError(error) });
    } catch (err) {
      return fail(500, { removeContactError: friendlyDbError(err) });
    }

    return { contactRemoved: true };
  },

  uploadPhoto: async ({ request, locals: { safeGetSession } }) => {
    const auth = await requireAdmin(safeGetSession);
    if (auth.error) return unauthorizedFail();

    const formData = await request.formData();
    const file = formData.get('photo');
    const caption = formData.get('caption')?.toString().trim() || '';

    if (!file || !(file instanceof File) || file.size === 0) {
      return fail(400, { photoError: 'Please select a photo.', caption });
    }

    try {
      const { bytes, contentType, ext } = await preparePhotoUpload(file);
      const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

      const { error: uploadError } = await adminSupabase.storage
        .from('photos')
        .upload(filename, bytes, { contentType });

      if (uploadError) {
        return fail(500, { photoError: friendlyDbError(uploadError), caption });
      }

      const { data: maxRow, error: maxRowError } = await adminSupabase
        .from('photos')
        .select('sort_order')
        .order('sort_order', { ascending: false })
        .limit(1)
        .single();

      if (maxRowError && maxRowError.code !== 'PGRST116') {
        await adminSupabase.storage.from('photos').remove([filename]);
        return fail(500, { photoError: friendlyDbError(maxRowError), caption });
      }

      const { error: insertError } = await adminSupabase.from('photos').insert({
        storage_path: filename,
        caption,
        sort_order: (maxRow?.sort_order ?? -1) + 1
      });

      if (insertError) {
        await adminSupabase.storage.from('photos').remove([filename]);
        return fail(500, { photoError: friendlyDbError(insertError), caption });
      }
    } catch (err) {
      return fail(500, { photoError: friendlyDbError(err), caption });
    }

    return { photoUploaded: true };
  },

  approveRequest: async ({ request, locals: { safeGetSession } }) => {
    const auth = await requireAdmin(safeGetSession);
    if (auth.error) return unauthorizedFail();

    const formData = await request.formData();
    const id = formData.get('id')?.toString();
    const phone = normalizePhone(formData.get('phone')?.toString());
    const name = formData.get('name')?.toString() || null;

    if (!id || !phone) return fail(400, { requestActionError: 'Missing request details.' });

    try {
      const { error: whitelistError } = await adminSupabase
        .from('whitelist')
        .upsert({ phone, name }, { onConflict: 'phone' });

      if (whitelistError) {
        return fail(500, { requestActionError: friendlyDbError(whitelistError) });
      }

      const { error: requestError } = await adminSupabase
        .from('access_requests')
        .update({ status: 'approved' })
        .eq('id', id);

      if (requestError) {
        return fail(500, { requestActionError: friendlyDbError(requestError) });
      }
    } catch (err) {
      return fail(500, { requestActionError: friendlyDbError(err) });
    }

    return { requestApproved: true };
  },

  denyRequest: async ({ request, locals: { safeGetSession } }) => {
    const auth = await requireAdmin(safeGetSession);
    if (auth.error) return unauthorizedFail();

    const formData = await request.formData();
    const id = formData.get('id')?.toString();

    if (!id) return fail(400, { requestActionError: 'Missing request ID.' });

    try {
      const { error } = await adminSupabase
        .from('access_requests')
        .update({ status: 'denied' })
        .eq('id', id);

      if (error) return fail(500, { requestActionError: friendlyDbError(error) });
    } catch (err) {
      return fail(500, { requestActionError: friendlyDbError(err) });
    }

    return { requestDenied: true };
  },

  deletePhoto: async ({ request, locals: { safeGetSession } }) => {
    const auth = await requireAdmin(safeGetSession);
    if (auth.error) return unauthorizedFail();

    const formData = await request.formData();
    const id = formData.get('id')?.toString();
    const storagePath = formData.get('storage_path')?.toString();

    if (!id) return fail(400, { photoDeleteError: 'Missing photo ID.' });

    try {
      const [storageResult, deleteResult] = await Promise.all([
        storagePath ? adminSupabase.storage.from('photos').remove([storagePath]) : Promise.resolve({ error: null }),
        adminSupabase.from('photos').delete().eq('id', id)
      ]);

      const error = storageResult.error || deleteResult.error;
      if (error) return fail(500, { photoDeleteError: friendlyDbError(error) });
    } catch (err) {
      return fail(500, { photoDeleteError: friendlyDbError(err) });
    }

    return { photoDeleted: true };
  }
};
