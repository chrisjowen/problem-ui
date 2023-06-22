<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import api from "$lib/api";
  import EditableProblem from "$lib/components/problem/EditableProblem.svelte";
  import ProblemLayout from "$lib/components/problem/ProblemLayout.svelte";
  import type { Problem } from "$lib/types";
  
  let reload: any;
  let problem: Problem;
  let problemId = $page.params.id;



  function onSave(): void {
    api.problem
      .update(problemId, problem)
      .then((res) => {
        reload(true);
        goto(`/problem/show/${$page.params.id}`)
      });
  }
</script>

<ProblemLayout bind:problem bind:reload={reload}>
  {#if problem}
    <EditableProblem bind:problem={problem} on:save={onSave}  />
  {/if}
</ProblemLayout>
