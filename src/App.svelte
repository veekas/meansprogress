<script>
  import { fly } from "svelte/transition";
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

  <section class="about">
    <h2>Senior Software Engineer</h2>
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

  <div class="footer-links">
    <div class="link">
      <a href="http://beaconcan.org">BCAN</a>
    </div>

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
      <a href="http://www.goodreads.com/veekas" rel="me">goodreads</a>
    </div>

    <div class="link">
      <a href="http://www.instagram.com/veekas" rel="me">instagram</a>
    </div>

    <div class="link">
      <a href="https://www.linkedin.com/in/veekas" rel="me">linkedin</a>
    </div>

    <div class="link">
      <a href="https://toot.cafe/@veekas" rel="me">mastodon</a>
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
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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

  .about {
    max-width: 600px;
    margin: 2rem auto;
    padding: 0 2rem;
  }

  .about h2 {
    color: #ecb600;
    font-size: 3vh;
    margin-bottom: 1rem;
    font-weight: 600;
  }

  .about .bio {
    font-size: 2.2vh;
    line-height: 1.6;
    margin-bottom: 1.5rem;
    text-align: left;
  }

  .about .bio strong {
    color: #ecb600;
  }

  .skills {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    justify-content: center;
  }

  .skill-tag {
    background-color: rgba(236, 182, 0, 0.15);
    border: 1px solid #ecb600;
    color: #ecb600;
    padding: 0.4rem 0.8rem;
    border-radius: 4px;
    font-size: 1.8vh;
    font-weight: 400;
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
