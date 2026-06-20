<script>
  /** @type {{ title: string; company: string; period?: string; description: string; technologies: readonly string[]; href?: string }} */
  let { title, company, period, description, technologies, href } = $props();
</script>

<article class="card">
  <header>
    <div class="card-meta">
      <span class="company">{company}</span>
      {#if period}
        <span class="period">{period}</span>
      {/if}
    </div>
    <h3>
      {#if href}
        <a {href} target="_blank" rel="noopener noreferrer">{title}</a>
      {:else}
        {title}
      {/if}
    </h3>
  </header>
  <p>{description}</p>
  <ul class="tags">
    {#each technologies as tech}
      <li>{tech}</li>
    {/each}
  </ul>
</article>

<style>
  .card {
    border: 1px solid var(--border);
    background: var(--surface);
    padding: 1.25rem 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    transition:
      border-color 0.2s ease,
      transform 0.2s ease;
  }

  .card:hover {
    border-color: var(--gold);
    transform: translateY(-2px);
  }

  .card-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem 1rem;
    font-size: 0.75rem;
    color: var(--muted);
    text-transform: lowercase;
    letter-spacing: 0.04em;
  }

  .company {
    color: var(--gold);
  }

  h3 {
    margin: 0;
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.4;
  }

  h3 a {
    color: var(--text);
  }

  h3 a:hover {
    color: var(--gold);
  }

  p {
    margin: 0;
    color: var(--muted);
    font-size: 0.85rem;
    line-height: 1.65;
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .tags li {
    font-size: 0.7rem;
    color: var(--muted);
    border: 1px solid var(--border);
    padding: 0.2rem 0.5rem;
    border-radius: 2px;
  }
</style>
