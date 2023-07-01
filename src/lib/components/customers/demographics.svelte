<script lang="ts">
  import type { Stakeholder } from "$lib/types/stakeholder.ts";
  export let stakeholder: null | Stakeholder = null;

  let metrics: any[] = [];

  $: {
    if (stakeholder) {
      metrics = [
        {
          icon: "fa-mars",
          value: stakeholder.gender,
        },
        {
          icon: "fa-hourglass-end",
          value: stakeholder.age_from
            ? `Age ${stakeholder.age_from} - ${stakeholder.age_to}`
            : "All ages",
        },
        {
          icon: "fa-user-tag",
          value: stakeholder.traits?.join(", ") || "No specific traits",
        },
        {
          icon: "fa-globe",
          value: stakeholder.regions?.join(", ") || "All regions",
        },
      ];
    }
  }
</script>

{#if stakeholder}
  <div class="flex text-xs gap-2">
    {#each metrics as metric}
      <div class="flex flex-row  p-2 border rounded-lg border-gray-200 items-center">
        <i class="fa {metric.icon} mr-2" />
        <div class="flex-1">{metric.value || "All"}</div>
      </div>
    {/each}
  </div>
{/if}
