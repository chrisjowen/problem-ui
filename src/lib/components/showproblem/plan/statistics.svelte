<script lang="ts">
  import type { Solution } from "$lib/types/solution.ts";
  import { Card } from "flowbite-svelte";
  export let solution: Solution;
</script>

<div class="grid grid-cols-1 2xl:grid-cols-3  2xl:gap-4 space-y-2 2xl:space-y-0  ">
  <div size="full" class="text-center bg-white border p-6">
    <i class="fa fa-clock text-4xl text-primary-600" />
    <p class="mt-2 text-xs">{solution.estimatedTimescale}</p>
  </div>
  <div size="full" class="text-center bg-white border p-6">
    <i class="fa fa-dollar-sign text-4xl text-primary-600" />
    <p class="mt-2 text-xs">{solution.estimatedCost}</p>
  </div>
  <div size="full" class="text-center bg-white border p-6">
    <i class="fa fa-people-group text-4xl text-primary-600" />
    <p class="mt-2 text-xs">{solution.estimatedTeamSize} People</p>
  </div>
</div>
