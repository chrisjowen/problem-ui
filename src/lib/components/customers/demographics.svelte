<script lang="ts">
  import type { Stakeholder } from "$lib/types";

  export let stakeholder: null | Stakeholder = null;

  let metrics: any[] = [];

  $: {
    if (stakeholder) {
      metrics = [
        {
          icon: "fa-mars",
          value: stakeholder.gender || "All Genders",
        },
        {
          icon: "fa-hourglass-end",
          value: stakeholder.age_from
            ? `Age ${stakeholder.age_from} - ${stakeholder.age_to}`
            : "All ages",
        },
        {
          icon: "fa-user-tag",
          value: "Interests: " + stakeholder.interests?.join(", ") || "No specific intersts",
        },
        {
          icon: "fa-map",
          value: (stakeholder.regions?.join(", ") || "All")  + " - regions",
        },
        {
          icon: "fa-globe",
          value: (stakeholder.races?.join(", ") || "All")  + " - ethnicities",
        },
      ];
    }
  }
</script>

{#if stakeholder}
  <div class="flex  flex-wrap text-xs gap-2 wrap">
    {#each metrics as metric}
      <div class="flex shrink-0 flex-wrap flex-row  p-2 border rounded-lg border-gray-200 items-center">
        <i class="fa {metric.icon} mr-2" />
        <div class="flex-1">{metric.value }</div>
      </div>
    {/each}
  </div>
{/if}
