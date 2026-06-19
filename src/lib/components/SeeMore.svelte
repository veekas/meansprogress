<script>
  let { href, label = 'see more' } = $props();
</script>

<a {href} class="see-more">{label} →</a>

<style>
  .see-more {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    font-size: 0.85rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    color: var(--gold);
    border: 1px solid var(--gold);
    padding: 0.5rem 1rem;
    border-radius: 2px;
    align-self: flex-start;
    transition: background 0.15s ease, color 0.15s ease;
  }

  .see-more:hover {
    background: var(--gold);
    color: var(--bg);
  }
</style>
