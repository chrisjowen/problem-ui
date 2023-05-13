<script lang="ts">
  import type { Stakeholder } from "$lib/types/stakeholder.ts";
  export let stakeholder: null | Stakeholder = null;
</script>

<h1 class="mb-5 text-xl text-primary-900">Where</h1>
<div class=" mb-4">
  {#if stakeholder.regions}
    {#each stakeholder.regions as region}
      <span class="text-xs bg-primary-900 text-white p-2 mr-1 mb-1"> {region} </span>
    {/each}
  {:else}
    <span class="text-xs bg-primary-200 p-2 mr-1 mb-1"> GLOBAL </span>
  {/if}
</div>

<h1 class="text-xl mb-2 mt-5 text-primary-900">When</h1>
<div>
  <p>
    {stakeholder.when}
  </p>
</div>
