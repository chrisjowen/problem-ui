<script>
  import Gravitar from "$lib/components/shared/Gravitar.svelte";
  export let users = [];
  export let placeholder = "No users"
</script>

<div class="flex   bg-white border p-4 w-full  flex-wrap">

  {#each users as user}
    <Gravitar email={user.email} size="md" className="rounded-md mr-2 mb-2" />
  {/each}
  <div >
    <slot></slot>
  </div> 
  {#if users.length === 0}
    <p class="col-span-12 text-center">{placeholder}</p>
  {/if}
</div>
