/** Normalize a phone number to E.164 (US numbers default to +1). */
export function normalizePhone(phone) {
  if (!phone) return null;

  const trimmed = phone.trim();
  const digits = trimmed.replace(/\D/g, '');

  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith('1')) return `+${digits}`;
  if (trimmed.startsWith('+') && digits.length >= 10) return `+${digits}`;

  return null;
}
