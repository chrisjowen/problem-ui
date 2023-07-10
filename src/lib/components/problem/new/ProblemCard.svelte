<script lang="ts">
  import { goto } from "$app/navigation";
  import Gravitar from "$lib/components/shared/Gravitar.svelte";
  import type { Problem } from "$lib/types";
  import { fromNow } from "$lib/util/datetimeUtil";
  import { imageUrl } from "$lib/util/imageutil";
  import { Button } from "flowbite-svelte";
  import { fade, slide } from "svelte/transition";

  export let problem: Problem;
  export let readOnly: boolean = false;

  export let className = ""

  let windowWidth = 0;

  $: maxBlurb = windowWidth > 650 ? 400 : 100;

  function validate() {
    if (!readOnly) {
      goto(`/idea/${problem.id}/validate`);
    }
  }
</script>

<svelte:window bind:innerWidth={windowWidth} />
<button
  on:click={validate}
  class="group 
  {readOnly ? 'cursor-default' : 'hover:drop-shadow-lg'}
   drop-shadow-sm text-left w-[280px] md:w-[330px] {className} bg-white border rounded-lg shrink-0 flex flex-col"
  in:fade
>
  <div class="w-full">
    <div
      class="height_slide w-full bg-gray-400 h-[220px] md:h-[270px] {!readOnly && "group-hover:md:h-[220px]" } bg-cover rounded-t-lg"
      style="background-image: url('{imageUrl(problem.img || problem.banner_image )}');"
    >
      {#if !readOnly && false}
        <div class="flex justify-end p-4 invisible group-hover:visible">
          <button
            on:click|stopPropagation|preventDefault={() =>
              console.log("clicked child")}
            class="mr-1 bg-white rounded-md drop-shadow-lg border border-gray-600 text-gray-600 hover:text-white hover:bg-red-600 w-[40px] h-[40px]"
          >
            <i class="fas fa-thumbs-down" />
          </button>
          <button
            on:click|stopPropagation|preventDefault={() =>
              console.log("clicked child")}
            class=" bg-white drop-shadow-lg rounded-md border border-gray-600 text-gray-600 hover:text-white hover:bg-green-600 w-[40px] h-[40px]"
          >
            <i class="fas fa-thumbs-up" />
          </button>
        </div>
      {/if}
    </div>
  </div>
  <div class="flex p-1 relative">
    <div class="absolute top-[-10px] left-[10px]">
      <Gravitar
        user={problem.user}
        className="w-10 h-10 rounded-md border-white border-[3px]"
      />
    </div>
    <div class="ml-14 text-xs text-gray-400">
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
    <p class="prose text-sm">
      {problem.blurb.slice(0, maxBlurb)}
    </p>
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
  {#if !readOnly}
  <div
    class="height_slide w-full overflow-hidden h-0 group-hover:md:h-[50px] border-t-[1px]"
  >
    <div class="p-4 w-full grid grid-cols-3 text-center text-xs">
      <span class="text-green-500">
        <i class="fa fa-thumbs-up" /> 10
      </span>
      <span class="text-red-500">
        <i class="fa-solid fa-thumbs-down" /> 5
      </span>
      <span class="text-primary-500">
        <i class="fa fa-comment" /> 2
      </span>
    </div>
  </div>
  {/if}
</button>

<style>
  .height_slide {
    transition: height 0.15s ease-out;
  }
</style>
