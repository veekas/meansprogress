<script>
  import { fly } from "svelte/transition";
  import AudioMessage from "$lib/components/AudioMessage.svelte";
  import {
    links,
    metaDescription,
    personJsonLd,
    tagline,
  } from "$lib/profile.js";

  let { data } = $props();

  const jsonLd = JSON.stringify(personJsonLd());

  let ashokaEl;
  let taglineWidth = $state(null);

  $effect(() => {
    if (!ashokaEl) return;
    const observer = new ResizeObserver(([entry]) => {
      taglineWidth =
        entry.borderBoxSize?.[0]?.inlineSize ?? entry.contentRect.width;
    });
    observer.observe(ashokaEl, { box: "border-box" });
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
    <div class="content-column">
      <div class="name-block">
        <h1>
          <span
            class="shift-left"
            in:fly={{ y: -30, duration: 1200, delay: 100 }}>veekas</span
          >
          <span
            class="shift-right"
            bind:this={ashokaEl}
            in:fly={{ y: -75, delay: 1000, duration: 2000 }}>ashoka</span
          >
        </h1>

        <div class="profile-details">
          <p
            class="tagline"
            style:--tagline-width={taglineWidth ? `${taglineWidth}px` : "auto"}
          >
            {tagline}
          </p>

          <p class="more-about-container">
            <span class="more-about-prefix">more about his</span>
            <a href="/work" class="work-link btn">work</a>
            <a href="/login" class="auth-links btn">life</a>
          </p>
        </div>
      </div>

      <div class="content-container">
        <div class="wave-slot">
          {#if data.session}
            <a href="/feed" class="login-link">check in</a>
          {:else}
            <a href="/login" class="login-link">login</a>
          {/if}
          <AudioMessage />
        </div>
        <div class="links">
          {#each links as link}
            <a
              href={link.href}
              rel={link.href.startsWith("http") ? "me noopener" : undefined}
              target={link.external === false ? undefined : "_blank"}
              >{link.label}</a
            >
          {/each}
        </div>
      </div>
    </div>
  </div>
</main>

<style>
  main {
    position: relative;
    min-height: 100vh;
    padding: 8vmin 10vmin 10vmin;
    text-align: right;
    overflow-y: auto;
  }

  .login-link {
    /* align-self: flex-end; */
    opacity: 0.85;
    font-size: clamp(0.7rem, 1.8vw, 0.85rem);
  }

  .more-about-prefix {
    opacity: 0.85;
  }

  .content-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 100%;
  }

  .page-grid {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    min-height: calc(100vh - 8vmin - 10vmin);
    width: 100%;
    overflow-wrap: anywhere;
  }

  .content-column {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 2rem;
    width: fit-content;
    max-width: 100%;
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

  .more-about-container {
    font-size: clamp(0.7rem, 1.8vw, 0.85rem);
  }
  .more-about-container a {
    color: var(--gold);
  }

  .more-about-container a:hover {
    color: var(--white);
  }

  .work-link {
    margin: 0.75rem 0 0;
    font-size: clamp(0.7rem, 1.8vw, 0.85rem);
    display: inline-block;
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

  .links > a {
    font-size: clamp(1.2rem, 3.5vh, 1.6rem);
    line-height: 1.5;
  }

  .auth-links {
    /* display: flex;
    align-items: center;
    gap: 0.75rem;
    flex-wrap: wrap;
    justify-content: flex-end;
    margin-top: 0.75rem; */
    font-size: clamp(0.7rem, 1.8vw, 0.85rem);
  }

  .btn {
    border: 1px solid var(--gold);
    color: var(--gold);
    border-radius: 9999px;
    font-size: 0.8rem;
    line-height: 1.5;
    padding: 0.1rem 0.9rem;
  }

  .auth-links .btn:hover {
    background: var(--gold);
    color: var(--bg);
  }

  .request-link {
    color: var(--muted);
    font-size: 0.8rem;
    line-height: 1.5;
  }

  .request-link:hover {
    color: var(--text);
  }

  .wave-slot {
    align-self: flex-end;
    justify-self: flex-start;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    align-items: center;
  }

  @media (min-width: 768px) {
    .page-grid {
      display: grid;
      grid-template-rows: 1fr;
      align-items: stretch;
      justify-items: end;
    }

    .content-column {
      min-height: 100%;
      gap: clamp(1.5rem, 4vh, 3rem);
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

    .tagline {
      width: var(--tagline-width, auto);
    }
  }
</style>
