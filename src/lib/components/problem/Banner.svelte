<script lang="ts">
  import type { Problem } from "$lib/types";
  import { imageUrl } from "$lib/util/imageutil";

    export let problem: Problem;
</script>

<div class="relative text-gray-400 sm:flex md:rounded-t-lg">
    <div
      class=" md:rounded-t-lg"
      style="
      position: absolute;
      width:100%;
      top:0; 
      left:0
      right:0;
      bottom:0;
      background: black url('{imageUrl(
        problem.banner_image || problem.img
      )}');
      background-size: cover;  
      background-position: center;
      background-repeat: no-repeat;
      filter: brightness(0.7) grayscale(100%);
    "
    />
    <div class="flex items-center flex-row w-full md:m-9">
      <img
        src={imageUrl(problem.img)}
        alt={problem.title}
        class="w-[250px] h-[250px] block md:inline-block m-auto md:float-left drop-shadow-xl"
      />
    </div>
  </div>