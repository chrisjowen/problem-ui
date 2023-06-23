<script lang="ts">
  import type { Stakeholder } from "$lib/types/stakeholder.ts";
  export let stakeholder: null | Stakeholder = null;

  let ageRange = stakeholder && stakeholder.age_from
    ? `Age ${stakeholder.age_from} - ${stakeholder.age_to}`
    : "No age range";

  let regions = stakeholder && stakeholder.regions
    ? stakeholder.regions.join(", ")
    : "All regions";

  let traits = stakeholder &&  stakeholder.traits
    ? stakeholder.traits.join(", ")
    : "No specific traits";

  let metrics = [
    {
      icon: "fa-mars",
      value: stakeholder.gender,
    },
    {
      icon: "fa-hourglass-end",
      value: ageRange,
    },
    {
      icon: "fa-user-tag",
      value: traits,
    },
    {
      icon: "fa-globe",
      value: regions,
    },
  ];
</script>

<h1 class="text-xl mb-3 text-primary-600">Demographics</h1>
{#if stakeholder}
  {#each metrics as metric}
    <div class="flex flex-row pb-2 pt-2 border-b-[1px] border-gray-200">
      <div class="mr-4">
        <i class="fa {metric.icon} text-sm text-primary-600" />
      </div>
      <div class="flex-1">{metric.value}</div>
    </div>
  {/each}
{/if}
