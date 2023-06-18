<script lang="ts">
  import Gravitar from "$lib/components/shared/Gravitar.svelte";
  import { Button } from "flowbite-svelte";
  import { createEventDispatcher } from "svelte";
  export let deletable = false;
  export let user: any;
  export let maxBio = 10000;
  export let role: string = "Problem Owner";

  let dispatch = createEventDispatcher();

  function dispatchDelete() {
    dispatch("delete", user);
  }
</script>

<div class="flex bg-white p-2 border-b-[1px]">
  <div class="mr-4  flex items-center">
    <Gravitar {user} size="sm" className="rounded-lg" />
  </div>
  <h2 class="text-xs mr-4 flex items-center ">
    {user.name}
    {user.last_name}
  </h2>
  <div class="mr-4 flex-1 flex items-center">
    <span class="text-xs inline-block text-gray-400 bg-gray-50 border p-1">
      {role}
    </span>
  </div>
  {#if deletable}
    <Button size="xs" color="light" on:click={dispatchDelete}>
      <i class="fa fa-trash mr-2" /> Remove
    </Button>
  {/if}
</div>
