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
  import IdeaShell from "$lib/components/idea/manage/IdeaShell.svelte";
  import type { PageData } from "../$types";

  export let data: PageData;
  let problem: Problem = data.problem;

  let pageDoc: Page;
  let pages: PaginationResults<Page>;
  $: currentPageId = $page.params.pageId;

  let refreshPage = () => null;

 


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

</script>

<IdeaShell bind:problem>
  {#if pageDoc}
    <div class="xl:flex w-full">
      <section
        id="PageDisplay"
        class=" h-full border-b-[1px] flex-1 min-h-full mb-9 bg-white  relative r p-8"
      >
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

        <div
          class="flex text-lg text-primary-500 border p-4 my-4 flex items-center"
        >
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

    </div>
  {/if}
</IdeaShell>
