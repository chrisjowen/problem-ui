<script lang="ts">
  import { goto } from "$app/navigation";
  import api from "$lib/api";
  import EditablePage from "$lib/components/page/EditablePage.svelte";

  let page = {
    title: "New Note",
    body: "Lorum ipsum....",
    tags: [],
    scope: "global",
    slug: "new_note",
  };

  function onSavePage(): void {
    api
      .page
      .create(page)
      .then((res) => {
        goto(`/pages`);
      });
  }



</script>

  {#if page}
    <EditablePage bind:page on:save={onSavePage} pages={pages} />
  {/if}
