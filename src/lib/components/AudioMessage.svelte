<script>
  import { onMount } from "svelte";

  /** @type {{ size?: 'default' | 'header' }} */
  let { size = "default" } = $props();

  const playLabel = "Play a short voice hello from veekas";
  const stopLabel = "Stop voice hello";

  let audio = $state(null);
  let playing = $state(false);
  let introWaving = $state(false);

  onMount(() => {
    introWaving = true;
    const timer = setTimeout(() => {
      introWaving = false;
    }, 3000);
    return () => clearTimeout(timer);
  });

  function toggle() {
    if (!audio) return;
    if (playing) {
      audio.pause();
      audio.currentTime = 0;
    } else {
      audio.play();
    }
  }
</script>

<button
  type="button"
  class="audio-btn"
  class:playing
  class:header={size === "header"}
  onclick={toggle}
  title={playing ? stopLabel : playLabel}
  aria-label={playing ? stopLabel : playLabel}
>
  <span class="wave" class:intro-wave={introWaving} aria-hidden="true">👋🏽</span>
</button>

<audio
  bind:this={audio}
  src="/audio/hello.mp3"
  preload="metadata"
  onplay={() => (playing = true)}
  onpause={() => (playing = false)}
  onended={() => (playing = false)}
></audio>

<style>
  .audio-btn {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3.25rem;
    height: 3.25rem;
    padding: 0;
    border: 1px solid var(--border);
    border-radius: 9999px;
    background: var(--surface);
    color: var(--text);
    font-size: 1.5rem;
    line-height: 1;
    transition:
      border-color 0.15s ease,
      background 0.15s ease,
      transform 0.15s ease;
  }

  .audio-btn:hover {
    border-color: var(--gold);
    background: var(--bg);
    transform: scale(1.05);
  }

  .audio-btn.playing {
    border-color: var(--gold);
    background: var(--bg);
  }

  .wave {
    display: block;
    transform-origin: 70% 70%;
  }

  .wave.intro-wave,
  .audio-btn.playing .wave,
  .audio-btn:hover .wave {
    animation: wave 0.6s ease-in-out infinite;
  }

  .audio-btn.header {
    width: 1em;
    height: 1em;
    font-size: inherit;
    border: 2px solid var(--border);
    border-radius: 9999px;
    background: var(--surface);
    cursor: pointer;
    box-shadow: 0 2px 8px rgb(0 0 0 / 0.25);
    transition:
      border-color 0.15s ease,
      background 0.15s ease,
      transform 0.15s ease,
      box-shadow 0.15s ease;
  }

  .audio-btn.header .wave {
    font-size: 0.52em;
    line-height: 1;
  }

  .audio-btn.header:hover,
  .audio-btn.header.playing {
    border-color: var(--gold);
    background: var(--bg);
    transform: scale(1.1);
    box-shadow:
      0 2px 10px rgb(0 0 0 / 0.3),
      0 0 0 3px rgb(236 182 0 / 0.2);
  }

  .audio-btn.header:hover .wave,
  .audio-btn.header.playing .wave,
  .audio-btn.header .wave.intro-wave {
    transform-origin: 70% 70%;
  }

  @keyframes wave {
    0%,
    100% {
      transform: rotate(0deg);
    }
    25% {
      transform: rotate(18deg);
    }
    75% {
      transform: rotate(-8deg);
    }
  }
</style>
