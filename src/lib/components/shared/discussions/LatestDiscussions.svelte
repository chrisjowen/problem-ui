<script lang="ts">
  import type { Discussion, PaginationResults } from "$lib/types";
  import { onMount } from "svelte";
  import Gravitar from "$lib/components/shared/Gravitars.svelte";
  import { goto } from "$app/navigation";
  import type RestApi from "$lib/api/common/restApi";
  import type { AxiosResponse } from "axios";


  let discussions: PaginationResults<Discussion>;
  export let api: RestApi;
  export let id: String;

    onMount(() => {
      api.list("", 2, 1, ["user"]).then((result : AxiosResponse<PaginationResults<Discussion>>) => {
        discussions = result.data;
      });
    })

</script>

{#if discussions}
{#if discussions.total_entries == 0}
  <div class="bg-white p-4 border rounded-md">No Discussions Started</div>
{/if}
{#each discussions.entries as discussion}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class="bg-white hover:drop-shadow-lg p-4 border" on:click={() => goto(`${id}/discussion/${discussion.id}`)}>
    <div class="flex">
      <div class="pr-2 mt-1">
        <Gravitar
          email={discussion.user.email}
          size="sm"
          className="rounded-md"
        />
      </div>
      <div class="flex-1 ml-1">
       
        <p class="text-xs text-gray-400">
          {discussion.user.name}
          {discussion.user.last_name} <span class="text-gray-500">  5 Mins ago</span>
        </p>
        
        <h2 class="text-md text-gray-800 bold">{discussion.title}</h2>

      </div>
    </div>
  </div>
{/each}


{/if}