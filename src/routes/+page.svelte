<script>
  import { fly } from 'svelte/transition';
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
  let authFooterEl;
  let authFooterHeight = $state(0);

  $effect(() => {
    if (!ashokaEl) return;
    const observer = new ResizeObserver(([entry]) => {
      taglineWidth = entry.borderBoxSize?.[0]?.inlineSize ?? entry.contentRect.width;
    });
    observer.observe(ashokaEl, { box: 'border-box' });
    return () => observer.disconnect();
  });

  $effect(() => {
    if (!authFooterEl) return;
    const observer = new ResizeObserver(([entry]) => {
      authFooterHeight = entry.borderBoxSize?.[0]?.blockSize ?? entry.contentRect.height;
    });
    observer.observe(authFooterEl, { box: 'border-box' });
    return () => observer.disconnect();
  });
</script>

<svelte:head>
  <title>veekas ashoka</title>
  <meta name="description" content={metaDescription} />
  <meta property="og:description" content={metaDescription} />
  {@html `<script type="application/ld+json">${jsonLd}</script>`}
</svelte:head>

<main style:--auth-footer-height="{authFooterHeight}px">
  <div class="page-grid">
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
        <p class="tagline" style:--tagline-width={taglineWidth ? `${taglineWidth}px` : 'auto'}>
          {tagline}
        </p>

        <p class="work-link">
          <a href="/work">more about my work →</a>
        </p>
      </div>
    </div>

    <div class="links links--mobile">
      {#each links as link}
        <a
          href={link.href}
          rel={link.href.startsWith('http') ? 'me noopener' : undefined}
          target={link.external === false ? undefined : '_blank'}
        >{link.label}</a>
      {/each}
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

  <footer class="auth-footer" bind:this={authFooterEl}>
    <AudioMessage />
    <div class="signin">
      {#if data.session}
        <a href="/feed" class="btn">see what's up →</a>
      {:else}
        <a href="/login" class="btn">see more</a>
        <a href="/request-access" class="request-link">request access</a>
      {/if}
    </div>
  </footer>
</main>

<style>
  main {
    min-height: 100vh;
    padding: 8vmin 10vmin 10vmin;
    padding-bottom: calc(10vmin + var(--auth-footer-height, 0px) + 2rem);
    text-align: right;
    overflow-y: auto;
  }

  .page-grid {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 2rem;
    width: 100%;
    overflow-wrap: anywhere;
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

  .auth-footer {
    position: fixed;
    bottom: 10vmin;
    left: 10vmin;
    right: 10vmin;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 10;
    pointer-events: none;
  }

  .auth-footer > * {
    pointer-events: auto;
  }

  .signin {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex-wrap: wrap;
    justify-content: flex-end;
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
      display: grid;
      grid-template-rows: auto 1fr auto;
      align-items: end;
      justify-items: end;
      min-height: calc(100vh - 8vmin - 10vmin - var(--auth-footer-height, 0px) - 2rem);
      row-gap: clamp(1.5rem, 4vh, 3rem);
    }

    .name-block {
      grid-row: 1;
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

    .tagline {
      width: var(--tagline-width, auto);
    }

    .links--desktop {
      grid-row: 3;
      flex-shrink: 0;
    }

    .links--mobile {
      display: none;
    }
  }

  @media (max-width: 767px) {
    .page-grid {
      min-height: auto;
    }

    .links--desktop {
      display: none;
    }

    .links--mobile {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }
  }
</style>
