<script lang="ts">
  import { page } from "$app/stores";
  import api from "$lib/api";
  import ProblemLayout from "$lib/components/problem/ProblemLayout.svelte";
  import Products from "$lib/components/problem/Products.svelte";
  import ObstacleList from "$lib/components/shared/obstacles/ObstacleList.svelte";
  import { selectedProblem } from "$lib/store";
  import type { Obstacle } from "$lib/types";
  import { onMount } from "svelte";
  import { each } from "svelte/internal";

  let problem: any = null;
  let obstacles: PaginationResults<Obstacle>;

  onMount(loadObstacles);

  function loadObstacles() {
    api.problem
      .obstacles($page.params.id)
      .list()
      .then((res) => {
        obstacles = res.data;
      });
  }
</script>

<ProblemLayout bind:problem>
  {#if obstacles}
  <div class="m-4 space-y-1" >
    <ObstacleList api={api.problem.obstacles($page.params.id)} id={$page.params.id} pageSize={100} base="/problem/show/{problem.id}" />
  </div>
  {/if}
</ProblemLayout>
