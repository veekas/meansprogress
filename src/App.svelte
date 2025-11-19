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
<main>
  <h1>
    <span class="shift-left">veekas</span>
    <span
      class="shift-right"
      transition:fly={{ y: -75, delay: 1000, duration: 2000 }}
    >
      ashoka
    </span>
  </h1>

  <section class="portfolio">
    <h2>Portfolio</h2>
    <div class="projects-grid">
      {#each projects as project}
        <ProjectCard {...project} />
      {/each}
    </div>
  </section>

  <div class="footer-links">
    <div class="link">
      <a href="https://calendly.com/veekas/meet" rel="me">calendar</a>
    </div>

    <div class="link">
      <a href="mailto:veekas@duck.com" rel="me">email</a>
    </div>

    <!-- <div class="link">
      <a href="https://www.facebook.com/veekas" rel="me">facebook</a>
    </div> -->

    <div class="link">
      <a href="https://www.github.com/veekas" rel="me">github</a>
    </div>

    <div class="link">
      <a href="https://app.thestorygraph.com/profile/veekas" rel="me">storygraph</a>
    </div>

    <div class="link">
      <a href="http://www.instagram.com/veekas" rel="me">instagram</a>
    </div>

    <div class="link">
      <a href="https://www.linkedin.com/in/veekas" rel="me">linkedin</a>
    </div>

    <!-- <div class="link">
      <a href="https://tinyletter.com/veekas" rel="me">newsletter</a>
    </div> -->

    <!-- <div class="link">
      <a href="https://veekas.github.io/react-resume/resume.pdf">Resume</a>
    </div> -->

    <!-- <div class="link">
      <a href="https://www.twitter.com/veekas" rel="me">twitter</a>
    </div> -->
  </div>
</main>

<style>
  /* set width, height, & min/max properties to include content, padding, & border */
  *,
  *:before,
  *:after {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  /* remove default margin */
  :global(body) {
    height: 100%;
    display: flex;
    justify-content: center;
    margin: 0;
    padding: 0;
    background-color: #282f30;
    font-family: "Fira Code", monospace;
  }

  a {
    color: #f9fbf9;
    font-size: 4vh;
  }

  main {
    text-align: center;
    padding: 0 10vmin 10vmin;
    color: #f9fbf9;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 3rem;
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
  }
  /*  */
  .shift-right {
    /* margin-top: 1.33em; */
    padding-left: 4ch;
  }

  .shift-left {
    padding-right: 4ch;
  }

  .footer-links {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  .link {
    line-height: 1.5;
  }

  .portfolio {
    max-width: 1200px;
    width: 100%;
    margin: 2rem auto;
    padding: 0 2rem;
  }

  .portfolio h2 {
    color: #ecb600;
    font-size: 4vh;
    margin-bottom: 2rem;
    font-weight: 600;
  }

  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
    text-align: left;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }

    /* h1 {
      margin-top: 0;
    } */
  }
</style>
