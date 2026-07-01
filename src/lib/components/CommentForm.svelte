<script>
  import { enhance } from '$app/forms';
  import { preserveDraftOnFailure } from '$lib/adminForm';

  let { postId } = $props();

  let body = $state('');
  let error = $state(null);
  let loading = $state(false);

  const enhanceComment = preserveDraftOnFailure({
    onSuccess: () => {
      error = null;
      body = '';
    },
    onFailure: (payload) => (error = payload?.commentError || 'Could not post comment.')
  });
</script>

<form
  method="POST"
  action="?/addComment"
  class="comment-form"
  use:enhance={() => {
    loading = true;
    const callback = enhanceComment();
    return async (resultEvent) => {
      loading = false;
      if (callback) await callback(resultEvent);
    };
  }}
>
  <input type="hidden" name="post_id" value={postId} />
  <textarea
    name="body"
    rows="2"
    placeholder="add a comment…"
    bind:value={body}
    maxlength="2000"
    required
  ></textarea>

  {#if error}
    <p class="error">{error}</p>
  {/if}

  <button type="submit" class="btn" disabled={loading || !body.trim()}>
    {loading ? 'posting…' : 'comment'}
  </button>
</form>

<style>
  .comment-form {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-top: 1rem;
  }

  textarea {
    font-family: inherit;
    resize: vertical;
  }

  .btn {
    align-self: flex-start;
  }

  .error {
    color: #c0392b;
    font-size: 0.8rem;
    margin: 0;
  }
</style>
