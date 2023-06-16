<script lang="ts">
  import { goto } from "$app/navigation";
	import api from "$lib/api";
  import EditablePage from "$lib/components/page/EditablePage.svelte";
  import ProblemLayout from "$lib/components/problem/ProblemLayout.svelte";
  import type { Problem } from "$lib/types";
  
  let problem: Problem;
  let page = {
    title: "New Page",
    body: "Lorum ipsum....",
    tags: [],
  };

  function onSavePage(): void {
    api.problem.pages(problem.id).create(page).then((res) => {
      goto(`/problem/show/${problem.id}/page/${res.data.id}`)
    });
  }
</script>

<ProblemLayout bind:problem>
  <div class="h-full flex">
    <EditablePage bind:page={page} on:save={onSavePage} />
  </div>
</ProblemLayout>
