<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import api from "$lib/api";
  import EditablePage from "$lib/components/page/EditablePage.svelte";
  import ProblemLayout from "$lib/components/problem/ProblemLayout.svelte";
  import type { Problem } from "$lib/types";
  import { onMount } from "svelte";

  let problem: Problem;
  let pageDoc: Page;

  onMount(loadPage);

  function loadPage() {
    api.problem
      .pages($page.params.id)
      .get($page.params.pageId)
      .then((res) => {
        pageDoc = res.data;
      });
  }


  function onSavePage(): void {
    api.problem
      .pages($page.params.id)
      .update($page.params.pageId, pageDoc)
      .then((res) => {
        pageDoc = res.data;
        goto(`/problem/show/${$page.params.id}/page/${$page.params.pageId}`)
      });
  }
</script>

<ProblemLayout bind:problem>
  {#if pageDoc}
    <EditablePage bind:page={pageDoc} on:save={onSavePage} />
  {/if}
</ProblemLayout>
