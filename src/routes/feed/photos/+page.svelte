<script>
  import Pagination from '$lib/components/Pagination.svelte';
  import Comments from '$lib/components/Comments.svelte';

  let { data } = $props();

  function formatDate(iso) {
    return new Date(iso).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
</script>

<svelte:head>
  <title>proof of life — veekasmeansprogress.com</title>
</svelte:head>

<main>
  <a href="/feed" class="back-link">← back to feed</a>
  <h1>proof of life</h1>

  {#if data.totalCount === 0}
    <p class="empty">nothing here yet.</p>
  {:else}
    <div class="photo-grid">
      {#each data.photos as photo}
        <figure>
          <img src={photo.url} alt={photo.caption || ''} loading="lazy" />
          {#if photo.caption}
            <figcaption>{photo.caption}</figcaption>
          {/if}
          <time datetime={photo.created_at}>{formatDate(photo.created_at)}</time>
          <Comments postId={photo.id} comments={photo.comments} currentUserId={data.user?.id} isAdmin={data.isAdmin} />
        </figure>
      {/each}
    </div>
    <Pagination page={data.page} totalPages={data.totalPages} basePath="/feed/photos" />
  {/if}
</main>

<style>
  main {
    max-width: 680px;
    margin: 0 auto;
    padding: 3rem 2rem 6rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .back-link {
    font-size: 0.8rem;
    color: var(--muted);
  }

  h1 {
    color: var(--gold);
    font-size: 0.75rem;
    font-weight: 400;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    margin: 0;
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

  time {
    font-size: 0.7rem;
    color: var(--muted);
    letter-spacing: 0.05em;
  }

  .empty {
    color: var(--muted);
    font-size: 0.9rem;
    margin: 0;
  }
</style>
