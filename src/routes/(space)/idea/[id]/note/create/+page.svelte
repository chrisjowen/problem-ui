<script lang="ts">
  import { goto } from "$app/navigation";
  import api from "$lib/api";
  import EditablePage from "$lib/components/page/EditablePage.svelte";
  import IdeaShell from "$lib/components/idea/manage/IdeaShell.svelte";
  import type { Problem } from "$lib/types";
  import type { PageData } from "../$types";

  export let data: PageData;
  let problem: Problem = data.problem;

  let page = {
    title: "New Note",
    body: "Lorum ipsum....",
    tags: [],
  };

  function onSavePage(): void {
    api.problem
      .pages(problem.id)
      .create(page)
      .then((res) => {
        goto(`/idea/${problem.id}/note/${res.data.id}`);
      });
  }
</script>

<IdeaShell bind:problem>
  {#if page}
    <EditablePage bind:page on:save={onSavePage} />
  {/if}
</IdeaShell>
