<script lang="ts">
  import Demographics from "$lib/components/customers/demographics.svelte";
  import TagList from "$lib/components/shared/TagList.svelte";
  import type { Stakeholder } from "$lib/types";
  import { imageUrl } from "$lib/util/imageutil";
  export let stakeholder: Stakeholder;
</script>

<div class="pt-8  text-gray-600">
  <section
    id="stakeholder"
    class="flex items-center"
  >
    {#if stakeholder.img}
      <img
        src={imageUrl(stakeholder.img)}
        class="w-[90px] border mr-5"
        alt="stakeholder"
      />
    {/if}
    <div class="flex-1">
      <h1 class="text-xl">{stakeholder.type}</h1>
      {@html stakeholder.description}
      <TagList editable={false} tags={stakeholder.interests} />
    </div>
  </section>

  <section id="overview " class="px-4">
    <h1 class=" text-xl">How Are They Affected?</h1>
    {#each stakeholder.problems as problem}
      <div class="flex flex-row pb-1 pl-1 pt-2 border-gray-200 items-center">
        <i class="fa fa-warning mr-2" />
        <div class="flex-1">{@html problem}</div>
      </div>
    {/each}
      <hr />
    <h1 class="mb-2 text-xl">
      How Would They Benefit From Solving This Problem
    </h1>
    <div class="prose">
      {@html stakeholder.benefits || "N/A"}
    </div>
      <hr />
    <h1 class="text-xl mb-3">What Are There Demographics</h1>
    <div>
      <Demographics {stakeholder} />
    </div>
      <hr />
    <h1 class="mb-2 text-xl">What Ethnicity Are They?</h1>
    <div class="mb-3">
      {#if stakeholder.races}
        <p>{stakeholder.races.join(", ")}</p>
      {:else}
        <p>All</p>
      {/if}
    </div>
      <hr />
    <h1 class=" text-xl">Education</h1>
    <div>
      {stakeholder.education || "N/A"}
    </div>
  </section>
</div>
