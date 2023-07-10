<script lang="ts">
  import ProblemValidationView from "$lib/components/idea/view/IdeaValidationView.svelte";
  import type { PageData } from "./$types";
  export let data: PageData;
</script>

{#if data.problem}
  <ProblemValidationView problem={data.problem} />
{/if}
