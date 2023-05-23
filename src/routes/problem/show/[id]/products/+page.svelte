<script lang="ts">
  import { page } from "$app/stores";
  import api from "$lib/api";
  import ProblemLayout from "$lib/components/problem/ProblemLayout.svelte";
  import { onMount } from "svelte";

  let problem: any = null;

  onMount(() => {
    api.problem.get($page.params.id).then((res) => {
      problem = res.data;
    });
  });

  
</script>

<ProblemLayout bind:problem>
  {#if problem}
    <div class="m-2 md:m-0">
      <Products problemId={problem.id} />
    </div>
  {/if}
</ProblemLayout>
