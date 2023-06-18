<script lang="ts">
  import { auth } from "$lib/store";
  import { page } from "$app/stores";
  import api from "$lib/api";
  import ProblemLayout from "$lib/components/problem/ProblemLayout.svelte";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import Gravitar from "$lib/components/shared/Gravitar.svelte";

  let problem: any = null;
  let loggedInUser = $auth.loggedInUser;
  let solutions: any[] = [];

  onMount(() => {
    loadProblem();
    loadSolutions();
  });

  function loadProblem() {
    api.problem.get($page.params.id, ["sector"]).then((res) => {
      problem = res.data;
    });
  }

  function loadSolutions() {
    api.solution
      .list("problem_id=" + $page.params.id, 50, 1, ["user"])
      .then((res) => {
        solutions = res.data.entries;
      });
  }
</script>

<ProblemLayout bind:problem>
  <div class="p-4">
    <h1 class="text-2xl mb-2 text-primary-500">Current Solutions</h1>
    
    {#each solutions as solution}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div
        class="p-4 bg-white border mb-4 rounded-lg hover:drop-shadow-xl"
        on:click={() => goto(`/solution/${solution.id}`)}
      >
        <div class="w-full">
          <div class="flex">
            <div class="flex-shrink-0">
              <Gravitar
                email={solution?.user.email}
                size="md"
                className="rounded-md  md:block"
              />
            </div>
            <div class="mb-4 md:mb-0">
              <div class="px-4">
                <p class="font-bold text-gray-600 text-lg">
                  {solution.user.name}
                  {solution.user.last_name}
                  <span
                    class="text-xs ml-2 bg-white text-primary-500 rounded inline-block hidden"
                  >
                    <i class="fa fa-plus" />
                    Follow
                  </span>
                </p>
                <p class="text-xs text-gray-500 font-bold mb-1">
                  <span class="mr-1 mb-1"
                    >Problem Solver | Design Thinker | Experience Creator |
                    Author of the
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-4">
          {@html solution.description.slice(0, 150)}
        </div>
      </div>
    {/each}
  </div>
</ProblemLayout>
