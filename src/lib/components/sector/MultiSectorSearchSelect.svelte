<script lang="ts">
  import api from "$lib/api";
  import { createEventDispatcher, onMount } from "svelte";
  import type { PaginationResults, Sector } from "$lib/types";
  import HighlightedText from "../shared/HighlightedText.svelte";
  import { imageUrl } from "$lib/util/imageutil";
  import { state } from "$lib/store";
  import { Input } from "flowbite-svelte";


  export let initialSectorId: string | number | null = null;
  export let selected: any[] = [];
  export let showSelected = true;
  export let color = "light";
  export let size = "lg";

  export let sectors: PaginationResults<Sector> | null = $state.sectors;
  
  let dispatch = createEventDispatcher();
  let q = "";
  let showResults = false;
  let input: any;

  onMount(() => {
    loadSectors()
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
    dispatch("change", selected);
  };

  $: {
    if (q) loadSectors();
  }

  let onRemoveSector = (sector: any) => () => {
    selected = selected.filter((s) => s.id !== sector.id);
    dispatch("change", selected);
  };
</script>

<div class="relative">
  <Input 
    size={size}
    bind:this={input}
    on:click={() => (showResults = true)}
    type="text"
    bind:value={q}
    placeholder="Search for a sector"
 
  >
  <div slot="left">
    <i class="fas fa-search text-gray-400 mr-2" />
  </div>
</Input>
  {#if sectors && showResults}
    <section
      id="results"
      class="absolute w-full z-10 border border-gray-300 max-h-[300px] overflow-auto"
    >
      <ul class="bg-white" on:mouseleave={() => showResults = false}>
        {#each sorted as sector}
          <li
            class="flex flex-row p-4 hover:bg-primary-100 text-xs items-center cursor-pointer"
            on:click={onAddSector(sector)}
            on:keydown={onAddSector(sector)}
          >
            <img
              src={imageUrl(sector.image, { w: 50, h: 50 })}
              class="w-6 h-6 mr-2 border"
              alt={sector.name}
            />
            <HighlightedText bind:value={sector.name} {q} />
          </li>
        {/each}
      </ul>
    </section>
  {/if}
</div>

{#if showSelected}
  {#each selected as sector}
    <span class=" mt-2 mr-2 group border rounded-md inline-block bg-white">
      <span class="flex flex-row text-sm text-gray-600">
        <div class="flex items-center">
          <img
            src={imageUrl(sector.image, { w: 50, h: 50 })}
            class="w-8 h-8  rounded-lg m-1 border"
            alt={sector.name}
          />
        </div>
        <p class="flex items-center p-2">{sector.name}</p>
        <div
          class="justify-end ml-4 p-2 rounded-r-lg flex hover:bg-red-400 hover:text-white"
        >
          <button on:click={onRemoveSector(sector)} class="px-1">
            <i class="fa fa-close" />
          </button>
        </div>
      </span>
    </span>
  {/each}
{/if}
