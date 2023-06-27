<script lang="ts">
  import EntityOverview from "../shared/EntityOverview.svelte";
  import TagList from "../shared/TagList.svelte";
  import Editor from "../shared/editor/Editor.svelte";
  import type { Page, Problem } from "$lib/types";
  import { onMount } from "svelte";
  import api from "$lib/api";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { isMember } from "$lib/util/authUtil";
  import { Button } from "flowbite-svelte";

  let refreshEditor = () => null;
  let pageDoc: Page;
  let problem: Problem;
  export let pageId: String = "";
  export let problemId: String = "";

  $: {
    if (pageId) {
      loadPage();
    }
  }

  onMount(() => {
    if (!problem) {
      loadProblem();
    }
  });

  function loadPage() {
    if (problem) {
      api.problem
        .pages(problem.id)
        .get(pageId, ["user"])
        .then((res: { data: Page }) => {
          pageDoc = res.data;
        });
    }
  }

  function loadProblem() {
    api.problem.get(problemId).then((res: { data: Problem }) => {
      problem = res.data;
      loadPage();
    });
  }
</script>

{#if pageDoc && problem}
  <section
    id="PageDisplay"
    class="max-w-[1000px] xl:min-w-[1000px] h-full border flex-1 min-h-full mb-9 bg-white m-4 relative rounded-md p-8"
  >
    <Editor
      bind:html={pageDoc.body}
      editable={false}
    />
    <TagList tags={pageDoc.tags} editable={false} />
  </section>
{/if}
