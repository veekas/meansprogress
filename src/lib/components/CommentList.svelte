<script>
  import { enhance } from '$app/forms';
  import { preserveDraftOnFailure } from '$lib/adminForm';

  let { comments = [], currentUserId, isAdmin = false } = $props();

  let deleteError = $state(null);

  const enhanceDelete = preserveDraftOnFailure({
    onSuccess: () => (deleteError = null),
    onFailure: (payload) => (deleteError = payload?.commentDeleteError || 'Could not delete comment.')
  });

  function formatDate(iso) {
    return new Date(iso).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
</script>

{#if deleteError}
  <p class="error">{deleteError}</p>
{/if}

{#if comments.length > 0}
  <ul class="comments">
    {#each comments as comment}
      <li>
        <div class="comment-meta">
          <span class="comment-phone">{comment.user_phone || 'someone'}</span>
          <time datetime={comment.created_at}>{formatDate(comment.created_at)}</time>
        </div>
        <p class="comment-body">{comment.body}</p>
        {#if comment.user_id === currentUserId || isAdmin}
          <form method="POST" action="?/deleteComment" use:enhance={enhanceDelete}>
            <input type="hidden" name="id" value={comment.id} />
            <button type="submit" class="btn-ghost delete-btn">delete</button>
          </form>
        {/if}
      </li>
    {/each}
  </ul>
{/if}

<style>
  .comments {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .comments li {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    padding: 0.75rem 0 0;
    border-top: 1px solid var(--border);
  }

  .comment-meta {
    display: flex;
    align-items: baseline;
    gap: 0.5rem;
    font-size: 0.75rem;
    color: var(--muted);
  }

  .comment-body {
    margin: 0;
    font-size: 0.9rem;
    line-height: 1.6;
    white-space: pre-wrap;
  }

  .delete-btn {
    align-self: flex-start;
    background: none;
    border: none;
    padding: 0;
    font-size: 0.75rem;
    color: var(--muted);
    cursor: pointer;
  }

  .delete-btn:hover {
    color: var(--text);
  }

  .error {
    color: #c0392b;
    font-size: 0.8rem;
    margin: 0;
  }
</style>
