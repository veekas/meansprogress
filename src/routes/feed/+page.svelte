<script>
  import SeeMore from "$lib/components/SeeMore.svelte";

  let { data } = $props();

  const {
    content,
    photos,
    latestStatus,
    latestReading,
    statusCount,
    readingCount,
    photoCount,
  } = data;

  const latestPhoto = photos[0] ?? null;
</script>

<svelte:head>
  <title>what's up — veekasmeansprogress.com</title>
</svelte:head>

<main>
  {#if latestStatus}
    <section>
      <h2>what i'm up to</h2>
      <p class="status-text">{latestStatus.body}</p>
      {#if statusCount > 1}
        <SeeMore href="/feed/status" />
      {/if}
    </section>
  {/if}

  {#if latestReading}
    <section>
      <h2>what i'm reading</h2>
      <div class="reading">
        <span class="reading-title">{latestReading.title}</span>
        {#if latestReading.author}
          <span class="reading-author">by {latestReading.author}</span>
        {/if}
        {#if latestReading.note}
          <p class="reading-note">{latestReading.note}</p>
        {/if}
      </div>
      {#if readingCount > 1}
        <SeeMore href="/feed/reading" />
      {/if}
    </section>
  {/if}

  {#if latestPhoto}
    <section>
      <h2>photos</h2>
      <figure>
        <img
          src={latestPhoto.url}
          alt={latestPhoto.caption || ""}
          loading="lazy"
        />
        {#if latestPhoto.caption}
          <figcaption>{latestPhoto.caption}</figcaption>
        {/if}
      </figure>
      {#if photoCount > 1}
        <SeeMore href="/feed/photos" />
      {/if}
    </section>
  {/if}

  {#if content.contact_email || content.contact_phone}
    <section>
      <h2>my contact info</h2>
      <div class="contact">
        {#if content.contact_email}
          <div class="contact-item">
            <h3>email</h3>
            <a href="mailto:{content.contact_email}">{content.contact_email}</a>
          </div>
        {/if}
        {#if content.contact_phone}
          <div class="contact-item">
            <h3>phone</h3>
            <a href="tel:{content.contact_phone}">{content.contact_phone}</a>
          </div>
        {/if}
        {#if content.address}
          <div class="contact-item">
            <h3>address</h3>
            <p class="address">{content.address}</p>
          </div>
        {/if}
      </div>
    </section>
  {/if}

  {#if !latestStatus && !latestReading && !content.address && !latestPhoto}
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

  h3 {
    font-size: 0.8rem;
    font-weight: 400;
    color: var(--muted);
    text-transform: lowercase;
    letter-spacing: 0.05em;
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
    gap: 1.25rem;
  }

  .contact-item {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .contact a {
    font-size: 0.95rem;
  }

  figure {
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    max-width: 320px;
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
