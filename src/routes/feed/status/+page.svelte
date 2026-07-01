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
  <title>what i'm up to — veekasmeansprogress.com</title>
</svelte:head>

<main>
  <a href="/feed" class="back-link">← back to feed</a>
  <h1>what i'm up to</h1>

  {#if data.totalCount === 0}
    <p class="empty">nothing here yet.</p>
  {:else}
    <ol class="history">
      {#each data.posts as post}
        <li>
          <time datetime={post.created_at}>{formatDate(post.created_at)}</time>
          <p class="status-text">{post.body}</p>
          <Comments postId={post.id} comments={post.comments} currentUserId={data.user?.id} isAdmin={data.isAdmin} />
        </li>
      {/each}
    </ol>
    <Pagination page={data.page} totalPages={data.totalPages} basePath="/feed/status" />
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

  .status-text {
    font-size: 1.05rem;
    line-height: 1.75;
    margin: 0;
    white-space: pre-wrap;
  }

  .empty {
    color: var(--muted);
    font-size: 0.9rem;
    margin: 0;
  }
</style>
