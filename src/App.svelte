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
  <div class="header-section">
    <h1>
      <span class="shift-left">veekas</span>
      <span
        class="shift-right"
        transition:fly={{ y: -75, delay: 1000, duration: 2000 }}
      >
        ashoka
      </span>
    </h1>
    <p class="tagline">
      software engineer III • react/typescript/rust • climate tech
    </p>
  </div>
  <div class="footer-links">
    <div class="link">
      <a href="https://www.github.com/veekas" rel="me">github</a>
    </div>

    <div class="link">
      <a href="https://www.linkedin.com/in/veekas" rel="me">linkedin</a>
    </div>

    <div class="link">
      <a href="mailto:veekas@duck.com" rel="me">email</a>
    </div>

    <div class="link">
      <a href="https://calendly.com/veekas/meet" rel="me">calendar</a>
    </div>

    <div class="link">
      <a href="https://app.thestorygraph.com/profile/veekas" rel="me">storygraph</a>
    </div>

    <div class="link">
      <a href="http://www.instagram.com/veekas" rel="me">instagram</a>
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

  .header-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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
    margin-bottom: 0.5em;
  }

  .tagline {
    color: #f9fbf9;
    font-size: 2.5vh;
    font-weight: 400;
    margin: 0;
    opacity: 0.9;
    letter-spacing: 0.05em;
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

  @media (min-width: 640px) {
    main {
      max-width: none;
    }

    /* h1 {
      margin-top: 0;
    } */
  }
</style>
