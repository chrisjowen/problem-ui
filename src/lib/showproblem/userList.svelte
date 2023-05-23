<script>
  import Gravitar from "$lib/components/shared/gravitar.svelte";
  export let users = [];
  export let placeholder = "No users"
</script>

<div class="flex space-x-2  bg-white border p-4 ">
  {#each users as user}
    <Gravitar email={user.email} size="md" />
  {/each}

  {#if users.length === 0}
    <p class="col-span-12 text-center">{placeholder}</p>
  {/if}
</div>
