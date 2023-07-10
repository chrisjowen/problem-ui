<script lang="ts">
  import Gravitar from "$lib/components/shared/Gravitar.svelte";
  import type { Problem } from "$lib/types";
  import { fromNow } from "$lib/util/datetimeUtil";
  import { imageUrl } from "$lib/util/imageutil";
  import { fade } from "svelte/transition";

  export let problem: Problem;

  let windowWidth = 0;
</script>

<svelte:window bind:innerWidth={windowWidth} />
<div
  class="group
   drop-shadow-sm hover:drop-shadow-lg text-left  w-full bg-white border rounded-lg shrink-0 flex flex-col"
  in:fade
>
  <div class="w-full">
    <div
      class="height_slide w-full h-[240px] md:h-[180px]  bg-cover rounded-t-lg bg-primary-500"
      style="background-image: url('{imageUrl(problem.img || problem.banner_image )}');"
    >
 
    </div>
  </div>
  <div class="flex p-1 relative">
    <div class="absolute top-[-10px] left-[10px]">
      <Gravitar
        user={problem.user}
        className="w-10 h-10 rounded-md border-white border-[3px]"
      />
    </div>
    <div class="ml-14 text-xs text-gray-400 hidden md:block">
      @{problem.user.username}
    </div>
  </div>
  <div class="flex-1 mx-4 mt-4">
    <h1 class="md:text-lg font-bold">
      {problem.title}
    </h1>
    <div class="text-xs text-gray-400 mb-4">
      {fromNow(problem.inserted_at)}
    </div>
  </div>
  <div class="pl-2">
    {#each problem.sectors.slice(0, 2) as sector}
      <span
        class="bg-gray-100 text-gray-500 text-xs p-1 px-2 my-2 mb-4 mr-2 inline-block mr-1"
      >
        {sector.name.slice(0, 15)}
        {sector.name.length > 15 ? "..." : ""}
      </span>
    {/each}
  </div>
</div>

<style>
  .height_slide {
    transition: height 0.15s ease-out;
  }
</style>
