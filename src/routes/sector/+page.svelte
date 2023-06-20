<script lang="ts">
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import api from "$lib/api";
  import { PUBLIC_IMG_CDN_BASE } from "$env/static/public";
  import { state } from "$lib/store";

  let sectors: any[] = [];

  $: sorted = sectors?.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    } else {
      return 1;
    }
  });

  onMount(async () => {
    if ($state?.sectors != null) {
      sectors = $state.sectors.entries;
    } else {
      api.sector.list("",100,1).then((r) => {
        sectors = r.data.entries;
        $state.sectors = r.data;
      });
    }
  });

  let showSector = (sector: any) => () => {
    goto(`/sector/${sector.id}`);
  };
</script>

<div class="max-w-[2000px] w-full m-auto">
  
  <!-- HERO -->
  <div
    class=" py-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 overflow-x-auto pl-6 pr-6 pb-6"
  >
  
    {#each sorted as sector, idx}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div
        class="bg-white border hover:drop-shadow-lg rounded-lg"
        on:click={showSector(sector)}
      >
        <img
          class="w-full h-[200px] object-cover object-center p-2"
          src="{PUBLIC_IMG_CDN_BASE}{sector.image}"
          alt="content"
        />

        <h5 class="mb-2 text-lg font-bold tracking-tight m-4 pb-4 text-center">
          <i class="fa fa-industry mr-2" />
          {sector.name}
        </h5>
      </div>
    {/each}
  </div>
  </div>
