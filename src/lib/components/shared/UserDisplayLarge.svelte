<script lang="ts">
	import { classNames } from 'classnames';
  import Gravitar from "$lib/components/shared/Gravitars.svelte";
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

<div class="bg-white p-4 border-b-[1px] flex flex-shrink-0 ">
  <div class="flex flex-shrink-0 w-full">
    <div class="mr-4 mb-2">
      <Gravitar {user} size="md" className="rounded-sm" />
    </div>
    <div class="flex-1">
      <h2 class="text-sm mb-1 font-bold text-gray-600">
        {user.name}
        {user.last_name}
      </h2>
      <p class="text-xs mb-2 text-gray-500">
        Problem Solver | Design Thinker | Experience Creator | Author of the
      </p>
      <span class="text-xs inline-block text-gray-400 bg-gray-50 border p-1">
        {role}
      </span>
    </div>
    {#if deletable}
      <div class="flex items-center ">
        <button class="text-xs text-gray-800 hover:text-red-600 p-4" on:click={dispatchDelete}>
          <i class="fa fa-trash mr-2" /> Remove
        </button>
      </div>
    {/if}
  </div>
</div>
