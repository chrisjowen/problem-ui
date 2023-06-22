<script lang="ts">
  import { goto } from "$app/navigation";
  import api from "$lib/api";
  import EditablePage from "$lib/components/page/EditablePage.svelte";
  import ProblemLayout from "$lib/components/problem/ProblemLayout.svelte";
  import type { Problem } from "$lib/types";

  let problem: Problem;
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
        goto(`/problem/show/${problem.id}/page/${res.data.id}`);
      });
  }
</script>

<ProblemLayout bind:problem>
  {#if page}
    <EditablePage bind:page on:save={onSavePage} />
  {/if}
</ProblemLayout>
