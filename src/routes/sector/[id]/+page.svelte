<script lang="ts">
  import type { PaginationResults } from "$lib/types";
  import EditableTextArea from "$lib/components/shared/EditableTextArea.svelte";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import api from "$lib/api";
  import { imageUrl } from "$lib/util/imageutil";
  import SectorLayout from "$lib/components/sector/SectorLayout.svelte";
  let sector: any = null;
  let loggedInUser: any = null;
  let sectorId = $page.params.id;

  let sectorProblems: PaginationResults<any>;

  $: {
    if (sector) {
      loadProducts();
    }
  }

  let showProblem = (problem: any) => () => {
    goto(`/problem/show/${problem.id}`);
  };

  function loadProducts() {
    api.sector
      .problem(sector.id)
      .list("", 5, 1, ["problem", "problem.user"])
      .then((res) => {
        sectorProblems = res.data;
      });
  }
</script>

<SectorLayout bind:sector>
  {#if sector}
    <div class="flex flex-col h-full">
      <div class="flex flex-1">
        <section class=" 2xl:max-w-[1000px] md:m-4">
          <div class="bg-white md:border rounded-lg">
            <div class="relative p-4">
              <div
                class="z-50 relative sm:w-[350px] w-full rounded-md drop-shadow-xl m-auto"
              >
                <img
                  class="w-full rounded-lg h-[200px] object-cover object-center"
                  src={imageUrl(sector.image)}
                  alt="content"
                />
              </div>

              <div
                class="absolute top-0 left-0 w-full h-full flex z-10 md:rounded-t-lg"
                style="
                background-image:url('{imageUrl(sector.image)}'); 
                background-size: cover;  
                background-repeat: no-repeat;
                filter: brightness(0.7) grayscale(100%);
            "
              />
            </div>

              <div class="px-9">
                <EditableTextArea bind:input={sector.description} />
              </div>
          </div>
        </section>
        <section class="md:my-3 md:m-0 mx-4 flex-1 hidden 2xl:block">
          <div class="grid grid-cols-1 md:grid-cols-1 overflow-x-auto">
            <h1 class="text-xl m-2 text-gray-600 mb-4">Latest Problems</h1>

            {#if !sectorProblems || sectorProblems?.entries.length == 0}
              <div class="bg-white p-4 border mb-4">No problems found</div>
            {:else}
              {#each sectorProblems.entries as sectorProblem, idx}
                <div class="inline-block flex w-full mb-2">
                  <!-- svelte-ignore a11y-click-events-have-key-events -->
                  <div
                    class=" bg-white border hover:drop-shadow-lg w-full flex flex-row rounded-lg"
                    on:click={showProblem(sectorProblem.problem)}
                  >
                    <div class="p-4">
                      <img
                        class="w-full lg:w-auto h-[25px] object-cover object-center border"
                        src={imageUrl(sectorProblem.problem.img, {
                          w: 50,
                          h: 50,
                        })}
                        alt="content"
                      />
                    </div>
                    <div class="flex-1 m-4">
                      <h5 class="text-sm text-gray-800">
                        {sectorProblem.problem.title}
                      </h5>
                      <p class="text-gray-600 text-xs font-bold">
                        @{sectorProblem.problem.user.username}
                      </p>
                    </div>
                  </div>
                </div>
              {/each}
            {/if}
          </div>
        </section>
      </div>
    </div>
  {/if}
</SectorLayout>
