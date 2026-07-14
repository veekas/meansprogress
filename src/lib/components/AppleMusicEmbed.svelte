<script>
  /** @type {{ src: string, title?: string, height?: number }} */
  let { src, title = 'Apple Music', height = 450 } = $props();
</script>

<iframe
  allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
  frameborder="0"
  {height}
  title={title?.trim() || 'Apple Music'}
  class="music-player"
  sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
  {src}
></iframe>

<style>
  .music-player {
    width: 100%;
    max-width: 660px;
    overflow: hidden;
    border: 1px solid var(--border);
    border-radius: 2px;
    display: block;
    background: var(--surface);
  }
</style>
