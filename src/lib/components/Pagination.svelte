<script>
  let { page, totalPages, basePath } = $props();

  function href(p) {
    return p === 1 ? basePath : `${basePath}?page=${p}`;
  }
</script>

{#if totalPages > 1}
  <nav class="pagination" aria-label="Pagination">
    {#if page > 1}
      <a href={href(page - 1)} class="page-link">← newer</a>
    {:else}
      <span class="page-link disabled" aria-hidden="true">← newer</span>
    {/if}
    <span class="page-status">{page} / {totalPages}</span>
    {#if page < totalPages}
      <a href={href(page + 1)} class="page-link">older →</a>
    {:else}
      <span class="page-link disabled" aria-hidden="true">older →</span>
    {/if}
  </nav>
{/if}

<style>
  .pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.25rem;
    padding-top: 1rem;
  }

  .page-link {
    font-size: 0.85rem;
    color: var(--gold);
    border: 1px solid var(--gold);
    padding: 0.45rem 0.9rem;
    border-radius: 2px;
    transition: background 0.15s ease, color 0.15s ease;
  }

  .page-link:hover {
    background: var(--gold);
    color: var(--bg);
  }

  .page-link.disabled {
    color: var(--muted);
    border-color: var(--border);
    opacity: 0.5;
    pointer-events: none;
  }

  .page-status {
    font-size: 0.8rem;
    color: var(--muted);
    letter-spacing: 0.05em;
  }
</style>
