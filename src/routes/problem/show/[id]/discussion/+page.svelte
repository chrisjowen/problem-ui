<script lang="ts">
  import { page } from "$app/stores";
  import api from "$lib/api";
  import ProblemLayout from "$lib/components/problem/ProblemLayout.svelte";
  import Disqus from "$lib/components/shared/disqus.svelte";
  import { Breadcrumb, BreadcrumbItem } from "flowbite-svelte";
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
    <div class="mb-4">
      <div class="bg-white border">
        <Disqus />
      </div>
    </div>
  {/if}
</ProblemLayout>
