<script>
  import { fly } from 'svelte/transition';
</script>

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
    font-family: 'Fira Code', monospace;
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

  @media (min-width: 640px) {
    main {
      max-width: none;
    }

    /* h1 {
      margin-top: 0;
    } */
  }
</style>

<svelte:head>
  <link
    href="https://fonts.googleapis.com/css?family=Fira+Code:400,600&display=swap"
    rel="stylesheet" />
</svelte:head>
<main>
  <h1>
    <span class="shift-left">veekas</span>
    <span
      class="shift-right"
      transition:fly={{ y: -75, delay: 1000, duration: 2000 }}>
      ashoka
    </span>
  </h1>
  <div class="footer-links">
    <div class="link">
      <a href="mailto:veekas@veekasmeansprogress.com">email</a>
    </div>

    <div class="link">
      <a href="https://www.facebook.com/veekas">facebook</a>
    </div>

    <div class="link">
      <a href="https://www.github.com/veekas">github</a>
    </div>

    <div class="link">
      <a href="http://www.goodreads.com/veekas">goodreads</a>
    </div>

    <div class="link">
      <a href="http://www.instagram.com/veekas">instagram</a>
    </div>

    <div class="link">
      <a href="https://www.linkedin.com/in/veekas">linkedin</a>
    </div>

    <div class="link">
      <a href="https://tinyletter.com/veekas">newsletter</a>
    </div>

    <!-- <div class="link">
      <a href="https://veekas.github.io/react-resume/resume.pdf">Resume</a>
    </div> -->

    <div class="link">
      <a href="https://www.twitter.com/veekas">twitter</a>
    </div>

  </div>
</main>
