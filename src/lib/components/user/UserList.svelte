<script>
  import Gravitar from "$lib/components/shared/Gravitar.svelte";
  export let users = [];
  export let size = "md"
  export let placeholder = "No users"
  export let classNames = "rounded-md mr-2 mb-2 "
</script>

<div class="flex w-full  flex-wrap ">

  {#each users as user}
    <Gravitar email={user.email} size={size} className={classNames} />
  {/each}

  {#if users.length === 0}
    <p class="col-span-12 text-center">{placeholder}</p>
  {/if}
</div>
