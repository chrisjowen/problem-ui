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

  export let data: PageData;
  let problem: Problem = data.problem;
  let stakeholder: Stakeholder;
  let reload: (force?: boolean, successMessage?: string) => void;


  let onSave = (e: any) => {
    stakeholder = e.detail;
    api.problem
      .stakeholders(problem.id)
      .create(stakeholder)
      .then((res) => {
        reload(true, "Stakeholder updated");
        goto(`/idea/${problem.id}/manage/stakeholders`);
      });
  };
</script>

<IdeaShell bind:problem bind:reload>
  {#if problem }
    <EditableStakeholder  on:save={onSave} />
  {/if}
</IdeaShell>
