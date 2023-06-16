<script lang="ts">
  import Gravitar from "$lib/components/shared/Gravitars.svelte";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import api from "$lib/api";
  import ProblemLayout from "$lib/components/problem/ProblemLayout.svelte";
  import type { Page, PaginationResults, Problem } from "$lib/types";
  import { Button } from "flowbite-svelte";
  import { onMount } from "svelte";
  import { isMember } from "$lib/util/authUtil";
  let problem: Problem;
  let pageDoc: Page;
  let pages: PaginationResults<Page>;

  onMount(() => {
    loadPages();
  });

  $: {
    if ($page.params.pageId) {
      loadPage();
    }
  }

  function loadPage() {
    api.problem
      .pages($page.params.id)
      .get($page.params.pageId, ["user"])
      .then((res) => {
        pageDoc = res.data;
      });
  }
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
  {#if pageDoc}
    <div class="xl:flex w-full">
      <div class="max-w-[940px] xl:min-w-[940px] h-full">
        <div
          class="border flex-1 min-h-full mb-9 bg-white m-4 relative rounded-md"
        >
          <div class="flex pt-5 pl-5">
            <div class="rounded flex-shrink-0">
              <div class="m-auto w-full mt-1">
                <Gravitar
                  user={pageDoc.user}
                  size="sm"
                  className="rounded-md"
                />
              </div>
            </div>
            <div class="px-4">
              <p class="font-bold text-gray-600 md:text-lg text-sm">
                {pageDoc.user.name}
                {pageDoc.user.last_name}
              </p>
              <p class="text-xs text-gray-500 font-bold mb-1">
                <span class="mr-1 mb-1 text-xs hidden md:inline-block"
                  >Problem Solver | Design Thinker | Experience Creator | Author
                  of the
                </span>
              </p>
              <!-- <p class="text-xs text-gray-400">Last Updated: Today at 1:42 pm</p> -->
              {#if isMember(problem)}
              <div class="absolute top-5 right-5">
                <Button
                  color="light"
                  size="xs"
                  on:click={() => goto(`${$page.params.pageId}/update`)}
                >
                  <i class="fas fa-edit" />
                </Button>
              </div>
              {/if}
            </div>
          </div>

          <div
            class="px-8 pb-8 prose prose-td:p-4 prose-zinc prose-h1:text-gray-600 prose-h2:text-gray-500 prose-h2:mt-0 prose-md max-w-none editor relative"
          >
              <h1 class="py-4 my-4 font-bold text-gray-700">
                {pageDoc.title}
              </h1>

            <div>
              {@html pageDoc.body}
            </div>
          </div>
        </div>
      </div>
      <div class="hidden items-end justify-end md:block flex-1">
        {#if pages}
          <div class=" bg-white m-4 border rounded-lg">
            <ul>
              {#each pages.entries as page}
                <li class="p-2 border-b-[1px] hover:bg-gray-50 p-4 flex">
                  <i
                    class="fas fa-file text-gray-400 flex text-xl items-center mr-4"
                  />
                  <a
                    href="/problem/show/189/page/{page.id}"
                    class="flex-1 flex text-xs items-center"
                    >{page.title.slice(0, 50)}</a
                  >
                </li>
              {/each}
            </ul>
          </div>
        {/if}
      </div>
    </div>
  {/if}
</ProblemLayout>
