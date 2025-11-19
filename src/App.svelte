<script>
  import { fly } from "svelte/transition";
  import ProjectCard from "./ProjectCard.svelte";

  const projects = [
    {
      title: "IRA Savings Calculator",
      company: "Rewiring America",
      description: "Interactive tool helping homeowners calculate potential savings from Inflation Reduction Act incentives for home electrification projects. Provides personalized recommendations based on location, income, and home characteristics.",
      technologies: ["React", "TypeScript", "API Integration"],
      link: "https://www.rewiringamerica.org/app/ira-calculator",
      imagePlaceholder: "Screenshot: IRA Calculator Interface"
    },
    {
      title: "Rewiring America Website",
      company: "Rewiring America",
      description: "Main public-facing website for the organization's mission to electrify homes and buildings. Focused on performance optimization, accessibility improvements, and responsive design.",
      technologies: ["React", "Next.js", "Accessibility", "Performance"],
      link: "https://www.rewiringamerica.org",
      imagePlaceholder: "Screenshot: Rewiring America Homepage"
    },
    {
      title: "Community Solar Platform",
      company: "Arcadia",
      description: "Features enabling community solar enrollment, helping users access clean energy without rooftop panels. Streamlined onboarding flow and real-time availability updates.",
      technologies: ["React", "Node.js", "PostgreSQL"],
      link: "",
      imagePlaceholder: "Screenshot: Community Solar Enrollment"
    },
    {
      title: "Energy Dashboard",
      company: "Arcadia",
      description: "Data visualization tools for users to track energy usage, costs, and savings. Interactive charts and insights to help optimize energy consumption.",
      technologies: ["React", "D3.js", "Data Visualization"],
      link: "",
      imagePlaceholder: "Screenshot: Energy Usage Dashboard"
    },
    {
      title: "Wedding Planning Tools",
      company: "The Knot",
      description: "Suite of tools for couples to plan their wedding, including guest list management, budget tracking, and vendor coordination. Focus on intuitive UX and mobile optimization.",
      technologies: ["React", "Redux", "Mobile-First Design"],
      link: "",
      imagePlaceholder: "Screenshot: Wedding Planner Interface"
    },
    {
      title: "Vendor Marketplace",
      company: "The Knot",
      description: "Enhanced search and filtering for wedding vendors. Improved discovery experience with faceted search, reviews, and booking integration.",
      technologies: ["React", "Elasticsearch", "Performance"],
      link: "",
      imagePlaceholder: "Screenshot: Vendor Search Results"
    }
  ];
</script>

<svelte:head>
  <link
    href="https://fonts.googleapis.com/css?family=Fira+Code:400,600&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<div class="page-wrapper">
  <header>
    <h1>
      <span class="shift-left">veekas</span>
      <span
        class="shift-right"
        transition:fly={{ y: -75, delay: 1000, duration: 2000 }}
      >
        ashoka
      </span>
    </h1>
    <p class="tagline">Senior Software Engineer · Climate Tech</p>
  </header>

  <main>
    <section id="about" class="about">
      <h2>About</h2>
      <p class="bio">
        Building tools for climate action at <strong>Rewiring America</strong>,
        where I develop web applications that help homeowners electrify their homes
        and access clean energy incentives. Previously contributed to clean energy
        solutions at <strong>Arcadia</strong> and wedding planning tools at <strong>The Knot</strong>.
      </p>
      <div class="skills">
        <span class="skill-tag">React</span>
        <span class="skill-tag">TypeScript</span>
        <span class="skill-tag">Svelte</span>
        <span class="skill-tag">Node.js</span>
        <span class="skill-tag">Accessibility</span>
        <span class="skill-tag">Performance</span>
      </div>
    </section>

    <section id="portfolio" class="portfolio">
      <h2>Portfolio</h2>
      <div class="projects-grid">
        {#each projects as project}
          <ProjectCard {...project} />
        {/each}
      </div>
    </section>

    <section id="connect" class="connect">
      <h2>Connect</h2>
      <div class="links-grid">
        <a href="https://calendly.com/veekas/meet" rel="me" class="link-card">
          <span class="link-icon">📅</span>
          <span class="link-text">calendar</span>
        </a>
        <a href="mailto:veekas@duck.com" rel="me" class="link-card">
          <span class="link-icon">✉️</span>
          <span class="link-text">email</span>
        </a>
        <a href="https://www.github.com/veekas" rel="me" class="link-card">
          <span class="link-icon">💻</span>
          <span class="link-text">github</span>
        </a>
        <a href="https://www.linkedin.com/in/veekas" rel="me" class="link-card">
          <span class="link-icon">👔</span>
          <span class="link-text">linkedin</span>
        </a>
        <a href="https://toot.cafe/@veekas" rel="me" class="link-card">
          <span class="link-icon">🐘</span>
          <span class="link-text">mastodon</span>
        </a>
        <a href="http://www.goodreads.com/veekas" rel="me" class="link-card">
          <span class="link-icon">📚</span>
          <span class="link-text">goodreads</span>
        </a>
        <a href="http://www.instagram.com/veekas" rel="me" class="link-card">
          <span class="link-icon">📷</span>
          <span class="link-text">instagram</span>
        </a>
      </div>
    </section>
  </main>

  <footer>
    <p>&copy; 2024 Veekas Ashoka</p>
  </footer>
</div>

<style>
  /* Box sizing and reset */
  *,
  *:before,
  *:after {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  :global(html) {
    scroll-behavior: smooth;
  }

  :global(body) {
    margin: 0;
    padding: 0;
    background-color: #282f30;
    font-family: "Fira Code", monospace;
    color: #f9fbf9;
  }

  .page-wrapper {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  /* Header */
  header {
    text-align: center;
    padding: 4rem 2rem 2rem;
    position: sticky;
    top: 0;
    background: linear-gradient(180deg, #282f30 0%, #282f30 90%, rgba(40, 47, 48, 0) 100%);
    z-index: 10;
  }

  h1 {
    color: #ecb600;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 13vmin;
    font-weight: 600;
    line-height: 1;
    margin: 0 0 0.5rem 0;
  }

  .shift-right {
    padding-left: 4ch;
  }

  .shift-left {
    padding-right: 4ch;
  }

  .tagline {
    color: rgba(249, 251, 249, 0.8);
    font-size: 2.2vh;
    margin: 0;
    font-weight: 400;
  }

  /* Main content */
  main {
    flex: 1;
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
    padding: 2rem;
  }

  section {
    margin-bottom: 4rem;
  }

  h2 {
    color: #ecb600;
    font-size: 4vh;
    margin-bottom: 2rem;
    font-weight: 600;
    text-align: center;
  }

  /* About section */
  .about {
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
  }

  .about .bio {
    font-size: 2.2vh;
    line-height: 1.7;
    margin-bottom: 1.5rem;
    text-align: left;
  }

  .about .bio strong {
    color: #ecb600;
    font-weight: 600;
  }

  .skills {
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem;
    justify-content: center;
  }

  .skill-tag {
    background-color: rgba(236, 182, 0, 0.15);
    border: 1px solid #ecb600;
    color: #ecb600;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    font-size: 1.8vh;
    font-weight: 400;
    transition: all 0.2s;
  }

  .skill-tag:hover {
    background-color: rgba(236, 182, 0, 0.25);
    transform: translateY(-2px);
  }

  /* Portfolio section */
  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 2rem;
  }

  /* Connect section */
  .links-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
    max-width: 800px;
    margin: 0 auto;
  }

  .link-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    padding: 1.5rem;
    background-color: rgba(236, 182, 0, 0.05);
    border: 1px solid rgba(236, 182, 0, 0.2);
    border-radius: 8px;
    text-decoration: none;
    color: #f9fbf9;
    transition: all 0.3s;
  }

  .link-card:hover {
    background-color: rgba(236, 182, 0, 0.15);
    border-color: rgba(236, 182, 0, 0.4);
    transform: translateY(-4px);
  }

  .link-icon {
    font-size: 2rem;
  }

  .link-text {
    font-size: 1.8vh;
    color: #ecb600;
    font-weight: 500;
  }

  /* Footer */
  footer {
    text-align: center;
    padding: 2rem;
    color: rgba(249, 251, 249, 0.6);
    font-size: 1.6vh;
    border-top: 1px solid rgba(236, 182, 0, 0.1);
  }

  footer p {
    margin: 0;
  }

  /* Responsive */
  @media (max-width: 640px) {
    header {
      padding: 2rem 1rem 1rem;
    }

    h1 {
      font-size: 15vmin;
    }

    main {
      padding: 1rem;
    }

    .projects-grid {
      grid-template-columns: 1fr;
    }

    .links-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (min-width: 1400px) {
    .projects-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }
</style>
