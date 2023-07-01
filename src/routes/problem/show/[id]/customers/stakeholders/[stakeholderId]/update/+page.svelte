<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import api from "$lib/api";
  import EditableStakeholder from "$lib/components/customers/EditableStakeholder.svelte";
  import ProblemLayout from "$lib/components/problem/ProblemLayout.svelte";
  import type { Stakeholder } from "$lib/types";
  import { onMount } from "svelte";
  let stakeholder: Stakeholder;

  let stakeholderId = $page.params.stakeholderId;
  let problemId = $page.params.id;

  onMount(() => {
    api.problem
      .stakeholders(problemId)
      .get(stakeholderId)
      .then((res: any) => {
        stakeholder = res.data;
      });
  });

  function onSave(e: CustomEvent) {
    stakeholder = e.detail;
    if (stakeholder.id) {
      api.problem.stakeholders(problemId).update(stakeholder.id, stakeholder);
    } else {
      api.problem.stakeholders(problemId).create(stakeholder);
    }
    goto(`/problem/show/${problemId}/customers`);
  }
</script>

<ProblemLayout>
  {#if stakeholder}
    <EditableStakeholder {stakeholder} on:save={onSave} />
  {/if}
</ProblemLayout>
