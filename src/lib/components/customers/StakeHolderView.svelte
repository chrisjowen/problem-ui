<script lang="ts">
  import type { Stakeholder } from "$lib/types";
  import { imageUrl } from "$lib/util/imageutil";
  import { editable } from "svelte-tiptap";
  import TagList from "../shared/TagList.svelte";
  import Demographics from "./demographics.svelte";
  export let stakeholder: Stakeholder;
</script>

<div class=" text-gray-600">
  <section class=" border p-4 w-full text-left flex mb-4">
    {#if stakeholder.img}
      <img
        src={imageUrl(stakeholder.img)}
        class="w-[70px] border mr-5"
        alt="stakeholder"
      />
    {/if}
    <div class="flex-1">
      <h1 class="text-xl font-bold  mb-2">{stakeholder.type}</h1>
      <p>
        {@html stakeholder.description}
      </p>
      {#if stakeholder.benefits}
        <p>
          <span class="font-bold">Benefits to solving the problem:</span>
          {stakeholder.benefits}
        </p>
      {/if}
    </div>
  </section>

  <section class="mb-4 border p-4 w-full">
    <h1 class="text-xl font-bold mb-2">How Are They Effected?</h1>
    {#each stakeholder.problems as problem}
      <div
        class="flex shrink-0 flex-row pb-1 pl-1 pt-2 border-gray-200 items-start"
      >
        <i class="fa fa-warning text-red-500 mr-4 mt-1" />
        <div class="flex-1">{@html problem}</div>
      </div>
    {/each}
  </section>

  <section class="mb-4 border p-4 w-full">
    <h1 class="text-xl font-bold mb-2">What Are Their Demographics?</h1>
    <Demographics {stakeholder} />
  </section>

  <section class="border p-4 w-full">
    <h1 class="text-xl font-bold mb-2">
      What Is There Educational Background?
    </h1>
    <p>{stakeholder.education || "N/A"}</p>
  </section>
</div>
