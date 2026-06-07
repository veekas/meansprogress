<script>
  import { fly } from 'svelte/transition';
  let { data } = $props();
</script>

<svelte:head>
  <title>veekas ashoka</title>
</svelte:head>

<main>
  <h1>
    <span class="shift-left" in:fly={{ y: -30, duration: 1200, delay: 100 }}>veekas</span>
    <span class="shift-right" in:fly={{ y: -75, delay: 1000, duration: 2000 }}>ashoka</span>
  </h1>

  {#if data.bio}
    <p class="bio">{data.bio}</p>
  {/if}

  <div class="links">
    <a href="https://i.airbuds.fm/veekas/FJLDpeRRL6" rel="me" target="_blank">airbuds</a>
    <a href="https://allogrow.com" rel="me" target="_blank">allo</a>
    <a href="https://calendly.com/veekas/meet" rel="me" target="_blank">calendar</a>
    <a href="mailto:veekas@duck.com" rel="me">email</a>
    <a href="https://www.github.com/veekas" rel="me" target="_blank">github</a>
    <a href="http://www.instagram.com/veekas" rel="me" target="_blank">instagram</a>
    <a href="https://www.linkedin.com/in/veekas" rel="me" target="_blank">linkedin</a>
    <a href="https://app.thestorygraph.com/profile/veekas" rel="me" target="_blank">storygraph</a>
    <a href="https://strava.app.link/gpIRjM032Yb" rel="me" target="_blank">strava</a>
  </div>

  <div class="signin">
    {#if data.session}
      <a href="/feed" class="btn">see what's up →</a>
    {:else}
      <a href="/login" class="btn">sign in</a>
      <a href="/request-access" class="request-link">request access</a>
    {/if}
  </div>
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
    min-height: 100vh;
    padding: 0 10vmin 10vmin;
    text-align: right;
  }

  h1 {
    color: var(--gold);
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    font-size: 13vmin;
    font-weight: 600;
    line-height: 1;
    margin: 0;
    padding-top: 8vmin;
    width: 100%;
  }

  .shift-left {
    padding-right: 4ch;
  }

  .shift-right {
    padding-left: 4ch;
  }

  .bio {
    color: var(--muted);
    font-size: clamp(0.8rem, 2vw, 1rem);
    max-width: 38ch;
    line-height: 1.7;
    margin: 0;
    text-align: right;
  }

  .links {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.25rem;
  }

  .links a {
    font-size: clamp(1.2rem, 3.5vh, 1.6rem);
    line-height: 1.5;
  }

  .signin {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.6rem;
  }

  .request-link {
    color: var(--muted);
    font-size: 0.8rem;
  }

  .request-link:hover {
    color: var(--text);
  }
</style>
