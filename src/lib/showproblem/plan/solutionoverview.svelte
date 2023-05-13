<script lang="ts">
  import type { Solution } from "$lib/types/solution";
  import { Card } from "flowbite-svelte";
  export let solution: Solution;
</script>

{#if solution}
<Card size="full">
  <h1 class="text-2xl text-primary-900">Solution Overview</h1>
  <div class="pt-4 user-content">
    {@html solution.description}
  </div>
</Card>

{/if}
