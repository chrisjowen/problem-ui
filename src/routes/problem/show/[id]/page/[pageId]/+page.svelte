<script lang="ts">
  import Gravitar from "$lib/components/shared/Gravitar.svelte";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import api from "$lib/api";
  import ProblemLayout from "$lib/components/problem/ProblemLayout.svelte";
  import type { Page, PaginationResults, Problem } from "$lib/types";
  import { Button } from "flowbite-svelte";
  import { onMount } from "svelte";
  import { isMember } from "$lib/util/authUtil";
  import Editor from "$lib/components/shared/editor/Editor.svelte";
  let problem: Problem;
  let pageDoc: Page;
  let pages: PaginationResults<Page>;
  $: currentPageId = $page.params.pageId;

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
      <div class="max-w-[1000px] xl:min-w-[1000px] h-full">
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
              <p class="text-xs text-gray-500 font-bold mb-2">
                <span class="mr-1 mb-1 text-xs hidden md:inline-block"
                  >Problem Solver | Design Thinker | Experience Creator | Author
                  of the
                </span>
              </p>
              <p class="flex text-sm text-gray-500">
                <i class="fas fa-file flex  items-center mr-2" />
                {pageDoc.title}
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
            <div>
              <Editor bind:html={pageDoc.body} editable={false} />
            </div>
          </div>
        </div>
      </div>
      <div class="hidden items-end justify-end md:block flex-1 relative w-full">
        {#if pages}
          <div class=" bg-white m-4 border rounded-lg">
            <ul>
              {#each pages.entries as page}
                <li
                  class="border-b-[1px] pr-9 hover:bg-gray-50 hover:text-primary-500 flex {currentPageId ==
                  page.id
                    ? 'text-primary-500'
                    : 'text-gray-400'}"
                >
                  <a
                    href="/problem/show/189/page/{page.id}"
                    class="flex-1 flex text-xs items-center p-3"
                  >
                    <i class="fas fa-file flex text-xl items-center mr-4" />

                    {page.title.slice(0, 50)}</a
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
