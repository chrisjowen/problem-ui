<script lang="ts">
  import { page } from "$app/stores";
  import api from "$lib/api";
  import ProblemLayout from "$lib/components/problem/ProblemLayout.svelte";
  import Products from "$lib/components/problem/Products.svelte";
  import { onMount } from "svelte";

  let problem: any = null;
  let reload: Function;

  
</script>

<ProblemLayout bind:problem bind:reload>
  {#if problem}
    <div class="p-4">
      <Products on:delete={reload}  bind:products={problem.products} />
    </div>
  {/if}
</ProblemLayout>
