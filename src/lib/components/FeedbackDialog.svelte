<script>
  let { open = $bindable(false) } = $props();

  let dialogEl = $state(null);
  let type = $state('bug');
  let body = $state('');
  let loading = $state(false);
  let error = $state('');
  let sent = $state(false);

  function reset() {
    type = 'bug';
    body = '';
    loading = false;
    error = '';
    sent = false;
  }

  function close() {
    open = false;
    if (sent) {
      reset();
    } else {
      loading = false;
      error = '';
    }
  }

  $effect(() => {
    if (!dialogEl) return;
    if (open) {
      error = '';
      dialogEl.showModal();
    } else if (dialogEl.open) {
      dialogEl.close();
    }
  });

  async function handleSubmit(event) {
    event.preventDefault();
    if (loading) return;

    loading = true;
    error = '';

    const formData = new FormData();
    formData.set('type', type);
    formData.set('body', body);
    formData.set('page', window.location.pathname);

    try {
      const response = await fetch('/feedback', { method: 'POST', body: formData });
      const result = await response.json();

      if (!response.ok) {
        error = result.error || 'Something went wrong. Try again.';
        return;
      }

      sent = true;
      body = '';
    } catch {
      error = 'Something went wrong. Try again.';
    } finally {
      loading = false;
    }
  }
</script>

<dialog
  bind:this={dialogEl}
  class="feedback-dialog"
  onclose={close}
  onclick={(event) => {
    if (event.target === dialogEl) close();
  }}
>
  <div class="dialog-panel">
    <div class="dialog-header">
      <h2>feedback</h2>
      <button type="button" class="close-btn" aria-label="Close" onclick={close}>×</button>
    </div>

    {#if sent}
      <p class="success">thanks — your feedback was sent.</p>
      <button type="button" class="btn" onclick={close}>close</button>
    {:else}
      <p class="hint">bug reports, feature requests, or anything else on your mind.</p>

      <form onsubmit={handleSubmit}>
        <fieldset class="type-fieldset">
          <legend>type</legend>
          <label class="type-option">
            <input type="radio" name="type" value="bug" bind:group={type} />
            bug report
          </label>
          <label class="type-option">
            <input type="radio" name="type" value="feature" bind:group={type} />
            feature request
          </label>
          <label class="type-option">
            <input type="radio" name="type" value="other" bind:group={type} />
            something else
          </label>
        </fieldset>

        <label>
          message
          <textarea
            name="body"
            rows="5"
            placeholder="what's on your mind?"
            bind:value={body}
            maxlength="5000"
            required
          ></textarea>
        </label>

        {#if error}
          <p class="error">{error}</p>
        {/if}

        <div class="actions">
          <button type="button" class="btn btn-ghost" onclick={close}>cancel</button>
          <button type="submit" class="btn" disabled={loading || !body.trim()}>
            {loading ? 'sending…' : 'send feedback'}
          </button>
        </div>
      </form>
    {/if}
  </div>
</dialog>

<style>
  .feedback-dialog {
    border: 1px solid var(--border);
    border-radius: 2px;
    padding: 0;
    background: var(--bg);
    color: var(--text);
    max-width: min(440px, calc(100vw - 2rem));
    width: 100%;
  }

  .feedback-dialog::backdrop {
    background: rgba(0, 0, 0, 0.65);
  }

  .dialog-panel {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .dialog-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
  }

  h2 {
    margin: 0;
    color: var(--gold);
    font-size: 1rem;
    font-weight: 600;
    text-transform: lowercase;
    letter-spacing: 0.05em;
  }

  .close-btn {
    background: none;
    border: none;
    color: var(--muted);
    font-size: 1.4rem;
    line-height: 1;
    padding: 0;
  }

  .close-btn:hover {
    color: var(--text);
  }

  .hint {
    margin: 0;
    color: var(--muted);
    font-size: 0.85rem;
    line-height: 1.6;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .type-fieldset {
    border: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  legend {
    font-size: 0.8rem;
    color: var(--muted);
    text-transform: lowercase;
    letter-spacing: 0.05em;
    margin-bottom: 0.35rem;
  }

  .type-option {
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
    color: var(--text);
    font-size: 0.85rem;
    text-transform: lowercase;
    cursor: pointer;
  }

  .type-option input {
    width: auto;
    margin: 0;
  }

  .actions {
    display: flex;
    justify-content: flex-end;
    gap: 0.75rem;
  }

  .btn[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }
</style>
