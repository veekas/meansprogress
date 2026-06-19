<script>
  import { fly } from 'svelte/transition';
  import AudioMessage from '$lib/components/AudioMessage.svelte';
  let { data } = $props();

  const links = [
    { href: 'https://i.airbuds.fm/veekas/FJLDpeRRL6', label: 'airbuds' },
    { href: 'https://allogrow.com', label: 'allo' },
    { href: 'https://calendly.com/veekas/meet', label: 'calendar' },
    { href: 'mailto:fit-imply-given@duck.com', label: 'email', external: false },
    { href: 'https://www.github.com/veekas', label: 'github' },
    { href: 'http://www.instagram.com/veekas', label: 'instagram' },
    { href: 'https://www.linkedin.com/in/veekas', label: 'linkedin' },
    { href: 'https://app.thestorygraph.com/profile/veekas', label: 'storygraph' },
    { href: 'https://strava.app.link/gpIRjM032Yb', label: 'strava' }
  ];
</script>

<svelte:head>
  <title>veekas ashoka</title>
</svelte:head>

<main>
  <div class="page-grid">
    <div class="align-column">
      <div class="name-block">
        <h1>
          <span class="shift-left" in:fly={{ y: -30, duration: 1200, delay: 100 }}>veekas</span>
          <span class="shift-right" in:fly={{ y: -75, delay: 1000, duration: 2000 }}>ashoka</span>
        </h1>

        {#if data.bio}
          <p class="bio">{data.bio}</p>
        {/if}
      </div>

      <div class="bottom-left">
        <div class="links links--mobile">
          {#each links as link}
            <a href={link.href} rel="me" target={link.external === false ? undefined : '_blank'}>{link.label}</a>
          {/each}
        </div>

        <div class="auth-stack">
          <div class="wave-slot">
            <AudioMessage />
          </div>
          <div class="signin">
            {#if data.session}
              <a href="/feed" class="btn">see what's up →</a>
            {:else}
              <a href="/login" class="btn">sign in</a>
              <a href="/request-access" class="request-link">request access</a>
            {/if}
          </div>
        </div>
      </div>
    </div>

    <div class="links links--desktop">
      {#each links as link}
        <a href={link.href} rel="me" target={link.external === false ? undefined : '_blank'}>{link.label}</a>
      {/each}
    </div>
  </div>
</main>

<style>
  main {
    min-height: 100vh;
    padding: 8vmin 10vmin 10vmin;
    text-align: right;
  }

  .page-grid {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
    min-height: calc(100vh - 8vmin - 10vmin);
    width: 100%;
    gap: 2rem;
  }

  .align-column {
    width: 100%;
  }

  .name-block {
    max-width: 100%;
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
    line-height: 1.7;
    margin: 0.75vmin 0 0;
    text-align: left;
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

  .links--mobile {
    display: none;
  }

  .bottom-left {
    z-index: 10;
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .auth-stack {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .signin {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex-wrap: wrap;
  }

  .signin .btn {
    border-color: var(--gold);
    color: var(--gold);
    border-radius: 9999px;
  }

  .signin .btn:hover {
    background: var(--gold);
    color: var(--bg);
  }

  .request-link {
    color: var(--muted);
    font-size: 0.8rem;
  }

  .request-link:hover {
    color: var(--text);
  }

  @media (min-width: 768px) {
    .page-grid {
      position: relative;
      gap: 0;
    }

    .align-column {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      width: fit-content;
      max-width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;
      pointer-events: none;
    }

    .align-column > * {
      pointer-events: auto;
    }

    .name-block {
      display: table;
      align-self: stretch;
    }

    .bio {
      display: table-caption;
      caption-side: bottom;
      text-align: right;
    }

    .bottom-left {
      align-self: flex-start;
    }

    .auth-stack {
      display: flex;
      flex-direction: row;
      align-items: center;
    }

    .links--desktop {
      margin-top: auto;
      position: relative;
      z-index: 1;
    }
  }

  @media (max-width: 767px) {
    main {
      padding-bottom: 42vmin;
    }

    .page-grid {
      min-height: auto;
      gap: 0;
    }

    .links--desktop {
      display: none;
    }

    .links--mobile {
      display: flex;
      flex: 1;
      min-width: 0;
    }

    .bottom-left {
      position: fixed;
      left: 10vmin;
      right: 10vmin;
      bottom: 10vmin;
      display: grid;
      grid-template-columns: 1fr auto;
      grid-template-rows: auto auto;
      align-items: start;
      gap: 1rem;
    }

    .links--mobile {
      grid-column: 1 / span 2;
      grid-row: 1;
    }

    .auth-stack {
      display: contents;
    }

    .wave-slot {
      grid-column: 1;
      grid-row: 2;
      justify-self: start;
    }

    .signin {
      grid-column: 2;
      grid-row: 2;
      justify-self: end;
    }
  }
</style>
