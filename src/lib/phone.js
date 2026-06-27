/** Normalize a phone number to E.164 (+1 US/Canada only). */
export function normalizePhone(phone) {
  if (!phone) return null;

  const trimmed = phone.trim();
  const digits = trimmed.replace(/\D/g, '');

  let normalized = null;
  if (digits.length === 10) normalized = `+1${digits}`;
  else if (digits.length === 11 && digits.startsWith('1')) normalized = `+${digits}`;
  else if (trimmed.startsWith('+') && digits.length >= 10) normalized = `+${digits}`;

  if (!normalized || !/^\+1\d{10}$/.test(normalized)) return null;

  return normalized;
}
