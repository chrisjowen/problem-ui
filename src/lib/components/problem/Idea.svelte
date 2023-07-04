<script lang="ts">
  import { goto } from "$app/navigation";
    import type { Problem } from "$lib/types";
  import { isMember } from "$lib/util/authUtil";
    import { imageUrl } from "$lib/util/imageutil";
  import { Button } from "flowbite-svelte";
  
      export let problem: Problem;
  </script>
  
<div class="p-4">
    <div class="p-4 text-gray-700">
      <div class="flex">
        <div class="mr-4">
          <i class="fa-solid fa-rocket text-4xl" />
        </div>
        <div class="flex-1 flex items-center">
          <h1 class="text-2xl font-bold">{problem.title}</h1>
        </div>
      </div>
      <p class="p-4">
        {problem.blurb}
      </p>
      {#each problem.sectors as sector}
        <span class="p-2 mt-4 mr-4 border inline-block bg-white">
          <span class="flex flex-row">
            <img
              src={imageUrl(sector.image, { w: 50, h: 50 })}
              class="w-6 h-6 mr-2 border"
              alt={sector.name}
            />
            <p>{sector.name}</p>
          </span>
        </span>
      {/each}
    </div>
    {#if isMember(problem)}
      <div class="flex justify-end">
        <Button
          color="light"
          size="xs"
          on:click={() => goto(`${problem.id}/update`)}
        >
          <i class="fa-solid fa-edit mr-2" />
          Edit</Button
        >
      </div>
    {/if}
  </div>