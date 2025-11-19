<script>
  export let title;
  export let company;
  export let description;
  export let technologies;
  export let link = "";
  export let imagePlaceholder = "";
</script>

<article class="project-card">
  <div class="project-header">
    <h3>{title}</h3>
    <span class="company">{company}</span>
  </div>

  {#if imagePlaceholder}
    <div class="image-placeholder">
      <p>{imagePlaceholder}</p>
    </div>
  {/if}

  <p class="description">{description}</p>

  <div class="technologies">
    {#each technologies as tech}
      <span class="tech-tag">{tech}</span>
    {/each}
  </div>

  {#if link}
    <a href={link} class="project-link" target="_blank" rel="noopener noreferrer">
      View Project →
    </a>
  {/if}
</article>

<style>
  .project-card {
    background-color: rgba(236, 182, 0, 0.05);
    border: 1px solid rgba(236, 182, 0, 0.2);
    border-radius: 8px;
    padding: 1.5rem;
    transition: transform 0.2s, border-color 0.2s;
  }

  .project-card:hover {
    transform: translateY(-2px);
    border-color: rgba(236, 182, 0, 0.4);
  }

  .project-header {
    margin-bottom: 1rem;
  }

  .project-header h3 {
    color: #ecb600;
    font-size: 2.2vh;
    margin: 0 0 0.5rem 0;
    font-weight: 600;
  }

  .company {
    color: #f9fbf9;
    font-size: 1.8vh;
    opacity: 0.8;
  }

  .image-placeholder {
    background-color: rgba(236, 182, 0, 0.1);
    border: 1px dashed rgba(236, 182, 0, 0.3);
    border-radius: 4px;
    padding: 3rem 1rem;
    margin-bottom: 1rem;
    text-align: center;
  }

  .image-placeholder p {
    color: #ecb600;
    font-size: 1.6vh;
    margin: 0;
    opacity: 0.6;
  }

  .description {
    font-size: 1.9vh;
    line-height: 1.5;
    margin-bottom: 1rem;
    color: #f9fbf9;
  }

  .technologies {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    margin-bottom: 1rem;
  }

  .tech-tag {
    background-color: rgba(236, 182, 0, 0.15);
    border: 1px solid #ecb600;
    color: #ecb600;
    padding: 0.3rem 0.6rem;
    border-radius: 3px;
    font-size: 1.5vh;
    font-weight: 400;
  }

  .project-link {
    display: inline-block;
    color: #ecb600;
    font-size: 1.8vh;
    text-decoration: none;
    font-weight: 600;
    transition: opacity 0.2s;
  }

  .project-link:hover {
    opacity: 0.8;
  }
</style>
