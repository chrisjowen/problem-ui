<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import api from "$lib/api";
  import EditablePage from "$lib/components/page/EditablePage.svelte";
  import ProblemLayout from "$lib/components/problem/ProblemLayout.svelte";
  import type { Page, Problem } from "$lib/types";
  import { onMount } from "svelte";

  let problem: Problem;
  let pageDoc: Page;

  onMount(loadPage);

  function loadPage() {
    api.page
      .get($page.params.pageId)
      .then((res) => {
        pageDoc = res.data;
      });
  }


  function onSavePage(): void {
    api.page
      .update($page.params.pageId, pageDoc)
      .then((res) => {
        pageDoc = res.data;
        goto(`/page`)
      });
  }
</script>

  {#if pageDoc}
    <EditablePage bind:page={pageDoc} on:save={onSavePage} />
  {/if}
