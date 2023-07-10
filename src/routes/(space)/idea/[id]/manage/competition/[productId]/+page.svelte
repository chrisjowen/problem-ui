<script lang="ts">
  import type { Problem } from "$lib/types";
  import type { PageData } from "../edit/$types";
  import IdeaShell from "$lib/components/idea/manage/IdeaShell.svelte";
  import EditableStakeholder from "$lib/components/idea/manage/EditableStakeholder.svelte";
  import { onMount } from "svelte";
  import type { Stakeholder } from "$lib/types/stakeholders";
  import { page } from "$app/stores";
  import api from "$lib/api";
  import { goto } from "$app/navigation";
  import EditableProduct from "$lib/components/idea/manage/EditableProduct.svelte";

  export let data: PageData;
  let problem: Problem = data.problem;
  let product: Product;
  let reload: (force?: boolean, successMessage?: string) => void;
  let productId = $page.params.productId;


  onMount(() => {
    product = problem.products.find((p) => p.id == productId);
  });

  let onSave = (e: any) => {
    let product = e.detail;
    api.problem
      .products(problem.id)
      .update(product.id, product)
      .then((res) => {
        reload(true, "Product Added");
        goto(`/idea/${problem.id}/manage/competition`);
      });
  };
</script>

<IdeaShell bind:problem bind:reload>
  {#if problem && product}
    <EditableProduct bind:product={product} on:save={onSave} />
  {/if}
</IdeaShell>
