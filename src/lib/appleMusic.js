const EMBED_HOST = 'embed.music.apple.com';
const MUSIC_HOST = 'music.apple.com';

/**
 * Parse an Apple Music embed iframe, embed URL, or music.apple.com link.
 * @param {string} input
 * @returns {{ embedUrl: string, height: number } | { error: string }}
 */
export function parseAppleMusicEmbed(input) {
  const trimmed = input?.trim() || '';
  if (!trimmed) return { error: 'Paste an Apple Music embed or link.' };

  let url = trimmed;
  let heightFromMarkup = null;

  const srcMatch = trimmed.match(/\bsrc=["']([^"']+)["']/i);
  if (srcMatch) url = srcMatch[1];

  const heightMatch = trimmed.match(/\bheight=["']?(\d+)/i);
  if (heightMatch) heightFromMarkup = Number(heightMatch[1]);

  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    return { error: 'That does not look like a valid Apple Music URL.' };
  }

  if (parsed.protocol !== 'https:') {
    return { error: 'Apple Music embeds must use https.' };
  }

  if (parsed.hostname === MUSIC_HOST) {
    parsed.hostname = EMBED_HOST;
  }

  if (parsed.hostname !== EMBED_HOST) {
    return { error: 'Only Apple Music embeds (embed.music.apple.com) are supported.' };
  }

  const path = parsed.pathname;
  const isSong = path.includes('/song/');
  const height = heightFromMarkup ?? (isSong ? 175 : 450);

  return { embedUrl: parsed.toString(), height };
}
