<script lang="ts">
  import EditableTextArea from "$lib/shared/editableTextArea.svelte";
import type { Solution } from "$lib/types/solution";
  import { Card } from "flowbite-svelte";
  export let solution: Solution;
</script>




{#if solution}
<EditableTextArea bind:input={solution.description} />
<!-- <Card size="full">
  <h1 class="text-2xl text-primary-600">Solution Overview</h1>
  <div class="pt-4 user-content">
    {@html solution.description}
  </div>
</Card> -->

{/if}
