<script>
  import Nav from '$lib/components/Nav.svelte';
  import ProfileBanner from '$lib/components/ProfileBanner.svelte';

  let { data, children } = $props();
</script>

<Nav showAdmin={data.isAdmin} showSettings={!data.isAdmin} />

{#if data.profileIncomplete}
  <ProfileBanner />
{/if}

{@render children()}
