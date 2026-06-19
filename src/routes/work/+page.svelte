<script>
  import ProjectCard from '$lib/components/ProjectCard.svelte';
  import { metaDescription, projects, skills } from '$lib/profile.js';
</script>

<svelte:head>
  <title>work — veekasmeansprogress.com</title>
  <meta name="description" content={metaDescription} />
  <meta property="og:title" content="work — veekas ashoka" />
  <meta property="og:description" content={metaDescription} />
</svelte:head>

<main>
  <header>
    <a href="/" class="back">← home</a>
    <h1>work</h1>
    <p class="intro">
      Seven years building full-stack web products — lately in climate tech and AI-supported tools.
      Currently at <strong>SolarAPP+</strong>; previously Rewiring America, Arcadia, and The Knot.
    </p>
    <ul class="skills">
      {#each skills as skill}
        <li>{skill}</li>
      {/each}
    </ul>
  </header>

  <section class="projects">
    <h2>selected projects</h2>
    <div class="grid">
      {#each projects as project}
        <ProjectCard {...project} />
      {/each}
    </div>
  </section>

  <footer>
    <p>
      full résumé on
      <a href="https://www.linkedin.com/in/veekas" rel="me" target="_blank">linkedin</a>
      ·
      <a href="https://calendly.com/veekas/meet" target="_blank">grab time on my calendar</a>
    </p>
  </footer>
</main>

<style>
  main {
    max-width: 52rem;
    margin: 0 auto;
    padding: 3rem 2rem 4rem;
  }

  .back {
    display: inline-block;
    color: var(--muted);
    font-size: 0.85rem;
    margin-bottom: 2rem;
  }

  .back:hover {
    color: var(--gold);
  }

  h1 {
    color: var(--gold);
    font-size: clamp(2rem, 6vw, 3rem);
    font-weight: 600;
    margin: 0 0 1rem;
    line-height: 1.1;
  }

  h2 {
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--muted);
    text-transform: lowercase;
    letter-spacing: 0.08em;
    margin: 0 0 1.25rem;
  }

  .intro {
    color: var(--muted);
    font-size: 0.95rem;
    line-height: 1.7;
    margin: 0 0 1.25rem;
    max-width: 40rem;
  }

  .intro strong {
    color: var(--text);
    font-weight: 600;
  }

  .skills {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    margin: 0 0 3rem;
    padding: 0;
    list-style: none;
  }

  .skills li {
    font-size: 0.7rem;
    color: var(--gold);
    border: 1px solid var(--border);
    padding: 0.25rem 0.55rem;
    border-radius: 2px;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 20rem), 1fr));
    gap: 1rem;
  }

  footer {
    margin-top: 3rem;
    padding-top: 1.5rem;
    border-top: 1px solid var(--border);
  }

  footer p {
    margin: 0;
    color: var(--muted);
    font-size: 0.85rem;
    line-height: 1.6;
  }

  footer a {
    color: var(--text);
  }
</style>
