<script lang="ts">
  import { page } from "$app/stores";
  import api from "$lib/api";
  import ProblemLayout from "$lib/components/problem/ProblemLayout.svelte";
  import Products from "$lib/components/problem/Products.svelte";
  import ObstacleList from "$lib/components/shared/obstacles/ObstacleList.svelte";
  import { selectedProblem } from "$lib/store";
  import type { Obstacle } from "$lib/types";
  import { each } from "svelte/internal";

  let problem: any = null;

</script>

<ProblemLayout bind:problem>
  <div class="m-4 space-y-1" >
    <ObstacleList api={api.problem.obstacles($page.params.id)} id={$page.params.id} pageSize={100} base="/problem/show/{problem.id}" />
  </div>
</ProblemLayout>
