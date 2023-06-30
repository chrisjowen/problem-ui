<script lang="ts">
  import { imageUrl } from "$lib/util/imageutil";
  import { Button } from "flowbite-svelte";
  import SectorList from "../sector/SectorList.svelte";
  import TagList from "../shared/TagList.svelte";
  import type { Idea } from "$lib/types";
  import { createEventDispatcher } from "svelte";
  import VoteButton from "../vote/VoteButton.svelte";
  import { fade } from "svelte/transition";

  let dispatch = createEventDispatcher();
  export let idea: Idea;
  export let filters: any = {};


  let emitEvent = (type: string)  =>  (e :any) => {
    dispatch(type, e.detail)
  }
</script>

{#if idea}
  <div class="bg-white overflow-auto" >
    <div class="justify-start items-top space-y-4 flex-1">
      <div class="md:flex">
        <div>
          <img
            src={imageUrl(idea.img)}
            alt={idea.title}
            class="w-full mb-4 md:max-w-[200px] rounded border"
          />
        </div>

        <div class="flex-1 p-4 mb-8 space-y-4">
          <h1 class="text-3xl mt-0">
            <i class="fa-solid fa-lightbulb text-yellow-300 mr-4" />{idea.title}
          </h1>

          <div class="flex space-x-2 text-xs">
            <p class="border-r-[1px] pr-2">
              <i class="fa-solid fa-clock mr-1" />
              <strong>Estimates:</strong>
              {idea.estimated_timescale} months
            </p>
            <p>
              <i class="fa-solid fa-fire mr-1" />
              <strong>Difficulty:</strong>
              {idea.complexity}%
            </p>
          </div>

          <p>
            {@html idea.description}
          </p>
        </div>
      </div>
    </div>

    <slot></slot>
 

    <div class="px-4">
      <h2 class="text-lg mb-2 mt-2 mt-4 text-primary-800">Sectors</h2>
      <SectorList
        bind:sectors={idea.sectors}
        selectable={true}
        on:click={emitEvent("sector-clicked")}
      />
    </div>

    <div class="px-4">
      <h2 class="text-lg mb-2 mt-4 text-primary-800">Features</h2>
      <ul class="mb-2">
        {#each idea.features as feature}
          <li class="border mb-2 p-2">
            <i class="fa-brands fa-trello mr-2 text-primary-900" />
            {feature}
          </li>
        {/each}
      </ul>
    </div>

    <div class="px-4">
      <h2 class="text-lg text-primary-800 mb-2 mt-4">Skills</h2>
      <TagList
        on:click={emitEvent("skill-clicked")}
        selected={filters.skills}
        clickable={true}
        tags={idea.skills}
        editable={false}
        icon="fa-solid fa-bolt text-yellow-300"
      />
    </div>

    <div class="px-4 mb-8">
      <h2 class="text-lg text-primary-800 mb-2 mt-4">Tags</h2>
      <TagList
        tags={idea.tags}
        editable={false}
        clickable={true}
        on:click={emitEvent("tag-clicked")}
        selected={filters.tags}
      />
    </div>
    <div class="m-4">
        &nbsp;
    </div>
  </div>
{/if}
