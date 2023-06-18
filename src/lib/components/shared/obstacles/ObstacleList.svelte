<script lang="ts">
  import type { Obstacle, PaginationResults } from "$lib/types";
  import type RestApi from "$lib/api/common/restApi";
  import type { AxiosResponse } from "axios";

  import { onMount } from "svelte";
  import { goto } from "$app/navigation";

  export let length = 200;

  let obstacles: PaginationResults<Obstacle>;
  export let api: RestApi;
  export let id: String = "";
  export let base: String = `${id}`;
  export let pageSize = 5;

  onMount(() => {
    api
      .list("", pageSize, 1, [])
      .then((result: AxiosResponse<PaginationResults<Obstacle>>) => {
        obstacles = result.data;
      });
  });
</script>

{#if !obstacles || obstacles.total_entries == 0}
  <div class="bg-white p-4 border rounded-md">No Risks</div>
{:else}
  {#each obstacles.entries.slice(0, length) as obstacle}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div
      class="bg-white hover:drop-shadow-lg p-4 border rounded-xl mb-1"
      on:click={() => goto(`${base}/obstacles/${obstacle.id}`)}
    >
      <div class="flex">
        <div class="flex-1 text-sm">
          <i
            class="fas fa-exclamation-triangle text-primary-500 mr-3 "
          />

          {obstacle.description}
          <span class="text-xs p-2 mr-1 ml-1 mb-1 inline-block text-gray-400">
            <i class="fa-solid fa-exclamation-triangle mr-1" />

            {obstacle.state}
          </span>
        </div>

        <div class="flex justify-center items-center mr-2">  
          <i class="fas fa-chevron-right text-gray-500" />
        </div>
      </div>
    </div>
  {/each}
{/if}
