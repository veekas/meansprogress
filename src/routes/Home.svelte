<script>
  import { fly } from 'svelte/transition';
  import { Router, Link, Route } from 'svelte-routing';
</script>

<style>
  body {
    overflow: hidden;
  }

  main {
    text-align: center;
    padding: 0 10vmin 10vmin;
    color: #f9fbf9;
    height: 100vh;
    justify-content: space-between;
  }

  h1 {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 13vmin;
    line-height: 1;
  }

  .shift-right {
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
    line-height: 1.66;
    font-size: 4vh;
  }

  @media (min-width: 640px) {
    .link {
      line-height: 1.25;
    }
  }
</style>

<main>
  <h1>
    <span class="shift-left">veekas</span>
    <span class="shift-right" in:fly={{ y: -75, delay: 1400, duration: 800 }}>
      ashoka
    </span>
  </h1>
  <div class="footer-links">
    <div class="link" in:fly={{ x: 200, duration: 800, delay: 0 }}>
      <Link to="blog">blog</Link>
    </div>

    <div class="link" in:fly={{ x: 200, duration: 800, delay: 100 }}>
      <a href="mailto:veekas@veekasmeansprogress.com">email</a>
    </div>

    <div class="link" in:fly={{ x: 200, duration: 800, delay: 200 }}>
      <a href="https://www.facebook.com/veekas">facebook</a>
    </div>

    <div class="link" in:fly={{ x: 200, duration: 800, delay: 300 }}>
      <a href="https://www.github.com/veekas">github</a>
    </div>

    <div class="link" in:fly={{ x: 200, duration: 800, delay: 400 }}>
      <a href="http://www.goodreads.com/veekas">goodreads</a>
    </div>

    <div class="link" in:fly={{ x: 200, duration: 800, delay: 500 }}>
      <a href="http://www.instagram.com/veekas">instagram</a>
    </div>

    <div class="link" in:fly={{ x: 200, duration: 800, delay: 600 }}>
      <a href="https://www.linkedin.com/in/veekas">linkedin</a>
    </div>

    <div class="link" in:fly={{ x: 200, duration: 800, delay: 700 }}>
      <a href="https://tinyletter.com/veekas">newsletter</a>
    </div>

    <!-- <div class="link" in:fly="{{ x: 200, duration: 800, delay: 0 }}">
        <a href="https://veekas.github.io/react-resume/resume.pdf">Resume</a>
      </div> -->

    <div class="link" in:fly={{ x: 200, duration: 800, delay: 800 }}>
      <a href="https://www.twitter.com/veekas">twitter</a>
    </div>
  </div>
</main>
