<script>
  import { enhance } from '$app/forms';
  let { showAdmin = false } = $props();
</script>

<nav>
  <a href="/" class="site-name">veekas.me</a>
  <div class="nav-right">
    {#if showAdmin}
      <a href="/admin" class="nav-link">admin</a>
    {/if}
    <form method="POST" action="/logout" use:enhance>
      <button type="submit" class="btn btn-ghost">sign out</button>
    </form>
  </div>
</nav>

<style>
  nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.25rem 2rem;
    border-bottom: 1px solid var(--border);
  }

  .site-name {
    color: var(--gold);
    font-size: 1rem;
    font-weight: 600;
    letter-spacing: 0.03em;
  }

  .nav-right {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .nav-link {
    color: var(--muted);
    font-size: 0.85rem;
  }

  .nav-link:hover {
    color: var(--text);
  }
</style>
