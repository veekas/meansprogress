import { env } from '$env/dynamic/private';
import { normalizePhone } from '$lib/phone';

const PLACEHOLDER_PHOTO =
  'data:image/svg+xml,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"><rect fill="#303839" width="400" height="400"/><text x="200" y="200" fill="#6b7e80" font-family="monospace" font-size="14" text-anchor="middle" dominant-baseline="middle">mock photo</text></svg>'
  );

function id() {
  return crypto.randomUUID();
}

function now() {
  return new Date().toISOString();
}

/** @returns {import('./mock-db.js').MockDb} */
export function createMockDb() {
  const adminPhone = normalizePhone(env.ADMIN_PHONE) || '+15551234567';

  /** @type {Map<string, { key: string, value: string, updated_at: string }>} */
  const content = new Map(
    [
      ['bio', 'building things, reading books, staying in touch.'],
      ['status', ''],
      ['reading_title', ''],
      ['reading_author', ''],
      ['reading_note', ''],
      ['address', '123 Mock Street\nDev City, DC 00000'],
      ['contact_email', 'veekas@example.com'],
      ['contact_phone', adminPhone]
    ].map(([key, value]) => [key, { key, value, updated_at: now() }])
  );

  /** @type {Array<{ id: string, phone: string, name: string | null, email: string, address: string, created_at: string }>} */
  const whitelist = [
    {
      id: id(),
      phone: adminPhone,
      name: 'Veekas (admin)',
      email: 'admin@example.com',
      address: '123 Mock Street\nDev City, DC 00000',
      created_at: now()
    }
  ];

  /** @type {Array<{ id: string, body: string, created_at: string }>} */
  const status_posts = [
    {
      id: id(),
      body: 'working on the feed, drinking coffee, enjoying mock mode.',
      created_at: now()
    }
  ];

  /** @type {Array<{ id: string, title: string, author: string, note: string, created_at: string }>} */
  const reading_posts = [
    {
      id: id(),
      title: 'The Dispossessed',
      author: 'Ursula K. Le Guin',
      note: 're-reading for the nth time',
      created_at: now()
    }
  ];

  const photoId = id();
  const photoPath = 'mock-photo-1.svg';

  /** @type {Array<{ id: string, storage_path: string, caption: string | null, sort_order: number, created_at: string }>} */
  const photos = [
    {
      id: photoId,
      storage_path: photoPath,
      caption: 'proof of mock life',
      sort_order: 0,
      created_at: now()
    }
  ];

  /** @type {Array<{ id: string, phone: string, name: string, note: string | null, status: string, created_at: string }>} */
  const access_requests = [
    {
      id: id(),
      phone: '+15557654321',
      name: 'Mock Requester',
      note: 'we met at a conference',
      status: 'pending',
      created_at: now()
    }
  ];

  /** @type {Map<string, { contentType: string, url: string }>} */
  const storage = new Map([[photoPath, { contentType: 'image/svg+xml', url: PLACEHOLDER_PHOTO }]]);

  /** @type {Array<{ id: string, post_type: string, post_id: string, user_id: string, user_phone: string | null, body: string, created_at: string }>} */
  const comments = [];

  return { content, whitelist, status_posts, reading_posts, photos, access_requests, comments, storage };
}

/** @typedef {ReturnType<typeof createMockDb>} MockDb */
