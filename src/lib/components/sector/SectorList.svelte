<script lang="ts">
  import type { Sector } from "$lib/types";
  import { imageUrl } from "$lib/util/imageutil";
  import { createEventDispatcher } from "svelte";
  let dispatch = createEventDispatcher();

  export let sectors: Sector[];
  export let selectable = false;

  let onSectorClick = (sector: Sector) => () => {
    if (selectable) {
      dispatch("click", sector);
    }
  };
</script>

{#if sectors}
  <ul class="bg-white">
    {#each sectors as sector}
      <li>
        <button
          on:click={onSectorClick(sector)}
          class="flex flex-row p-2 border mb-2 {selectable &&
            'hover:bg-primary-100'} "
        >
          <img
            src={imageUrl(sector.image, { w: 50, h: 50 })}
            class="w-6 h-6 mr-2"
            alt={sector.name}
          />
          {sector.name}
        </button>
      </li>
    {/each}
  </ul>
{/if}
