<script>
  import Gravitar from "$lib/components/shared/Gravitar.svelte";
  export let users = [];
  export let placeholder = "No users"
</script>

<div class="flex space-x-2  bg-white border p-4 ">
  {#each users as user}
    <Gravitar email={user.email} size="md" className="rounded-md" />
  {/each}

  <div >
    <slot></slot>
  </div> 
  {#if users.length === 0}
    <p class="col-span-12 text-center">{placeholder}</p>
  {/if}
</div>
