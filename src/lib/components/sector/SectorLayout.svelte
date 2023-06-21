<script lang="ts">
  import type { Sector } from "$lib/types";
  import LeftMenuLayout from "../shared/LeftMenuLayout.svelte";
  export let solution: any = null;
  export let sector: Sector;
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { auth } from "$lib/store";
  import api from "$lib/api";

  let sectorId = $page.params.id;
  let menuItems: any[] = [];

  onMount(() => {
    loadSector();
  });

  async function loadSector() {
    let response = await api.sector.get(sectorId, [
      "problems",
      "problems.user",
    ]);
    // loadProblems();
    sector = response.data;
  }

  $: {
    if (sector) {
      menuItems = [
        {
          title: "Sector Overview",
          icon: "fas fa-lightbulb",
          href: `/sector/${sector.id}`,
        },
        {
          title: "Problems",
          icon: "fas fa-lightbulb",
          href: `/sector/${sector.id}/problems`,
        },
      ];
    }
  }
</script>

<LeftMenuLayout {menuItems}>
  <div class="max-w-[2000px] w-full m-auto">
    {#if !sector}
      <p>
        News
        <i class="fas fa-news" />
      </p>
      <div class="bg-gray-50 p-9">
        <h2 class="mb-3 text-2xl font-bold tracking-tight text-primary-600">
          Loading...
        </h2>
      </div>
    {:else}
      <slot />
    {/if}
  </div>
</LeftMenuLayout>
