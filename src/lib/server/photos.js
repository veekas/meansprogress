import convert from 'heic-convert';

const HEIC_TYPES = new Set(['image/heic', 'image/heif']);
const HEIC_EXTS = new Set(['heic', 'heif']);

function isHeic(file, ext) {
  const type = file.type?.toLowerCase() || '';
  return HEIC_TYPES.has(type) || HEIC_EXTS.has(ext);
}

/** Normalize upload bytes for storage (HEIC/HEIF from iPhones → JPEG for browser support). */
export async function preparePhotoUpload(file) {
  const rawExt = file.name.split('.').pop()?.toLowerCase() || 'jpg';
  const bytes = Buffer.from(await file.arrayBuffer());

  if (isHeic(file, rawExt)) {
    const jpeg = await convert({ buffer: bytes, format: 'JPEG', quality: 0.9 });
    return {
      bytes: jpeg,
      contentType: 'image/jpeg',
      ext: 'jpg'
    };
  }

  const contentType = file.type || `image/${rawExt === 'jpg' ? 'jpeg' : rawExt}`;
  return { bytes, contentType, ext: rawExt };
}
