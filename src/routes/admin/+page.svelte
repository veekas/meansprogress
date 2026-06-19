<script>
  import { enhance } from '$app/forms';
  import Nav from '$lib/components/Nav.svelte';

  let { data, form } = $props();
</script>

<svelte:head>
  <title>admin — veekasmeansprogress.com</title>
</svelte:head>

<Nav showAdmin={true} />

<main>
  <h1>admin</h1>

  <!-- ── Bio ─────────────────────────────────── -->
  <section>
    <h2>bio</h2>
    <form method="POST" action="?/updateBio" use:enhance class="section-form">
      <label>
        bio (shown on public landing page)
        <textarea name="bio" rows="3">{data.content.bio || ''}</textarea>
      </label>
      {#if form?.bioSaved}
        <p class="success">saved ✓</p>
      {/if}
      <button type="submit" class="btn">save bio</button>
    </form>
  </section>

  <!-- ── Status ──────────────────────────────── -->
  <section>
    <h2>what's up</h2>
    <form method="POST" action="?/updateStatus" use:enhance class="section-form">
      <label>
        status update
        <textarea
          name="status"
          rows="4"
          placeholder="saving adds a new entry when this changes"
        >{data.content.status || ''}</textarea>
      </label>
      {#if form?.statusSaved}
        <p class="success">saved ✓</p>
      {/if}
      <button type="submit" class="btn">save status</button>
    </form>
  </section>

  <!-- ── Reading ─────────────────────────────── -->
  <section>
    <h2>reading</h2>
    <form method="POST" action="?/updateReading" use:enhance class="section-form">
      <div class="field-row">
        <label>
          book title
          <input type="text" name="reading_title" value={data.content.reading_title || ''} />
        </label>
        <label>
          author
          <input type="text" name="reading_author" value={data.content.reading_author || ''} />
        </label>
      </div>
      <label>
        reading note
        <textarea
          name="reading_note"
          rows="3"
          placeholder="saving adds a new entry when the book changes"
        >{data.content.reading_note || ''}</textarea>
      </label>
      {#if form?.readingSaved}
        <p class="success">saved ✓</p>
      {/if}
      <button type="submit" class="btn">save reading</button>
    </form>
  </section>

  <!-- ── Contact ─────────────────────────────── -->
  <section>
    <h2>contact info</h2>
    <form method="POST" action="?/updateContact" use:enhance class="section-form">
      <label>
        address (one line per line)
        <textarea name="address" rows="3">{data.content.address || ''}</textarea>
      </label>
      <div class="field-row">
        <label>
          contact email
          <input type="email" name="contact_email" value={data.content.contact_email || ''} />
        </label>
        <label>
          contact phone
          <input type="tel" name="contact_phone" value={data.content.contact_phone || ''} />
        </label>
      </div>
      {#if form?.contactSaved}
        <p class="success">saved ✓</p>
      {/if}
      <button type="submit" class="btn">save contact info</button>
    </form>
  </section>

  <!-- ── Photos ──────────────────────────────── -->
  <section>
    <h2>photos</h2>

    <form
      method="POST"
      action="?/uploadPhoto"
      use:enhance
      enctype="multipart/form-data"
      class="upload-form"
    >
      <label>
        photo file
        <input type="file" name="photo" accept="image/*" required />
      </label>
      <label>
        caption (optional)
        <input type="text" name="caption" placeholder="a little note…" />
      </label>
      {#if form?.photoError}
        <p class="error">{form.photoError}</p>
      {/if}
      {#if form?.photoUploaded}
        <p class="success">uploaded ✓</p>
      {/if}
      <button type="submit" class="btn">upload photo</button>
    </form>

    {#if data.photos.length > 0}
      <div class="photo-grid">
        {#each data.photos as photo}
          <div class="photo-item">
            {#if photo.url}
              <img src={photo.url} alt={photo.caption || ''} />
            {:else}
              <div class="photo-missing">no preview</div>
            {/if}
            {#if photo.caption}
              <p class="caption">{photo.caption}</p>
            {/if}
            <form method="POST" action="?/deletePhoto" use:enhance>
              <input type="hidden" name="id" value={photo.id} />
              <input type="hidden" name="storage_path" value={photo.storage_path} />
              <button type="submit" class="btn btn-ghost delete-btn">delete</button>
            </form>
          </div>
        {/each}
      </div>
    {:else}
      <p class="empty-note">no photos yet</p>
    {/if}
  </section>

  <!-- ── Access Requests ────────────────────── -->
  <section>
    <h2>
      access requests
      {#if data.requests.length > 0}
        <span class="badge">{data.requests.length}</span>
      {/if}
    </h2>

    {#if data.requests.length === 0}
      <p class="empty-note">no pending requests</p>
    {:else}
      <ul class="request-list">
        {#each data.requests as req}
          <li>
            <div class="req-info">
              <span class="req-name">{req.name}</span>
              <span class="req-phone">{req.phone}</span>
              {#if req.note}
                <span class="req-note">"{req.note}"</span>
              {/if}
              <span class="req-date">{new Date(req.created_at).toLocaleDateString()}</span>
            </div>
            <div class="req-actions">
              <form method="POST" action="?/approveRequest" use:enhance>
                <input type="hidden" name="id" value={req.id} />
                <input type="hidden" name="phone" value={req.phone} />
                <input type="hidden" name="name" value={req.name} />
                <button type="submit" class="btn approve-btn">approve</button>
              </form>
              <form method="POST" action="?/denyRequest" use:enhance>
                <input type="hidden" name="id" value={req.id} />
                <button type="submit" class="btn btn-ghost deny-btn">deny</button>
              </form>
            </div>
          </li>
        {/each}
      </ul>
    {/if}
  </section>

  <!-- ── Contacts ────────────────────────────── -->
  <section>
    <h2>contacts</h2>
    <p class="section-hint">
      phone numbers in E.164 format, e.g. <code>+15551234567</code>
    </p>

    <form method="POST" action="?/addContact" use:enhance class="add-contact-form">
      <div class="field-row">
        <label>
          phone number
          <input type="tel" name="phone" placeholder="+15551234567" required />
        </label>
        <label>
          name
          <input type="text" name="name" placeholder="Alex" />
        </label>
      </div>
      {#if form?.contactError}
        <p class="error">{form.contactError}</p>
      {/if}
      {#if form?.contactAdded}
        <p class="success">added ✓</p>
      {/if}
      <button type="submit" class="btn">add contact</button>
    </form>

    {#if data.whitelist.length > 0}
      <ul class="contact-list">
        {#each data.whitelist as contact}
          <li>
            <span class="contact-name">{contact.name || '—'}</span>
            <span class="contact-phone">{contact.phone}</span>
            <form method="POST" action="?/removeContact" use:enhance style="display:inline">
              <input type="hidden" name="id" value={contact.id} />
              <button type="submit" class="btn btn-ghost remove-btn">remove</button>
            </form>
          </li>
        {/each}
      </ul>
    {:else}
      <p class="empty-note">no contacts yet</p>
    {/if}
  </section>
</main>

<style>
  main {
    max-width: 720px;
    margin: 0 auto;
    padding: 3rem 2rem 6rem;
    display: flex;
    flex-direction: column;
    gap: 3.5rem;
  }

  h1 {
    color: var(--gold);
    font-size: 1.6rem;
    font-weight: 600;
    margin: 0 0 0.5rem;
  }

  section {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  h2 {
    color: var(--gold);
    font-size: 0.75rem;
    font-weight: 400;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    margin: 0;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid var(--border);
  }

  .section-hint {
    color: var(--muted);
    font-size: 0.8rem;
    margin: -0.5rem 0 0;
  }

  code {
    background: var(--surface);
    padding: 0.1em 0.4em;
    border-radius: 2px;
    font-size: 0.85em;
  }

  .section-form,
  .add-contact-form,
  .upload-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .field-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  .btn {
    align-self: flex-start;
    padding: 0.6rem 1.4rem;
  }

  /* Photo grid */
  .photo-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 0.75rem;
  }

  .photo-item {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .photo-item img {
    width: 100%;
    aspect-ratio: 1;
    object-fit: cover;
    border-radius: 2px;
    background: var(--surface);
  }

  .photo-missing {
    width: 100%;
    aspect-ratio: 1;
    background: var(--surface);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--muted);
    font-size: 0.75rem;
    border-radius: 2px;
  }

  .caption {
    font-size: 0.75rem;
    color: var(--muted);
    margin: 0;
  }

  .delete-btn,
  .remove-btn {
    font-size: 0.75rem;
    padding: 0.3rem 0.7rem;
    width: 100%;
  }

  /* Contact list */
  .contact-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .contact-list li {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.6rem 0.75rem;
    background: var(--surface);
    border-radius: 2px;
  }

  .contact-name {
    font-size: 0.9rem;
    min-width: 8rem;
  }

  .contact-phone {
    color: var(--muted);
    font-size: 0.85rem;
    flex: 1;
  }

  .empty-note {
    color: var(--muted);
    font-size: 0.85rem;
    margin: 0;
  }

  /* Access requests */
  .badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: var(--gold);
    color: var(--bg);
    font-size: 0.65rem;
    font-weight: 600;
    width: 1.25rem;
    height: 1.25rem;
    border-radius: 50%;
    vertical-align: middle;
    margin-left: 0.4rem;
  }

  .request-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .request-list li {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1rem;
    padding: 0.75rem;
    background: var(--surface);
    border-radius: 2px;
    border-left: 2px solid var(--gold);
  }

  .req-info {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    min-width: 0;
  }

  .req-name {
    font-size: 0.9rem;
    font-weight: 600;
  }

  .req-phone {
    font-size: 0.8rem;
    color: var(--muted);
  }

  .req-note {
    font-size: 0.8rem;
    color: var(--muted);
    font-style: italic;
  }

  .req-date {
    font-size: 0.75rem;
    color: var(--muted);
    margin-top: 0.25rem;
  }

  .req-actions {
    display: flex;
    gap: 0.5rem;
    flex-shrink: 0;
    align-items: center;
  }

  .approve-btn {
    padding: 0.35rem 0.9rem;
    font-size: 0.8rem;
    background: var(--gold);
    border-color: var(--gold);
    color: var(--bg);
  }

  .approve-btn:hover {
    background: #d4a000;
    border-color: #d4a000;
    color: var(--bg);
  }

  .deny-btn {
    padding: 0.35rem 0.9rem;
    font-size: 0.8rem;
  }

  @media (max-width: 500px) {
    .field-row {
      grid-template-columns: 1fr;
    }
  }
</style>
