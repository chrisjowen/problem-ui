<script lang="ts">
  import { slide } from "svelte/transition";
  import { onMount } from "svelte";
  import api from "$lib/api";
  import type { PaginationResults, Problem, Sector } from "$lib/types";
  import ProblemCard from "$lib/components/problem/new/ProblemCard.svelte";
  import { Input, Label } from "flowbite-svelte";
  import MultiSectorSearchSelect from "$lib/components/sector/MultiSectorSearchSelect.svelte";
  import type { SearchOptions } from "$lib/api/common/restApi";

  let activeProblems: PaginationResults<Problem>;

  let showFilters = false;
  let filters = {
    q: "",
    sectors: [],
  };
  onMount(() => {
    searchProblems();
  });

  $: problemsBySector = activeProblems?.entries.reduce(
    (acc: any, problem: Problem) => {
      problem.sectors.forEach((sector: Sector) => {
        if (acc[sector.name] == null) {
          acc[sector.name] = [];
        }
        acc[sector.name].push(problem);
      });
      return acc;
    },
    {}
  );

  $: latest = activeProblems && activeProblems.entries.slice(0, 5);

  async function searchProblems() {
    let q = `status=ACTIVE`;
    if (filters.q != "") {
      q += `|OR(title[like]=${filters.q}|blurb[like]=${filters.q})`;
    }

    let sectors = filters.sectors.map((s) => s.id).join(",");

    console.log(sectors);

    let query: SearchOptions = {
      query: q,
      qs: {
        sectors: sectors,
      },
      page: 1,
      pageSize: 100,
      preloads: ["user", "sectors"],
    };

    let response = await api.problem.search(query);
    activeProblems = response.data;
  }
</script>

<div class=" md:p-0 p-8 mt-8">
  <div class=" max-w-[1200px] mx-auto mb-2">
    <div class="headers mb-8">
      <h1 class="text-3xl text-gray-700 font-bold">Explore</h1>
      <h2 class="text-lg text-gray-500">
        Find a problem you want to be build, and maybe even get involved and help out solving it. 
      </h2>
    </div>

    <div class="flex">
      <div class="flex-1">
        <Input
          type="search"
          bind:value={filters.q}
          size="lg"
          on:keyup={searchProblems}
        >
          <i slot="left" class="fa-solid fa-search" />
        </Input>
      </div>

      <button
        on:click={() => (showFilters = !showFilters)}
        class="flex border-gray-300 bg-white border p-2 px-4 ml-2 rounded-lg items-center"
      >
        Filters
        <i class="fa-solid fa-filter ml-2" />
      </button>
    </div>
  </div>

  {#if showFilters}
    <div class="bg-white my-8 border" transition:slide>
      <div class="max-w-[1200px] mx-auto py-12">
        <div>
          <Label>Sectors</Label>
          <MultiSectorSearchSelect
            bind:selected={filters.sectors}
            on:change={searchProblems}
          />
        </div>
      </div>
    </div>
  {/if}

  <div
    class="max-w-[1200px] mx-auto 0 overflow-hidden w-full flex flex-col h-full"
  >
    {#if problemsBySector != null}
      <h2 class="text-xl font-bold my-2">Latest</h2>
      <div class="noscroll flex overflow-auto w-full flex-shrink-0 my-2">
        {#each latest as problem}
          <ProblemCard {problem} />
        {/each}
      </div>

      {#each Object.keys(problemsBySector) as sector}
        <h2 class="text-xl font-bold my-4">{sector}</h2>
        <div class="noscroll flex overflow-auto w-full flex-shrink-0 my-2">
          {#each problemsBySector[sector] as problem}
            <ProblemCard {problem} />
          {/each}
        </div>
      {/each}
    {/if}
  </div>
</div>

<style>
  :global(.noscroll) {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
  :global(.noscroll::-webkit-scrollbar) {
    display: none;
  }
</style>
