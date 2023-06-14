<script lang="ts">
  import { page } from "$app/stores";
  import api from "$lib/api";
  import ProblemLayout from "$lib/components/problem/ProblemLayout.svelte";
  import Products from "$lib/components/problem/Products.svelte";
  import { selectedProblem } from "$lib/store";
  import type { Obstacle } from "$lib/types";
  import { onMount } from "svelte";
  import { each } from "svelte/internal";

  let problem: any = null;
  let obstacle: null | Obstacle = null;

  onMount(loadObstacle);

  function loadObstacle() {
    api.problem
      .obstacles($page.params.id)
      .get($page.params.obstacle_id)
      .then((res) => {
        obstacle = res.data;
      });
  }
</script>

<ProblemLayout bind:problem>
  {#if obstacle}
    <div class="m-8 space-y-6">
      <h1 class="text-2xl text-red-500 font-bold  p-4">
        {obstacle.description}
      </h1>

      <div class="border bg-white p-4 space-y-4">
        <h2 class="text-xl text-gray-500 font-bold">Questions To Resolve</h2>
        <ul>
          {#each obstacle.questions as question}
            <li class="px-4 py-1">
              <i class="fa-solid fa-circle-question  mr-2" />
              {question}
            </li>
          {/each}
        </ul>
      </div>
      <div class="border bg-white p-4 space-y-4">
        <h2 class="text-xl text-gray-500 font-bold">Suggestion</h2>
        <div class="mb-9">
          <p class="p-4">{obstacle.hint}</p>
        </div>
      </div>

      <div class="border bg-white p-4 space-y-4">
        <h2 class="text-xl text-gray-500 font-bold">Tags</h2>
        <div class="p-4">
          {#each obstacle.tags as tag}
            <span
              class="text-xs bg-primary-300 p-2 mr-1 mb-1 inline-block text-white"
            >
              #{tag}
            </span>
          {/each}
        </div>
      </div>
    </div>
  {/if}
</ProblemLayout>
