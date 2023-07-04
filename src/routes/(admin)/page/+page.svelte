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
  import { fromNow } from "$lib/util/datetimeUtil";
  import LeftMenuLayout from "$lib/components/shared/LeftMenuLayout.svelte";

  let problem: Problem;
  let pages: PaginationResults<any>;

  onMount(loadPages);

  function loadPages() {
    api.page
      .list("", 50, 1, ["user"])
      .then((res) => {
        pages = res.data;
      });
  }


</script>

  {#if pages }
    <div class="m-4">
      <div class="flex mb-5">
        <h1 class="flex-1 items-end flex text-xl text-primary-600">Pages</h1>
          <div>
            <Button
              class=" text-xs"
              size="xs"
              on:click={() =>
                goto("/page/create")}
              color="light"
            >
              <i class="fas fa-file mr-2" />
              Create Page</Button
            >
          </div>
      </div>

      {#if pages.total_entries > 0}
        <div class="bg-white border">
          <table class="w-full table border text-gray-400">
            <tr class="bg-gray-100 text-xs">
              <td class="text-left p-2 text-gray-400">Title</td>
              <td class="text-left p-2 text-gray-400">Owner</td>
            </tr>
            {#each pages.entries as page}
              <tr
                class="hover:bg-primary-50 border-b-[1px]"
                on:click={() => goto(`/page/${page.id}/update`)}
              >
                <td class="flex p-2 px-4">
                  <i class="fas fa-file mr-4 text-xl text-primary-500" />
                  <div>
                    <p class="font-bold text-sm text-gray-600">{page.title}</p>
                    <p class="mt-1 text-xs">Updated: {fromNow(page.updated_at)}</p>
                  </div>
                </td>
                <td class="p-2">
                  <div class="flex">
                    <Gravitar user={page.user} size="xs" className="border rounded-md" />
                    <span class="text-xs flex-1 ml-3 mt-1 text-gray-600 hidden md:block"
                      >@{page.user.username}</span
                    >
                  </div>
                </td>
              </tr>
            {/each}
          </table>
        </div>
      {:else}
        <div class="bg-white border p-4 flex mb-2">No Pages</div>
      {/if}
    </div>
  {/if}
