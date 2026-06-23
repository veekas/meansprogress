<script>
  import { fly } from 'svelte/transition';
  import { onMount } from 'svelte';
  import AudioMessage from '$lib/components/AudioMessage.svelte';
  import {
    links,
    metaDescription,
    personJsonLd,
    tagline
  } from '$lib/profile.js';

  let { data } = $props();

  const jsonLd = JSON.stringify(personJsonLd());

  let ashokaEl;
  let taglineWidth = $state(null);

  onMount(() => {
    const observer = new ResizeObserver(([entry]) => {
      taglineWidth = entry.target.getBoundingClientRect().width;
    });
    observer.observe(ashokaEl, { box: 'border-box' });
    return () => observer.disconnect();
  });
</script>

<svelte:head>
  <title>veekas ashoka</title>
  <meta name="description" content={metaDescription} />
  <meta property="og:description" content={metaDescription} />
  {@html `<script type="application/ld+json">${jsonLd}</script>`}
</svelte:head>

<main>
  <div class="page-grid">
    <div class="align-column">
      <div class="name-block">
        <h1>
          <span class="shift-left" in:fly={{ y: -30, duration: 1200, delay: 100 }}>veekas</span>
          <span
            class="shift-right"
            bind:this={ashokaEl}
            in:fly={{ y: -75, delay: 1000, duration: 2000 }}>ashoka</span
          >
        </h1>

        <div class="profile-details">
          <p class="tagline" style:width={taglineWidth ? `${taglineWidth}px` : undefined}>
            {tagline}
          </p>

          <p class="work-link">
            <a href="/work">more about my work →</a>
          </p>
        </div>
      </div>

      <div class="bottom-left">
        <div class="links links--mobile">
          {#each links as link}
            <a
              href={link.href}
              rel={link.href.startsWith('http') ? 'me noopener' : undefined}
              target={link.external === false ? undefined : '_blank'}
            >{link.label}</a>
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
        <a
          href={link.href}
          rel={link.href.startsWith('http') ? 'me noopener' : undefined}
          target={link.external === false ? undefined : '_blank'}>{link.label}</a
        >
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

  .tagline {
    font-size: clamp(0.7rem, 1.8vw, 0.85rem);
    letter-spacing: 0.04em;
    margin: 1vmin 0 0;
    opacity: 0.85;
  }

  .work-link {
    margin: 0.75rem 0 0;
    font-size: 0.8rem;
  }

  .work-link a {
    color: var(--gold);
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

    .profile-details {
      display: table-caption;
      caption-side: bottom;
      text-align: right;
    }

    .tagline,
    .work-link {
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
