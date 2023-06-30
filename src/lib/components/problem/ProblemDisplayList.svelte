<script lang="ts">
  import { imageUrl } from "$lib/util/imageutil";
  import { goto } from "$app/navigation";
  import type { Problem } from "$lib/types";
  import Gravitar from "../shared/Gravitar.svelte";

  export let problem: Problem;
  export let q: string = "";

  let showProblem = (problem: any) => () => {
    goto(`/problem/show/${problem.id}`);
  };

  function highlight(input: any) {
    if (q) {
      return input.replace(
        new RegExp(q, "gi"),
        (match: any) => `<span class="bg-yellow-200">${match}</span>`
      );
    }

    return input;
  }
</script>

{#if problem}
  <button
    class="text-left bg-white rounded-xl border hover:border-primary-400 w-full md:flex flex-row"
    on:click={showProblem(problem)}
  >
    <div class="p-4 relative">
      <img
        class="w-full md:h-[150px] md:w-[120px]  object-cover object-center border"
        src={imageUrl(problem.img)}
        alt="content"
      />
      <div
        class="absolute top-[25px] left-[25px] bg-white flex  group border rounded-full drop-shadow-lg flex-shrink-0"
      >
        <Gravitar user={problem.user} size="sm" className="drop-shadow-lg " />
      </div>
    </div>
    <div class="flex-1 m-4">
      <h5 class="text-lg md:text-lg font-bold text-gray-500">
        {@html highlight(problem.title)}
      </h5>
      <p class="text-xs mb-3 font-bold text-gray-400">
        @{problem.user?.username}
      </p>

      <p class="prose max-w-none text-sm md:text-md mb-4">
        {problem.blurb}
      </p>
      <div>
        {#each problem.sectors as sector}
          <p
            class="text-primary-500 p-1 px-2 mr-1 bg-gray-200 text-xs inline-block"
          >
            <i class="fas fa-tag mr-2" />
            {sector.name}
          </p>
        {/each}
      </div>
    </div>
  </button>
{/if}
