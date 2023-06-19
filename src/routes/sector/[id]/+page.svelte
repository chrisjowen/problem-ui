<script lang="ts">
  import { onMount } from "svelte";
  import EditableTextArea from "$lib/components/shared/EditableTextArea.svelte";
  import { page } from "$app/stores";
  import { Button } from "flowbite-svelte";
  import { goto } from "$app/navigation";
  import { auth } from "$lib/store";
  import api from "$lib/api";
  import { imageUrl } from "$lib/util/imageutil";
  let sector: any = null;
  let loggedInUser: any = null;
  let sectorId = $page.params.id;

  onMount(() => {
    loggedInUser = $auth?.loggedInUser;
    loadSector();
  });

  async function loadSector() {
    let response = await api.sector.get(sectorId, []);
    loadProblems();
    sector = response.data;
  }
  async function loadProblems() {
    let response = await api.problem.list(`sector_id=${sectorId}`, 5, 1);
    sector.problems = response.data.entries;
  }

  let showProblem = (problem: any) => () => {
    goto(`/problem/show/${problem.id}`);
  };
</script>
<div class="max-w-[2000px] w-full m-auto">

{#if !sector}
  <div class="bg-gray-50 p-9">
    <h2 class="mb-3 text-2xl font-bold tracking-tight text-primary-600">
      Loading...
    </h2>
  </div>
{:else}
  <div class="flex flex-col h-full">
    <div class=" flex-1 overflow-auto ">
      <div class="xl:flex max-w-[2000px]">
        <section class="flex-1  md:m-4">
          <div class="bg-white md:border rounded-xl">
            <div class="relative p-8">
              <div
                class="z-50 relative sm:w-[350px] w-full rounded-md drop-shadow-xl m-auto"
              >
                <div
                  class="bg-white rounded-lg border border-[15px] border-white"
                >
                  <img
                    src="{imageUrl(sector.image)}"
                    alt={sector.name}
                    class="rounded-lg w-full"
                  />
                  <h1
                    class=" bg-white text-xl px-3 pt-3 rounded-b-lg text-center font-bold"
                  >
                    <i class="fa fa-industry mr-2" />
                    {sector.name}
                  </h1>
                </div>
              </div>

              <div
                class="absolute top-0 left-0 w-full h-full flex z-10 md:rounded-t-xl"
                style="
                background-image:url('{imageUrl(sector.image)}'); 
                background-size: cover;  
                background-repeat: no-repeat;
                filter: brightness(0.7) grayscale(100%);
            "
              />
            </div>

            <EditableTextArea bind:input={sector.description} />
          </div>
        </section>
        <section class="flex-1 md:my-3 md:m-0  mx-4">
          <div class="grid grid-cols-1 md:grid-cols-1 overflow-x-auto">
            <h1 class="text-xl m-2 text-gray-600 mb-4">Active Problems</h1>

            {#each sector.problems as problem, idx}
              <div class="inline-block flex w-full mb-2">
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <div
                  class=" bg-white border hover:drop-shadow-lg w-full flex flex-row rounded-lg"
                  on:click={showProblem(problem)}
                >
                  <div class="p-4">
                    <img
                      class="w-full lg:w-auto h-[25px] object-cover object-center border"
                      src="{imageUrl(problem.img, {w:50, h:50})}"
                      alt="content"
                    />
                  </div>
                  <div class="flex-1 mb-4 m-4 space-y-4">
                    <h5 class="text-md font-bold text-gray-800">
                      {problem.title}
                    </h5>
                  </div>
                </div>
              </div>
            {/each}
            <div class=" flex justify-end">
              <Button
                class="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600"
                on:click={() => goto(`/problem/create/${sector.id}`)}
              >
                <i class="fas fa-plus mr-2" /> Create Problem
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
{/if}
</div>
