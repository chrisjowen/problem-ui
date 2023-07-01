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
  import TagList from "$lib/components/shared/TagList.svelte";
  import EntityOverview from "$lib/components/shared/EntityOverview.svelte";
  let problem: Problem;
  let pageDoc: Page;
  let pages: PaginationResults<Page>;
  $: currentPageId = $page.params.pageId;

  let refreshPage = () => null;

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
        setTimeout(refreshPage, 1);
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

      <section id="PageDisplay" class="max-w-[1000px] xl:min-w-[1000px] h-full border flex-1 min-h-full mb-9 bg-white m-4 relative rounded-md p-8">
          
          <div class="flex">
            <EntityOverview entity={pageDoc} />
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

          <div class="flex text-lg text-primary-500 border p-4 my-4 flex items-center ">
            <i class="fas fa-file mr-4" />
            {pageDoc.title}
          </div>
          <Editor
            bind:refresh={refreshPage}
            bind:html={pageDoc.body}
            editable={false}
          />
          <TagList tags={pageDoc.tags} editable={false} />
      </section>

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

                    {(page.title || "").slice(0, 50)}</a
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
