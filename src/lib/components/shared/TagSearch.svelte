<script lang="ts">
  import api from "$lib/api";
  import { onMount } from "svelte";
  import type { PaginationResults, Sector } from "$lib/types";
  import HighlightedText from "../shared/HighlightedText.svelte";
  import { imageUrl } from "$lib/util/imageutil";
  import { state } from "$lib/store";

  export let selected: any[] = [];
  export let tags: string[] = [];
  let q = "";
  let showResults = false;
  let input: any;

  let onAdd = (s: string) => () => {
    showResults = false;
    selected = selected.concat(s);
  };

  let onRemove = (tag: any) => () => {
    selected = selected.filter((s) => tag != tag);
  };

  $: filtered = tags.filter((tag) => tag.toLowerCase().includes(q.toLowerCase()));
</script>

<div class="relative">
  <input
    bind:this={input}
    on:focus={() => (showResults = true)}
    type="text"
    bind:value={q}
    placeholder="Search for a tag"
    class="w-full p-4 border border-gray-300 focus:outline-none active:outline-0 focus:ring-0"
  />
  {#if tags && showResults}
    <section
      id="results"
      class="absolute w-full z-10 border max-h-[300px] overflow-auto"
    >
      <ul class="bg-white">
        {#each filtered as tag}
          <li >
            <button class="flex flex-row p-4 hover:bg-primary-100 items-center w-full" on:click={onAdd(tag)} on:keydown={onAdd(tag)}>
              <i class="fa fa-tag mr-2" />
              <HighlightedText value={tag.toLowerCase()} q={q.toLowerCase()} />
            </button>
          </li>
        {/each}
      </ul>
    </section>
  {/if}
</div>
{#each selected as tag}
  <span class="p-2 mt-4 mr-4 border inline-block bg-white">
    <span class="flex flex-row items-center ">
      <i class="fa fa-tag mr-2" />

      {tag.toLowerCase()}
      <div class="justify-end ml-4">
        <button on:click={onRemove(tag)} class="px-2 hover:text-red-500">
          <i class="fa fa-close" />
        </button>
      </div>
    </span>
  </span>
{/each}
