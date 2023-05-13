<script lang="ts">
  import type { Solution } from "$lib/types/solution";
  export let solution: Solution;
</script>

{#if solution}
<section class="drop-shadow-100 p-6 bg-white border ">
  <h1 class="text-2xl text-primary-900">Solution Overview</h1>
  <div class="pt-4">
    {@html solution.description}
  </div>
</section>

{/if}
