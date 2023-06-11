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
    <div class="flex w-full">
      <section class="flex-1">
        <div class="m-8 space-y-4">
          <h1 class="text-3xl text-primary-500 font-bold">
            {obstacle.description}
          </h1>

          <div class="!mb-8">
            {#each obstacle.tags as tag}
              <span
                class="text-xs bg-primary-400 p-2 mr-1 mb-1 inline-block text-white"
              >
                #{tag}
              </span>
            {/each}
          </div>

          <h2 class="text-xl text-gray-500 font-bold">Questions</h2>
          <ul>
            {#each obstacle.questions as question}
              <li class="border bg-white p-4 mb-2">
                <i class="fa-solid fa-circle-question text-yellow-400 mr-2" />
                {question}
              </li>
            {/each}
          </ul>
        </div>
      </section>

      <section class="m-4 ">
        <div class="p-9 bg-yellow-50 prose ">
          <h2 class="!text-yellow-500">
            <i class="fa fa-lightbulb text-yellow-500 mr-2" /> Advise
          </h2>
          <p>{obstacle.hint}</p>
        </div>
      </section>
    </div>
  {/if}
</ProblemLayout>
