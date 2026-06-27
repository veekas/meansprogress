<script>
  import { enhance } from '$app/forms';
  import Nav from '$lib/components/Nav.svelte';

  let { data, form } = $props();

  const profile = $derived(form?.profile ?? data.profile);
</script>

<svelte:head>
  <title>settings — veekasmeansprogress.com</title>
</svelte:head>

<Nav showSettings={true} />

<main>
  <a href="/feed" class="back-link">← back to feed</a>
  <h1>settings</h1>
  <p class="hint">update your contact info so veekas can reach you.</p>

  <form method="POST" use:enhance class="settings-form">
    <label>
      phone number
      <input type="tel" name="phone" value={profile.phone} readonly />
    </label>
    <label>
      email
      <input type="email" name="email" value={profile.email} />
    </label>
    <label>
      mailing address
      <textarea name="address" rows="3">{profile.address}</textarea>
    </label>

    {#if form?.error}
      <p class="error">{form.error}</p>
    {/if}
    {#if form?.saved}
      <p class="success">saved ✓</p>
    {/if}

    <button type="submit" class="btn">save</button>
  </form>
</main>

<style>
  main {
    max-width: 520px;
    margin: 0 auto;
    padding: 3rem 2rem 6rem;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  h1 {
    color: var(--gold);
    font-size: 1.6rem;
    font-weight: 600;
    margin: 0;
  }

  .back-link {
    font-size: 0.8rem;
    color: var(--muted);
  }

  .hint {
    color: var(--muted);
    font-size: 0.85rem;
    margin: 0;
    line-height: 1.6;
  }

  .settings-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 0.5rem;
  }

  .btn {
    align-self: flex-start;
    margin-top: 0.25rem;
  }
</style>
