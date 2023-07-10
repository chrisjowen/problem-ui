<script lang="ts">
  import { imageUrl } from "$lib/util/imageutil";
  import type { Problem } from "$lib/types";

  export let problem: Problem;
</script>

<div class="flex">
  <div class="mr-8 shrink-0 hidden md:block">
    <img
      src={imageUrl(problem.img || problem.banner_image)}
      alt={problem.title}
      class="w-[100px] h-[100px] border"
    />
  </div>
  <div class="">
    <h1 class="mb-4 p-0 text-lg md:text-xl font-bold">{problem.title}</h1>
    <div class="prose max-w-none">
        {@html problem.blurb}
    </div>

    <div class="mt-4">
      {#each problem.sectors.slice(0, 2) as sector}
        <span
          class="bg-gray-50 w-full md:w-auto border text-gray-500 text-xs p-1 px-2   mr-2 inline-block mr-1"
        >
          {sector.name.slice(0, 40)}
          {sector.name.length > 40 ? "..." : ""}
        </span>
      {/each}
    </div>
  </div>
</div>
