import { normalizePhone } from '$lib/phone';
import { createMockDb } from '$lib/server/mock-db';

/** @typedef {import('$lib/server/mock-db.js').MockDb} MockDb */

const db = createMockDb();

function ok(/** @type {unknown} */ data, /** @type {number | null} */ count = null) {
  return count === null ? { data, error: null } : { data: null, error: null, count };
}

function err(/** @type {string} */ message) {
  return { data: null, error: { message } };
}

/** @param {string} cols */
function pickCols(/** @type {Record<string, unknown>} */ row, cols) {
  if (cols === '*') return { ...row };
  const keys = cols
    .split(',')
    .map((k) => k.trim())
    .filter(Boolean);
  /** @type {Record<string, unknown>} */
  const out = {};
  for (const key of keys) {
    if (key in row) out[key] = row[key];
  }
  return out;
}

/** @param {unknown[]} rows @param {string | null} col @param {{ ascending?: boolean }} [opts] */
function sortRows(rows, col, opts = {}) {
  if (!col) return rows;
  const asc = opts.ascending !== false;
  return [...rows].sort((a, b) => {
    const av = /** @type {Record<string, unknown>} */ (a)[col];
    const bv = /** @type {Record<string, unknown>} */ (b)[col];
    if (av === bv) return 0;
    if (av == null) return 1;
    if (bv == null) return -1;
    return (av < bv ? -1 : 1) * (asc ? 1 : -1);
  });
}

class SelectQuery {
  /** @param {MockDb} db @param {string} table */
  constructor(db, table) {
    this.db = db;
    this.table = table;
    this.columns = '*';
    this.filters = [];
    this.orderCol = null;
    this.orderAsc = true;
    this.limitN = null;
    this.rangeFrom = null;
    this.rangeTo = null;
    this.head = false;
    this.countExact = false;
    this.wantSingle = false;
    this.wantMaybeSingle = false;
  }

  /** @param {string} cols @param {{ count?: string, head?: boolean }} [opts] */
  select(cols, opts) {
    this.columns = cols;
    if (opts?.head) this.head = true;
    if (opts?.count === 'exact') this.countExact = true;
    return this;
  }

  /** @param {string} col @param {unknown} val */
  eq(col, val) {
    this.filters.push((row) => row[col] === val);
    return this;
  }

  /** @param {string} col @param {unknown[]} vals */
  in(col, vals) {
    if (col === 'phone') {
      const normalized = vals.map((v) => normalizePhone(String(v)) || String(v));
      this.filters.push((row) => {
        const rowPhone = normalizePhone(String(row[col])) || String(row[col]);
        return normalized.includes(rowPhone);
      });
    } else {
      this.filters.push((row) => vals.includes(row[col]));
    }
    return this;
  }

  /** @param {string} col @param {{ ascending?: boolean }} [opts] */
  order(col, opts) {
    this.orderCol = col;
    this.orderAsc = opts?.ascending !== false;
    return this;
  }

  /** @param {number} n */
  limit(n) {
    this.limitN = n;
    return this;
  }

  /** @param {number} from @param {number} to */
  range(from, to) {
    this.rangeFrom = from;
    this.rangeTo = to;
    return this;
  }

  single() {
    this.wantSingle = true;
    return this;
  }

  maybeSingle() {
    this.wantMaybeSingle = true;
    return this;
  }

  rows() {
    /** @type {unknown[]} */
    let rows;
    switch (this.table) {
      case 'content':
        rows = [...this.db.content.values()];
        break;
      case 'whitelist':
        rows = [...this.db.whitelist];
        break;
      case 'status_posts':
        rows = [...this.db.status_posts];
        break;
      case 'reading_posts':
        rows = [...this.db.reading_posts];
        break;
      case 'photos':
        rows = [...this.db.photos];
        break;
      case 'access_requests':
        rows = [...this.db.access_requests];
        break;
      case 'comments':
        rows = [...this.db.comments];
        break;
      default:
        rows = [];
    }

    rows = rows.filter((row) => this.filters.every((fn) => fn(/** @type {Record<string, unknown>} */ (row))));
    rows = sortRows(rows, this.orderCol, { ascending: this.orderAsc });

    if (this.rangeFrom !== null && this.rangeTo !== null) {
      rows = rows.slice(this.rangeFrom, this.rangeTo + 1);
    } else if (this.limitN !== null) {
      rows = rows.slice(0, this.limitN);
    }

    return rows;
  }

  execute() {
    const rows = this.rows();

    if (this.countExact) {
      return ok(null, rows.length);
    }

    if (this.head) {
      return ok(null, rows.length);
    }

    const projected = rows.map((row) => pickCols(/** @type {Record<string, unknown>} */ (row), this.columns));

    if (this.wantSingle) {
      if (projected.length !== 1) return err('JSON object requested, multiple (or no) rows returned');
      return ok(projected[0]);
    }

    if (this.wantMaybeSingle) {
      return ok(projected[0] ?? null);
    }

    return ok(projected);
  }

  /** @param {(value: { data: unknown, error: unknown, count?: number }) => unknown} onFulfilled */
  then(onFulfilled, onRejected) {
    return Promise.resolve(this.execute()).then(onFulfilled, onRejected);
  }
}

class UpsertQuery {
  /** @param {MockDb} db @param {string} table @param {Record<string, unknown>} row @param {{ onConflict?: string }} [opts] */
  constructor(db, table, row, opts) {
    this.db = db;
    this.table = table;
    this.row = row;
    this.onConflict = opts?.onConflict || 'id';
    this.saved = null;
  }

  select() {
    if (!this.saved) this.apply();
    const q = new SelectQuery(this.db, this.table);
    if (this.table === 'content' && this.saved?.key) {
      q.eq('key', this.saved.key);
    } else if (this.saved?.id) {
      q.eq('id', this.saved.id);
    }
    return q;
  }

  apply() {
    const row = { ...this.row };
    if (!row.id) row.id = crypto.randomUUID();
    if (!row.created_at) row.created_at = new Date().toISOString();

    if (this.table === 'content') {
      const key = String(row.key);
      this.db.content.set(key, {
        key,
        value: String(row.value ?? ''),
        updated_at: String(row.updated_at ?? new Date().toISOString())
      });
      this.saved = this.db.content.get(key);
      return this.saved;
    }

    if (this.table === 'whitelist') {
      const conflictKey = this.onConflict === 'phone' ? 'phone' : 'id';
      const conflictVal = row[conflictKey];
      const list = this.db.whitelist;
      const idx =
        conflictKey === 'phone'
          ? list.findIndex((e) => normalizePhone(e.phone) === normalizePhone(String(conflictVal)))
          : list.findIndex((e) => e.id === conflictVal);

      if (idx >= 0) {
        list[idx] = { ...list[idx], ...row };
        this.saved = list[idx];
        return this.saved;
      }

      const entry = {
        id: String(row.id),
        phone: String(row.phone),
        name: row.name != null ? String(row.name) : null,
        email: String(row.email ?? ''),
        address: String(row.address ?? ''),
        created_at: String(row.created_at)
      };
      list.push(entry);
      this.saved = entry;
      return entry;
    }

    this.saved = row;
    return row;
  }

  /** @param {(value: { data: unknown, error: unknown }) => unknown} onFulfilled */
  then(onFulfilled, onRejected) {
    if (!this.saved) this.apply();
    return Promise.resolve(ok(this.saved)).then(onFulfilled, onRejected);
  }
}

class UpdateQuery {
  /** @param {MockDb} db @param {string} table @param {Record<string, unknown>} patch */
  constructor(db, table, patch) {
    this.db = db;
    this.table = table;
    this.patch = patch;
    this.filters = [];
  }

  /** @param {string} col @param {unknown} val */
  eq(col, val) {
    this.filters.push({ col, val });
    return this;
  }

  execute() {
    if (this.table === 'whitelist') {
      for (const entry of this.db.whitelist) {
        if (this.filters.every(({ col, val }) => entry[col] === val)) {
          Object.assign(entry, this.patch);
        }
      }
      return ok(null);
    }

    if (this.table === 'access_requests') {
      for (const req of this.db.access_requests) {
        if (this.filters.every(({ col, val }) => req[col] === val)) {
          Object.assign(req, this.patch);
        }
      }
      return ok(null);
    }

    return ok(null);
  }

  /** @param {(value: { data: unknown, error: unknown }) => unknown} onFulfilled */
  then(onFulfilled, onRejected) {
    return Promise.resolve(this.execute()).then(onFulfilled, onRejected);
  }
}

class DeleteQuery {
  /** @param {MockDb} db @param {string} table */
  constructor(db, table) {
    this.db = db;
    this.table = table;
    this.filters = [];
  }

  /** @param {string} col @param {unknown} val */
  eq(col, val) {
    this.filters.push({ col, val });
    return this;
  }

  execute() {
    const match = (/** @type {Record<string, unknown>} */ row) =>
      this.filters.every(({ col, val }) => row[col] === val);

    if (this.table === 'whitelist') {
      this.db.whitelist = this.db.whitelist.filter((row) => !match(row));
      return ok(null);
    }

    if (this.table === 'photos') {
      this.db.photos = this.db.photos.filter((row) => !match(row));
      return ok(null);
    }

    if (this.table === 'comments') {
      this.db.comments = this.db.comments.filter((row) => !match(row));
      return ok(null);
    }

    return ok(null);
  }

  /** @param {(value: { data: unknown, error: unknown }) => unknown} onFulfilled */
  then(onFulfilled, onRejected) {
    return Promise.resolve(this.execute()).then(onFulfilled, onRejected);
  }
}

class TableQuery {
  /** @param {MockDb} db @param {string} table */
  constructor(db, table) {
    this.db = db;
    this.table = table;
  }

  /** @param {string} cols @param {{ count?: string, head?: boolean }} [opts] */
  select(cols, opts) {
    const q = new SelectQuery(this.db, this.table);
    return q.select(cols, opts);
  }

  /** @param {Record<string, unknown>} row */
  insert(row) {
    const saved = { ...row };
    if (!saved.id) saved.id = crypto.randomUUID();
    if (!saved.created_at) saved.created_at = new Date().toISOString();

    if (this.table === 'status_posts') {
      this.db.status_posts.push({
        id: String(saved.id),
        body: String(saved.body),
        created_at: String(saved.created_at)
      });
      return Promise.resolve(ok(saved));
    }

    if (this.table === 'reading_posts') {
      this.db.reading_posts.push({
        id: String(saved.id),
        title: String(saved.title),
        author: String(saved.author ?? ''),
        note: String(saved.note ?? ''),
        created_at: String(saved.created_at)
      });
      return Promise.resolve(ok(saved));
    }

    if (this.table === 'photos') {
      this.db.photos.push({
        id: String(saved.id),
        storage_path: String(saved.storage_path),
        caption: saved.caption != null ? String(saved.caption) : null,
        sort_order: Number(saved.sort_order ?? 0),
        created_at: String(saved.created_at)
      });
      return Promise.resolve(ok(saved));
    }

    if (this.table === 'whitelist') {
      const phone = String(saved.phone);
      if (this.db.whitelist.some((e) => normalizePhone(e.phone) === normalizePhone(phone))) {
        return Promise.resolve(err('duplicate key value violates unique constraint'));
      }
      const entry = {
        id: String(saved.id),
        phone,
        name: saved.name != null ? String(saved.name) : null,
        email: String(saved.email ?? ''),
        address: String(saved.address ?? ''),
        created_at: String(saved.created_at)
      };
      this.db.whitelist.push(entry);
      return Promise.resolve(ok(entry));
    }

    if (this.table === 'access_requests') {
      this.db.access_requests.push({
        id: String(saved.id),
        phone: String(saved.phone),
        name: String(saved.name),
        note: saved.note != null ? String(saved.note) : null,
        status: String(saved.status ?? 'pending'),
        created_at: String(saved.created_at)
      });
      return Promise.resolve(ok(saved));
    }

    if (this.table === 'comments') {
      const entry = {
        id: String(saved.id),
        post_type: String(saved.post_type),
        post_id: String(saved.post_id),
        user_id: String(saved.user_id),
        user_phone: saved.user_phone != null ? String(saved.user_phone) : null,
        body: String(saved.body),
        created_at: String(saved.created_at)
      };
      this.db.comments.push(entry);
      return Promise.resolve(ok(entry));
    }

    return Promise.resolve(ok(saved));
  }

  /** @param {Record<string, unknown>} row @param {{ onConflict?: string }} [opts] */
  upsert(row, opts) {
    return new UpsertQuery(this.db, this.table, row, opts);
  }

  /** @param {Record<string, unknown>} patch */
  update(patch) {
    return new UpdateQuery(this.db, this.table, patch);
  }

  delete() {
    return new DeleteQuery(this.db, this.table);
  }
}

class StorageBucket {
  /** @param {MockDb} db */
  constructor(db) {
    this.db = db;
  }

  /** @param {string} path @param {number} _ttl */
  createSignedUrl(path, _ttl) {
    const file = this.db.storage.get(path);
    const signedUrl = file?.url ?? null;
    return Promise.resolve({ data: signedUrl ? { signedUrl } : null, error: null });
  }

  /** @param {string} path @param {Uint8Array} bytes @param {{ contentType?: string }} [opts] */
  upload(path, bytes, opts) {
    const contentType = opts?.contentType || 'application/octet-stream';
    const base64 = Buffer.from(bytes).toString('base64');
    const url = `data:${contentType};base64,${base64}`;
    this.db.storage.set(path, { contentType, url });
    return Promise.resolve({ data: { path }, error: null });
  }

  /** @param {string[]} paths */
  remove(paths) {
    for (const path of paths) this.db.storage.delete(path);
    return Promise.resolve({ data: null, error: null });
  }
}

export function createMockSupabase() {
  return {
    from(/** @type {string} */ table) {
      return new TableQuery(db, table);
    },
    storage: {
      from(/** @type {string} */ _bucket) {
        return new StorageBucket(db);
      }
    }
  };
}
