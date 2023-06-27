<script lang="ts">
  import NewsList from "$lib/components/news/NewsList.svelte";
  import ProblemLayout from "$lib/components/problem/ProblemLayout.svelte";
  import type { Problem } from "$lib/types";

  let problem: Problem;
</script>

<ProblemLayout bind:problem>
  {#if problem}
    <div class="flex mb-5 m-4">
      <h1 class="flex-1 items-end flex text-xl text-primary-600">
        Related News
      </h1>
    </div>

    <NewsList tags={problem.sectors.map((s) => s.name)} />
  {/if}
</ProblemLayout>
```
