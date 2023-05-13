<script lang="ts">
  import type { Solution } from "$lib/types/solution.ts";
  export let solution: Solution;
</script>

<div>
  <section
    class="flex flex-row pb-2  border-b-[1px] border-gray-200"
  >
    <div class="mr-4">
      <i class="fa fa-clock text-sm text-primary-900" />
    </div>
    <div class="flex-1">{solution.estimatedTimescale}</div>
  </section>
  <section
    class="flex flex-row pb-2 pt-2 border-b-[1px] border-gray-200"
  >
    <div class="mr-4">
      <i class="fa fa-dollar-sign text-sm text-primary-900" />
    </div>
    <div class="flex-1">{solution.estimatedCost}</div>
  </section>
  <section
    class="flex flex-row  pt-2  border-gray-200"
  >
    <div class="mr-4">
      <i class="fa fa-people-group text-sm text-primary-900" />
    </div>
    <div class="flex-1">{solution.estimatedTeamSize} Team Size</div>
  </section>
</div>
