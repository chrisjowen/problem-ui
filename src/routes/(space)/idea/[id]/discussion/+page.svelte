<script lang="ts">
  import type { PaginationResults, Problem } from "$lib/types";
  import { page } from "$app/stores";
  import api from "$lib/api";
  import { onMount } from "svelte";
  import DiscussionList from "$lib/components/discussion/DiscussionList.svelte";
  import { goto } from "$app/navigation";
  import { isMember } from "$lib/util/authUtil";
  import IdeaShell from "$lib/components/idea/manage/IdeaShell.svelte";
  import type { PageData } from "../$types";

  let problemId = $page.params.id;
  let discussions: PaginationResults<any>;
  export let data: PageData;
  let problem: Problem = data.problem;

  onMount(() => {
    loadDiscussions();
  });

  async function loadDiscussions() {
    api.problem
      .discussion(problemId)
      .list("", 50, 1, ["user"])
      .then((res) => {
        discussions = res.data;
      });
  }

  async function createDiscussion(event: any) {
    let discussion = event.detail;
    await api.problem.discussion(problemId).create(discussion);
    loadDiscussions();
  }

  let onClick = (event: any) => {
    goto(`/idea/${problemId}/discussion/${event.detail.id}`);
  };
</script>

<IdeaShell bind:problem>
  {#if problem}
    <div class="p-4">
      <DiscussionList
        baseUrl="/idea/{problemId}"
        {discussions}
        on:create={createDiscussion}
        on:click={onClick}
        editable={isMember(problem)}
      />
    </div>
  {/if}
</IdeaShell>
