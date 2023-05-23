<script lang="ts">
  import { Breadcrumb, BreadcrumbItem, Card } from "flowbite-svelte";
  import axios from "axios";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import problemApi from "$lib/api/problemApi";

  let sectors: any[] = [];


  $: sorted = sectors.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    } else {
      return 1;
    }
  });

  onMount(() => {
    problemApi.sectors()
      .then((res) => {
        sectors = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  });

  let showSector = (sector: any) => () => {
    goto(`/sector/${sector.id}`);
  };
</script>

<div class="bg-gray-50 ">
  <div class=" p-6">
    <Breadcrumb >
      <BreadcrumbItem href="/sector" >Sectors</BreadcrumbItem>
    </Breadcrumb>
  </div>
  <!-- HERO -->
  <div
    class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 overflow-x-auto pl-6 pr-6 pb-6"
  >
    {#each sorted as sector, idx}
      <div class="bg-white border hover:border-primary-600" on:click={showSector(sector)}>
          <img
            class="w-full h-[200px] object-cover object-center p-2 "
            src="/api/image{sector.image}"
            alt="content" />


          <h5 class="mb-2 text-xl font-bold tracking-tight  m-4 pb-4 ">
            {sector.name}
          </h5>
      </div>
    {/each}
  </div>
</div>


