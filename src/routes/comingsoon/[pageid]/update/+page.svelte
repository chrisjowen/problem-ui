<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import api from "$lib/api";
  import ProblemLayout from "$lib/components/problem/ProblemLayout.svelte";
  import EditableSoon from "$lib/components/soon/EditableSoon.svelte";
  import type { Problem } from "$lib/types";
  import { onMount } from "svelte";

  let entity: any;

  onMount(load);

  function load() {
    console.log("loading")
    api.soon
      .get($page.params.pageid)
      .then((res) => {
        entity = res.data;
      });
  }



  function save(): void {
    api.soon
      .update($page.params.pageid, entity)
      .then((res) => {
        entity = res.data;
        goto(`/problem/show/${$page.params.id}/comingsoon/${$page.params.pageid}`)
      });
  }
</script>

<ProblemLayout >
  {#if entity}
    <EditableSoon bind:entity={entity} on:save={save} />
  {/if}
</ProblemLayout>
