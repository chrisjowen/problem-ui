<script lang="ts">
  import { Breadcrumb, BreadcrumbItem, Card } from "flowbite-svelte";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import api from "$lib/api";
  import { PUBLIC_IMG_CDN_BASE, PUBLIC_PROBLEM_API_PATH } from "$env/static/public";
  import { state } from "$lib/store";

  let sectors: any[] = [];


  $: sorted = sectors.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    } else {
      return 1;
    }
  });

  onMount(async () => {
    if($state?.sectors!=null) {
      sectors = $state.sectors
    }
    let response = await api.sector.list()
    $state.sectors = response.data.entries
  });

  let showSector = (sector: any) => () => {
    goto(`/sector/${sector.id}`);
  };
</script>

<div class="bg-gray-50 flex flex-col h-full">
  
  <div class="bg-primary-500 p-4 flex flex-row space-x-2 hidden md:block">
    <Breadcrumb >
      <BreadcrumbItem href="/sector" linkClass="text-white text-xs">Sectors</BreadcrumbItem>
    </Breadcrumb>
  </div>
  <!-- HERO -->
  <div
    class="flex-1 overflow-auto py-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 overflow-x-auto pl-6 pr-6 pb-6"
  >
    {#each sorted as sector, idx}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div class="bg-white border hover:drop-shadow-lg rounded-lg" on:click={showSector(sector)}>
          <img
            class="w-full h-[200px] object-cover object-center p-2 "
            src="{PUBLIC_IMG_CDN_BASE}{sector.image}"
            alt="content" />

          <h5 class="mb-2 text-lg font-bold tracking-tight  m-4 pb-4 text-center">
            <i class="fa fa-industry mr-2"></i>
            {sector.name}
          </h5>
      </div>
    {/each}
  </div>
</div>


