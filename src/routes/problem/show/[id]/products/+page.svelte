<script lang="ts">
  import { page } from "$app/stores";
  import api from "$lib/api";
  import ProblemLayout from "$lib/components/problem/ProblemLayout.svelte";
  import Products from "$lib/components/problem/Products.svelte";
  import { onMount } from "svelte";

  let problem: any = null;

  onMount(reload);
  function reload() {
    api.problem.get($page.params.id, ["products", "sector"]).then((res) => {
      problem = res.data;
    });
  }
  
</script>

<ProblemLayout bind:problem>
  {#if problem}
    <div class="p-4">
      <Products on:delete={reload}  bind:products={problem.products} />
    </div>
  {/if}
</ProblemLayout>
