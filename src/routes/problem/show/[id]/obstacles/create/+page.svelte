<script lang="ts">
  import api from "$lib/api";
  import ProblemLayout from "$lib/components/problem/ProblemLayout.svelte";
  import EditableObstacle from "$lib/components/risk/EditableObstacle.svelte";
  import type { Problem } from "$lib/types";
  let problem: Problem;
  function onSave(e: CustomEvent<any>): void {
    api.obstacle.create({problem_id: problem.id, ...e.detail}).then((res) => {
      console.log(res.data);
    });
  }
</script>

<ProblemLayout bind:problem>
  <div class="h-full flex">
    <EditableObstacle on:save={onSave} />
  </div>
</ProblemLayout>
