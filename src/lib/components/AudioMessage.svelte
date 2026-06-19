<script>
  let audio = $state(null);
  let playing = $state(false);

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
  onclick={toggle}
  aria-label={playing ? 'Stop voice message' : 'Play voice message'}
>
  <span class="wave" aria-hidden="true">👋</span>
</button>

<audio
  bind:this={audio}
  src="/audio/hello.m4a"
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

  .audio-btn.playing .wave,
  .audio-btn:hover .wave {
    animation: wave 0.6s ease-in-out infinite;
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
