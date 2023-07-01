<script lang="ts">
  import Gravitar from "$lib/components/shared/Gravitar.svelte";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import api from "$lib/api";
  import ProblemLayout from "$lib/components/problem/ProblemLayout.svelte";
  import type { PaginationResults, Problem } from "$lib/types";
  import { isMember } from "$lib/util/authUtil";
  import { Button } from "flowbite-svelte";
  import { onMount } from "svelte";

  let problem: Problem;
  let pages: PaginationResults<any>;

  onMount(loadPages);

  function loadPages() {
    api.problem
      .pages($page.params.id)
      .list("", 50, 1, ["user"])
      .then((res) => {
        pages = res.data;
      });
  }
</script>

<ProblemLayout bind:problem>
  {#if pages}
    <div class="md:m-4">
      <div class="flex mb-5">
        <h1 class="flex-1 items-end flex text-xl text-primary-600">Pages</h1>
        {#if isMember(problem)}
          <div>
            <Button
              class=" text-xs"
              size="xs"
              on:click={() =>
                goto("/problem/show/" + problem.id + "/page/create")}
              color="light"
            >
              <i class="fas fa-file mr-2" />
              Create Page</Button
            >
          </div>
        {/if}
      </div>

      {#if pages.total_entries > 0}
        <div class="bg-white rounded-xl p-4 border">
          <table class="w-full table border text-gray-400">
            <tr class="bg-gray-100 text-xs">
              <td class="text-left p-2 text-gray-400">Page</td>
              <td class="text-left p-2 text-gray-400">Owner</td>
              <!-- <td class="text-center p-2 text-gray-400">Version</td> -->
              <!-- <td class="text-center p-2 text-gray-400">Status</td> -->
            </tr>
            {#each pages.entries as page}
              <tr
                class="hover:bg-primary-50 border-b-[1px]"
                on:click={() => goto(`page/${page.id}`)}
              >
                <td class="flex p-4">
                  <i class="fas fa-file mr-4 text-xl text-primary-500" />
                  <div>
                    <p class="font-bold text-sm text-gray-600">{page.title}</p>
                    <p class="mt-1 text-xs">Updated: {page.updated_at}</p>
                  </div>
                </td>
                <td class="p-2">
                  <div class="flex">
                    <Gravitar user={page.user} size="xs" className="border" />
                    <span class="text-xs flex-1 ml-3 mt-1 text-gray-600"
                      >{page.user.name} {page.user.last_name}</span
                    >
                  </div>
                </td>
                <!-- <td class="p-2 text-center">
                  {page.version}
                </td>
                <td class="text-center">
                  <span class="bg-primary-100 p-2 text-xs rounded-xl border"
                    >{page.status}</span
                  >
                </td> -->
              </tr>
            {/each}
          </table>
        </div>
      {:else}
        <div class="bg-white border p-4 flex mb-2">No Pages</div>
      {/if}
    </div>
  {/if}
</ProblemLayout>
