import { adminSupabase } from '$lib/server/supabase';
import { normalizePhone } from '$lib/phone';
import { isMockMode } from '$lib/server/mock-mode';

/** @typedef {{ id: string, phone: string, name: string | null, email: string, address: string }} WhitelistEntry */

const GUEST_PROFILE_KEY_PREFIX = 'guest_profile:';

/** @param {string} phone */
function guestProfileContentKey(phone) {
  return `${GUEST_PROFILE_KEY_PREFIX}${normalizePhone(phone)}`;
}

/** @param {unknown} error */
function isMissingProfileColumnsError(error) {
  const message = typeof error === 'object' && error && 'message' in error ? String(error.message) : '';
  const code = typeof error === 'object' && error && 'code' in error ? String(error.code) : '';
  return code === 'PGRST204' || /'email'|'address'/.test(message);
}

/** @param {string} phone */
async function readGuestProfileFromContent(phone) {
  const { data, error } = await adminSupabase
    .from('content')
    .select('value')
    .eq('key', guestProfileContentKey(phone))
    .maybeSingle();

  if (error || !data?.value) return { email: '', address: '' };

  try {
    const parsed = JSON.parse(data.value);
    return {
      email: typeof parsed.email === 'string' ? parsed.email : '',
      address: typeof parsed.address === 'string' ? parsed.address : ''
    };
  } catch {
    return { email: '', address: '' };
  }
}

/**
 * @param {string} phone
 * @param {{ email: string, address: string }} profile
 */
async function writeGuestProfileToContent(phone, profile) {
  return adminSupabase.from('content').upsert(
    {
      key: guestProfileContentKey(phone),
      value: JSON.stringify(profile),
      updated_at: new Date().toISOString()
    },
    { onConflict: 'key' }
  );
}

/** @param {string | null | undefined} phone */
export async function findWhitelistEntryByPhone(phone) {
  const normalized = normalizePhone(phone);
  if (!normalized) return null;

  let { data: entry, error } = await adminSupabase
    .from('whitelist')
    .select('*')
    .eq('phone', normalized)
    .maybeSingle();

  if (error) return null;

  if (!entry && phone && phone !== normalized) {
    const { data: rawEntry, error: rawError } = await adminSupabase
      .from('whitelist')
      .select('*')
      .eq('phone', phone)
      .maybeSingle();

    if (!rawError && rawEntry) {
      entry = rawEntry;
      await adminSupabase.from('whitelist').update({ phone: normalized }).eq('id', entry.id);
      entry.phone = normalized;
    }
  }

  return entry ?? null;
}

/**
 * Return the whitelist entry for this phone. In mock mode, auto-add unknown numbers.
 * @param {string | null | undefined} phone
 */
export async function ensureWhitelistEntry(phone) {
  const normalized = normalizePhone(phone);
  if (!normalized) return null;

  const existing = await findWhitelistEntryByPhone(normalized);
  if (existing || !isMockMode()) return existing;

  const { data, error } = await adminSupabase
    .from('whitelist')
    .upsert({ phone: normalized }, { onConflict: 'phone' })
    .select()
    .single();

  return error ? null : data;
}

/**
 * Guest contact info from whitelist columns, with content-table fallback when
 * profile columns are missing or were saved before migration ran.
 * @param {Record<string, unknown> | null | undefined} entry
 */
export async function getGuestContact(entry) {
  if (!entry || typeof entry.phone !== 'string') return null;

  const hasWhitelistColumns = 'email' in entry && 'address' in entry;
  let email = hasWhitelistColumns ? String(entry.email ?? '') : '';
  let address = hasWhitelistColumns ? String(entry.address ?? '') : '';

  if (!email.trim() || !address.trim()) {
    const fallback = await readGuestProfileFromContent(entry.phone);
    if (!email.trim()) email = fallback.email;
    if (!address.trim()) address = fallback.address;
  }

  return { phone: entry.phone, email, address };
}

/**
 * @param {string | null | undefined} phone
 * @param {{ email: string, address: string }} profile
 */
export async function updateGuestContact(phone, profile) {
  const entry = await findWhitelistEntryByPhone(phone);
  if (!entry) return { ok: false, reason: 'not_found' };

  const email = profile.email.trim();
  const address = profile.address.trim();
  const savedProfile = { phone: entry.phone, email, address };

  const { error } = await adminSupabase
    .from('whitelist')
    .update({ email, address })
    .eq('phone', entry.phone);

  if (!error) return { ok: true, profile: savedProfile };

  if (isMissingProfileColumnsError(error)) {
    const { error: contentError } = await writeGuestProfileToContent(entry.phone, { email, address });
    if (contentError) {
      console.error('settings: guest profile content fallback failed', contentError);
      return { ok: false, reason: 'db', error: contentError };
    }
    return { ok: true, profile: savedProfile };
  }

  console.error('settings: whitelist profile update failed', error);
  return { ok: false, reason: 'db', error };
}

/** @param {WhitelistEntry | null | undefined} entry */
export function isProfileIncomplete(entry) {
  if (!entry) return true;
  return !entry.email?.trim() || !entry.address?.trim();
}
