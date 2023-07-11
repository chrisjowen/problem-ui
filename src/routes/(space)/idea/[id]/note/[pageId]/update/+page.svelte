<script lang="ts">
  import type { Page, Problem } from "$lib/types";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import api from "$lib/api";
  import EditablePage from "$lib/components/page/EditablePage.svelte";
  import { onMount } from "svelte";
  import IdeaShell from "$lib/components/idea/manage/IdeaShell.svelte";
  import type { PageData } from "../$types";

  export let data: PageData;
  let problem: Problem = data.problem;

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
        goto(`/idea/${$page.params.id}/note/${$page.params.pageId}`);
      });
  }
</script>

<!-- svelte-ignore missing-declaration -->
<IdeaShell bind:problem>
  {#if pageDoc}
    <EditablePage bind:page={pageDoc} on:save={onSavePage} />
  {/if}
</IdeaShell>
