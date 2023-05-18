<script>
  import Gravitar from "$lib/components/shared/gravitar.svelte";
  export let users = [];
</script>

<div class="grid grid-cols-12 bg-white border p-4 gap-2">
  {#each users as user}
    <Gravitar email={user.email} size="md" />
  {/each}

  {#if users.length === 0}
    <p class="col-span-12 text-center">No users </p>
  {/if}
</div>
