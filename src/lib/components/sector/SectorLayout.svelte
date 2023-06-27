<script lang="ts">
  import type { Sector } from "$lib/types";
  import LeftMenuLayout from "../shared/LeftMenuLayout.svelte";
  export let solution: any = null;
  export let sector: Sector;
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { auth } from "$lib/store";
  import api from "$lib/api";
  import { Button } from "flowbite-svelte";
  import { goto } from "$app/navigation";

  let sectorId = $page.params.id;
  let menuItems: any[] = [];

  onMount(() => {
    loadSector();
  });

  async function loadSector() {
    let response = await api.sector.get(sectorId);
    sector = response.data;
  }

  $: {
    if (sector) {
      menuItems = [
        {
          title: "Sector Overview",
          icon: "fas fa-info-circle",
          href: `/sector/${sector.id}`,
        },
        {
          title: "News",
          icon: "fas fa-book",
          href: `/sector/${sector.id}/news`,
        },
        {
          title: "Insights ",
          icon: "fas fa-chalkboard-user text-color-red",
          href: `/sector/${sector.id}/#stay`,
          comingSoon: true,
        },
      ];
    }
  }
</script>

<LeftMenuLayout {menuItems} showTopMenu={true}>
  <div class="lg:flex justify-end p-2" slot="topmenu">
    <Button
      class=" text-xs w-full md:w-auto"
      size="xs"
      on:click={() => goto("/problem/create")}
    >
      <i class="fa-solid fa-atom mr-2" />
      Create New Problem</Button
    >
  </div>

  {#if !sector}
    <div class="bg-gray-50 p-9">
      <h2 class="mb-3 text-2xl font-bold tracking-tight text-primary-600">
        Loading...
      </h2>
    </div>
  {:else}
    <slot  />
  {/if}
</LeftMenuLayout>
