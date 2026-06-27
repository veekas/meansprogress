import { adminSupabase } from '$lib/server/supabase';
import { normalizePhone } from '$lib/phone';
import { isMockMode } from '$lib/server/mock-mode';

/** @typedef {{ id: string, phone: string, name: string | null, email: string, address: string }} WhitelistEntry */

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

/** @param {WhitelistEntry | null | undefined} entry */
export function isProfileIncomplete(entry) {
  if (!entry) return true;
  return !entry.email?.trim() || !entry.address?.trim();
}
