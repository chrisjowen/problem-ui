<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import api from "$lib/api";
  import EditableDiscussion from "$lib/components/discussion/EditableDiscussion.svelte";
  import IdeaShell from "$lib/components/idea/manage/IdeaShell.svelte";
  import type { Discussion, Problem } from "$lib/types";
  import { onMount } from "svelte";
  import type { PageData } from "../$types";

  export let data: PageData;
  let problem: Problem = data.problem;
  let discussion: Discussion;
  let discussionId = $page.params.discussionId;

  onMount(load);

  function load() {
    api.discussion.get(discussionId).then((res) => {
      discussion = res.data;
    });
  }

  function onSave(): void {
    api.discussion.update(discussionId, discussion).then((res) => {
      discussion = res.data;
      goto(`/problem/show/${$page.params.id}/discussion/${discussionId}`);
    });
  }
</script>

<IdeaShell bind:problem>
  {#if discussion}
    <EditableDiscussion bind:discussion on:save={onSave} />
  {/if}
</IdeaShell>
