<script>
  import { enhance } from '$app/forms';

  let { form } = $props();

  let step = $state('phone');
  let sentToPhone = $state('');
  let loading = $state(false);

  function handleSendOtp({ formData }) {
    loading = true;
    return async ({ result, update }) => {
      loading = false;
      await update({ reset: false });
      if (result.type === 'success' && result.data?.sent) {
        sentToPhone = result.data.phone;
        step = 'otp';
      }
    };
  }

  function handleVerifyOtp() {
    loading = true;
    return async ({ result, update }) => {
      loading = false;
      await update();
    };
  }
</script>

<svelte:head>
  <title>sign in — veekasmeansprogress.com</title>
</svelte:head>

<main>
  <a href="/" class="back">← veekasmeansprogress.com</a>

  <div class="card">
    <h1>sign in</h1>

    {#if step === 'phone'}
      <p class="hint">enter your number to receive a one-time code</p>
      <form method="POST" action="?/sendOtp" use:enhance={handleSendOtp}>
        <label>
          phone number
          <input
            type="tel"
            name="phone"
            placeholder="+15551234567"
            autocomplete="tel"
            required
          />
        </label>
        {#if form?.error}
          <p class="error">{form.error}</p>
          {#if form?.notWhitelisted}
            <a
              href="/request-access?phone={encodeURIComponent(form.rejectedPhone || '')}"
              class="request-link"
            >request access →</a>
          {/if}
        {/if}
        <button type="submit" class="btn" disabled={loading}>
          {loading ? 'sending…' : 'send code →'}
        </button>
      </form>
    {:else}
      <p class="hint">enter the 6-digit code sent to {sentToPhone}</p>
      <form method="POST" action="?/verifyOtp" use:enhance={handleVerifyOtp}>
        <input type="hidden" name="phone" value={sentToPhone} />
        <label>
          verification code
          <input
            type="text"
            name="token"
            placeholder="123456"
            autocomplete="one-time-code"
            inputmode="numeric"
            maxlength="6"
            required
          />
        </label>
        {#if form?.error}
          <p class="error">{form.error}</p>
        {/if}
        <button type="submit" class="btn" disabled={loading}>
          {loading ? 'verifying…' : 'sign in →'}
        </button>
        <button
          type="button"
          class="btn btn-ghost"
          onclick={() => { step = 'phone'; }}
        >
          ← use a different number
        </button>
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
    max-width: 360px;
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

  form {
    display: flex;
    flex-direction: column;
    gap: 0.9rem;
  }

  .btn {
    width: 100%;
    padding: 0.75rem;
    text-align: center;
  }

  .btn[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .request-link {
    display: block;
    color: var(--muted);
    font-size: 0.8rem;
    text-align: center;
    margin-top: 0.25rem;
  }

  .request-link:hover {
    color: var(--text);
  }
</style>
