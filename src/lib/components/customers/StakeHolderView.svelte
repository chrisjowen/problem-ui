<script lang="ts">
  import type { Stakeholder } from "$lib/types";
  import { imageUrl } from "$lib/util/imageutil";
  import { editable } from "svelte-tiptap";
  import TagList from "../shared/TagList.svelte";
  import Demographics from "./demographics.svelte";
  export let stakeholder: Stakeholder;
</script>

<div class="px-4 pb-4 text-gray-600">
  <section
    id="stakeholder"
    class="mb-2 bg-gray-50 border p-4 flex items-center"
  >
    {#if stakeholder.img}
      <img
        src={imageUrl(stakeholder.img)}
        class="w-[90px] border mr-5"
        alt="stakeholder"
      />
    {/if}
    <div class="flex-1">
      <h1 class="text-2xl  ">{stakeholder.type}</h1>
      {@html stakeholder.description}
    <TagList editable={false} tags={stakeholder.interests} />

    </div>
    <a href="./customers/stakeholders/{stakeholder.id}/update" class="p-4">
      <i class="fas fa-edit  hover:text-primary-400" />
    </a>
  </section>

  <section id="overview " class=" p-4">
    <h1 class="mb-2 text-xl ">How Are They Affected?</h1>
    {#each stakeholder.problems as problem}
      <div class="flex flex-row pb-1 pl-1 pt-2 border-gray-200 items-center">
        <i class="fa fa-warning mr-2" />
        <div class="flex-1">{@html problem}</div>
      </div>
    {/each}
    <div class="my-3">
      <hr />
    </div>
    <h1 class="mb-2 text-xl ">
      How Would They Benefit From Solving This Problem
    </h1>
    <div class="prose">
      {@html stakeholder.benefits || "N/A"}
    </div>
    <div class="my-3">
      <hr />
    </div>
    <h1 class="text-xl mb-3 ">What Are There Demographics</h1>
    <div>
      <Demographics {stakeholder} />
    </div>
    <div class="my-3">
      <hr />
    </div>
    <h1 class="mb-2 text-xl ">What Ethnicity Are They?</h1>
    <div class="mb-3">
      {#if stakeholder.races}
        <p>{stakeholder.races.join(", ")}</p>
      {:else}
        <p>All</p>
      {/if}
    </div>
    <div class="my-3">
      <hr />
    </div>
    <h1 class="mb-2 text-xl ">Education</h1>
    <div>
      {stakeholder.education || "N/A"}
    </div>
  </section>
</div>
