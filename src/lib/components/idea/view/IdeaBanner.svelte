<script lang="ts">
  import type { Problem } from "$lib/types";
  import { imageUrl } from "$lib/util/imageutil";

  export let problem: Problem;
</script>

<div class="relative text-primary-400 sm:flex md:rounded-t-lg z-10">
  <div
    class="!cover bg-gray-400"
    style="
      position: absolute;
      width:100%;
      top:0; 
      left:0
      right:0;
      bottom:0;
      {problem.banner_image || problem.img
      ? `background-image: url('${imageUrl(
          problem.banner_image || problem.img
        )}'); filter:  grayscale(100%);`
      : ''};
      background-size: cover !important;  
      background-position: center;
      
    "
  />

  <div class="flex items-center flex-row w-full md:m-9 z-20">
    {#if problem.img}
      <img
        src={imageUrl(problem.img)}
        alt={problem.title}
        class="p-4 w-[250px] h-[250px] block md:inline-block m-auto md:float-left drop-shadow-xl"
      />
    {:else}
      <div class="p-4 w-[250px] h-[250px]" />
    {/if}
  </div>
</div>
