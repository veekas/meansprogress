<script>
  import Nav from '$lib/components/Nav.svelte';
  import Pagination from '$lib/components/Pagination.svelte';

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
  <title>what i'm reading — veekasmeansprogress.com</title>
</svelte:head>

<Nav showAdmin={data.isAdmin} />

<main>
  <a href="/feed" class="back-link">← back to feed</a>
  <h1>what i'm reading</h1>

  {#if data.totalCount === 0}
    <p class="empty">nothing here yet.</p>
  {:else}
    <ol class="history">
      {#each data.posts as post}
        <li>
          <time datetime={post.created_at}>{formatDate(post.created_at)}</time>
          <div class="reading">
            <span class="reading-title">{post.title}</span>
            {#if post.author}
              <span class="reading-author">by {post.author}</span>
            {/if}
            {#if post.note}
              <p class="reading-note">{post.note}</p>
            {/if}
          </div>
        </li>
      {/each}
    </ol>
    <Pagination page={data.page} totalPages={data.totalPages} basePath="/feed/reading" />
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

  .history {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
  }

  .history li {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    padding-bottom: 2.5rem;
    border-bottom: 1px solid var(--border);
  }

  .history li:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  time {
    font-size: 0.75rem;
    color: var(--muted);
    letter-spacing: 0.05em;
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

  .empty {
    color: var(--muted);
    font-size: 0.9rem;
    margin: 0;
  }
</style>
