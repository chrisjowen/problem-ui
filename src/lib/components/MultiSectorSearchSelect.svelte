<script lang="ts">
  import api from "$lib/api";
  import { onMount, createEventDispatcher } from "svelte";
  import type { PaginationResults, Sector } from "$lib/types";
  import HighlightedText from "./shared/HighlightedText.svelte";
  import { imageUrl } from "$lib/util/imageutil";
  import { state } from "$lib/store";
  import { Button } from "flowbite-svelte";

  export let initialSectorId: string | number | null = null;
  export let selected: any[] = [];

  let sectors: PaginationResults<Sector>;
  let q = "";
  let showResults = false;
  let input: any;

  onMount(() => {
    sectors = $state.sectors;
  });

  $: sorted = sectors?.entries.sort((a: Sector, b: Sector) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  });

  async function loadSectors(select: string | number | null = null) {
    let query = `name[like]=${q.toLowerCase()}`;
    api.sector.list(query, 100, 1).then((res) => {
      sectors = res.data;
    });
  }

  let onAddSector = (s: Sector) => () => {
    showResults = false;
    selected = selected.concat(s);
  };

  $: {
    if (q) loadSectors();
  }


  let onRemoveSector = (sector: any) => () => {
    selected = selected.filter(s => s.id !== sector.id)
  }
</script>

<div class="relative">
  <input
    bind:this={input}
    on:focus={() => (showResults = true)}
    type="text"
    bind:value={q}
    placeholder="Search for a sector"
    class="w-full p-4 border border-gray-300 focus:outline-none active:outline-0 focus:ring-0"
  />
  {#if sectors && showResults}
    <section
      id="results"
      class="relative z-10 border mt-2 max-h-[300px] overflow-auto"
    >
      <ul class="bg-white">
        {#each sorted as sector}
          <li
            class="flex flex-row p-4 hover:bg-primary-100"
            on:click={onAddSector(sector)}
            on:keydown={onAddSector(sector)}
          >
            <img
              src={imageUrl(sector.image, { w: 50, h: 50 })}
              class="w-6 h-6 mr-2"
              alt={sector.name}
            />
            <HighlightedText bind:value={sector.name} {q} />
          </li>
        {/each}
      </ul>
    </section>
  {/if}
</div>

{#each selected as sector}
  <span class="p-2  mt-4 mr-4 rounded-xl border inline-block">
    <span class="flex flex-row">
      <img
        src={imageUrl(sector.image, { w: 50, h: 50 })}
        class="w-6 h-6 mr-2"
        alt={sector.name}
      />
      <p>Sector: {sector.name}</p>
      <div class="justify-end ml-4">
        <button on:click={onRemoveSector(sector)}  class="px-2 hover:text-red-500 ">
          <i class="fa fa-close " />
        </button>
      </div>
    </span>
  </span>
{/each}
