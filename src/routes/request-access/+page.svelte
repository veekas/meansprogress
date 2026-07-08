<script>
  import { enhance } from "$app/forms";
  let { data, form } = $props();
  let loading = $state(false);
</script>

<svelte:head>
  <title>request access — veekasmeansprogress.com</title>
</svelte:head>

<main>
  <a href="/" class="back">← veekasmeansprogress.com</a>

  <div class="card">
    <h1>request access</h1>

    {#if form?.sent || form?.alreadySent}
      <div class="confirmation">
        <p class="success-msg">
          {#if form?.alreadySent}
            your request is already pending — veekas will review it soon.
          {:else}
            request sent. veekas will review it and add you if he knows you.
          {/if}
        </p>
        <a href="/" class="btn">← back to veekasmeansprogress.com</a>
      </div>
    {:else}
      <p class="hint">
        if veekas knows you, enter your info below to request access to his
        private feed. if he doesn't, then feel free to request to add him to
        your network on linkedin.
      </p>

      <div class="feed-preview">
        <p class="feed-preview-label">what's inside</p>
        <ul>
          <li>
            <strong>status updates</strong>: like when twitter was fun
          </li>
          <li>
            <strong>reading list</strong>: like when goodreads was fun
          </li>
          <li>
            <strong>recent photos</strong>: like when instagram was fun
          </li>
          <li>
            <strong>contact info</strong>: like when address books... existed
          </li>
        </ul>
      </div>

      <form
        method="POST"
        use:enhance={() => {
          loading = true;
          return async ({ update }) => {
            loading = false;
            await update({ reset: false });
          };
        }}
      >
        <label>
          phone number
          <input
            type="tel"
            name="phone"
            placeholder="4805551234"
            value={data.prefillPhone}
            autocomplete="tel"
            required
          />
        </label>
        <label>
          your name
          <input
            type="text"
            name="name"
            placeholder="Ozzy"
            autocomplete="name"
            required
          />
        </label>
        <label>
          note (optional)
          <input
            type="text"
            name="note"
            placeholder="how do you know veekas?"
          />
        </label>
        {#if form?.error}
          <p class="error">{form.error}</p>
          {#if form?.alreadyHasAccess}
            <a
              href="/login{data.prefillPhone
                ? `?phone=${encodeURIComponent(data.prefillPhone)}`
                : ''}"
              class="btn"
            >
              sign in →
            </a>
          {/if}
        {/if}
        {#if !form?.alreadyHasAccess}
          <button type="submit" class="btn" disabled={loading}>
            {loading ? "sending…" : "send request →"}
          </button>
        {/if}
      </form>
    {/if}
  </div>
</main>

<style>
  main {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  }

  .back {
    position: fixed;
    top: 1.5rem;
    left: 2rem;
    color: var(--muted);
    font-size: 0.85rem;
  }

  .card {
    width: 100%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  h1 {
    color: var(--gold);
    font-size: 1.8rem;
    font-weight: 600;
    margin: 0;
  }

  .hint {
    color: var(--muted);
    font-size: 0.85rem;
    margin: 0;
    line-height: 1.6;
  }

  .feed-preview {
    border: 1px solid var(--border);
    background: var(--surface);
    padding: 1rem 1.1rem;
    border-radius: 2px;
  }

  .feed-preview-label {
    margin: 0 0 0.65rem;
    font-size: 0.7rem;
    color: var(--gold);
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  .feed-preview ul {
    margin: 0;
    padding: 0 0 0 1.1rem;
    display: flex;
    flex-direction: column;
    gap: 0.55rem;
  }

  .feed-preview li {
    color: var(--muted);
    font-size: 0.82rem;
    line-height: 1.55;
  }

  .feed-preview strong {
    color: var(--text);
    font-weight: 600;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 0.9rem;
  }

  .btn {
    width: 100%;
    padding: 0.75rem;
    text-align: center;
    display: block;
  }

  .btn[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .confirmation {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .success-msg {
    color: var(--muted);
    font-size: 0.9rem;
    line-height: 1.7;
    margin: 0;
  }
</style>
