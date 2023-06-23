<script lang="ts">
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import api from "$lib/api";
  import { PUBLIC_IMG_CDN_BASE } from "$env/static/public";
  import { state } from "$lib/store";
  import { Button, Input } from "flowbite-svelte";
  import { imageUrl } from "$lib/util/imageutil";

  let sectors: any[] = [];
  let q = "";
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
      api.sector.list("", 20, 1).then((r) => {
        sectors = r.data.entries;
        $state.sectors = r.data;
      });
    }
  });

  let search = () => {
    api.sector.list(`name[like]=${q.toLowerCase()}`, 20, 1).then((r) => {
      sectors = r.data.entries;
    });
  };

  let timer;
  const debounce = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      search();
    }, 500);
  };
</script>

<div class="bg-gray-200 border-b-[1px] p-3 flex z-30">
  <div class="flex-1 mr-4">
    <Input type="text" placeholder="Search" bind:value={q} on:keyup={debounce}>
      <i class="fas fa-search" slot="left" />
    </Input>
  </div>
  <div class="flex items-center">
    <Button
      class="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600"
      on:click={() => goto("/problem/create")}
    >
      <i class="fas fa-plus" />
      <span class="hidden md:block ml-2">Create Problem</span>
    </Button>
  </div>
</div>
<section
  class="px-9 py-3 mb-3 text-xs flex flex-row drop-shadow-sm border-b-[1px]"
/>

<div class="max-w-[2000px] w-full m-auto">
  <div
    class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 xl:grid-cols-6 2xl:grid-cols-6 w-full gap-4 p-4"
  >
    {#each sorted as sector}
      <a
        class=" bg-white relative flex-shrink-0 border-primary-200 border hover:border-primary-400"
        href={`/sector/${sector.id}`}
      >
        <img
          class="w-full rounded-lg h-[200px]"
          src="{imageUrl(sector.image)}"
          alt="content"
        />
        <h5
          class="p-2 m-2 font-bold text-xs bg-primary-700 text-white absolute top-0 right-0"
        >
          {sector.name}
        </h5>
      </a>

      
    {/each}
  </div>
</div>
