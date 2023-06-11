<script lang="ts">
  import { page } from "$app/stores";
  import type { Discussion, Obstacle, PaginationResults } from "$lib/types";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import type RestApi from "$lib/api/common/restApi";
  import type { AxiosResponse } from "axios";

  export let obstacles: PaginationResults<Obstacle>;
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
  <div class="bg-white p-4 border rounded-md">No obstacles Started</div>
{:else}
  {#each obstacles.entries as obstacle}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div
      class="bg-white hover:drop-shadow-lg p-4 border"
      on:click={() => goto(`${base}/obstacles/${obstacle.id}`)}
    >
      <div class="flex">
        <i class="fas fa-exclamation-triangle text-yellow-500 mr-3 text-lg" />
        {obstacle.description}
      </div>
    </div>
  {/each}
{/if}
