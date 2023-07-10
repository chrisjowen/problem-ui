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
  let stakeholderId = $page.params.stakeholderId;
  let reload: (force?: boolean, successMessage?: string) => void;

  onMount(() => {
    stakeholder = problem.stakeholders.find((sh) => sh.id == stakeholderId);
  });

  let onSave = (e: any) => {
    stakeholder = e.detail;
    api.problem
      .stakeholders(problem.id)
      .update(stakeholderId, stakeholder)
      .then((res) => {
        reload(true, "Stakeholder updated");
        goto(`/idea/${problem.id}/manage/stakeholders`);
      });
  };
</script>

<IdeaShell bind:problem bind:reload>
  {#if problem && stakeholder}
    <EditableStakeholder bind:stakeholder on:save={onSave}>
      <div
        class=" p-2 px-3 rounded-md  bg-white inline-block text-sm border"
      >
        <a href="/idea/{problem.id}/manage/stakeholders"
        >
        <i class="fas fa-arrow-left mr-2" />
        
        Back</a
        >
      </div>
    </EditableStakeholder>
  {/if}
</IdeaShell>
