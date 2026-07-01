<script>
  import CommentList from '$lib/components/CommentList.svelte';
  import CommentForm from '$lib/components/CommentForm.svelte';

  let { postId, comments = [], currentUserId, isAdmin = false } = $props();
</script>

<div class="comments-section">
  <CommentList {comments} {currentUserId} {isAdmin} />
  <CommentForm {postId} />
</div>

<style>
  .comments-section {
    margin-top: 1rem;
    padding-top: 0.5rem;
  }
</style>
