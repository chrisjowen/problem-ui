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
  let reload: (force?: boolean, successMessage?: string) => void;

  let onSave = (e: any) => {
    let product = e.detail;
    api.problem
      .products(problem.id)
      .create(product)
      .then((res) => {
        reload(true, "Product Added");
        goto(`/idea/${problem.id}/manage/competition`);
      });
  };
</script>

<IdeaShell bind:problem bind:reload>
  {#if problem}
    <EditableProduct on:save={onSave} />
  {/if}
</IdeaShell>
