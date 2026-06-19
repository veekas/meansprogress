<script>
  import Nav from '$lib/components/Nav.svelte';
  let { data } = $props();

  const { content, photos, isAdmin } = data;
</script>

<svelte:head>
  <title>what's up — veekasmeansprogress.com</title>
</svelte:head>

<Nav showAdmin={isAdmin} />

<main>
  {#if content.status}
    <section>
      <h2>what's up</h2>
      <p class="status-text">{content.status}</p>
    </section>
  {/if}

  {#if content.reading_title}
    <section>
      <h2>reading</h2>
      <div class="reading">
        <span class="reading-title">{content.reading_title}</span>
        {#if content.reading_author}
          <span class="reading-author">by {content.reading_author}</span>
        {/if}
        {#if content.reading_note}
          <p class="reading-note">{content.reading_note}</p>
        {/if}
      </div>
    </section>
  {/if}

  {#if content.address}
    <section>
      <h2>where i am</h2>
      <p class="address">{content.address}</p>
    </section>
  {/if}

  {#if content.contact_email || content.contact_phone}
    <section>
      <h2>reach me</h2>
      <div class="contact">
        {#if content.contact_email}
          <a href="mailto:{content.contact_email}">{content.contact_email}</a>
        {/if}
        {#if content.contact_phone}
          <a href="tel:{content.contact_phone}">{content.contact_phone}</a>
        {/if}
      </div>
    </section>
  {/if}

  {#if photos.length > 0}
    <section>
      <h2>photos</h2>
      <div class="photo-grid">
        {#each photos as photo}
          <figure>
            <img src={photo.url} alt={photo.caption || ''} loading="lazy" />
            {#if photo.caption}
              <figcaption>{photo.caption}</figcaption>
            {/if}
          </figure>
        {/each}
      </div>
    </section>
  {/if}

  {#if !content.status && !content.reading_title && !content.address && photos.length === 0}
    <div class="empty">
      <p>nothing here yet.</p>
    </div>
  {/if}
</main>

<style>
  main {
    max-width: 680px;
    margin: 0 auto;
    padding: 3rem 2rem 6rem;
    display: flex;
    flex-direction: column;
    gap: 3rem;
  }

  section {
    display: flex;
    flex-direction: column;
    gap: 0.9rem;
  }

  h2 {
    color: var(--gold);
    font-size: 0.75rem;
    font-weight: 400;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    margin: 0;
  }

  .status-text {
    font-size: 1.05rem;
    line-height: 1.75;
    margin: 0;
    white-space: pre-wrap;
  }

  .reading {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .reading-title {
    font-size: 1.1rem;
    font-weight: 600;
  }

  .reading-author {
    color: var(--muted);
    font-size: 0.9rem;
  }

  .reading-note {
    margin: 0.5rem 0 0;
    font-size: 0.9rem;
    color: var(--muted);
    line-height: 1.7;
    font-style: italic;
  }

  .address {
    font-size: 0.95rem;
    line-height: 1.8;
    margin: 0;
    white-space: pre-wrap;
  }

  .contact {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .contact a {
    font-size: 0.95rem;
  }

  .photo-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 0.75rem;
  }

  figure {
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }

  img {
    width: 100%;
    aspect-ratio: 1;
    object-fit: cover;
    border-radius: 2px;
    background: var(--surface);
  }

  figcaption {
    font-size: 0.75rem;
    color: var(--muted);
  }

  .empty {
    color: var(--muted);
    font-size: 0.9rem;
    padding: 3rem 0;
    text-align: center;
  }
</style>
