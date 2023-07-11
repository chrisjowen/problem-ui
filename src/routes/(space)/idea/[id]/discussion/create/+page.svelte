<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import api from "$lib/api";
  import EditableDiscussion from "$lib/components/discussion/EditableDiscussion.svelte";
  import IdeaShell from "$lib/components/idea/manage/IdeaShell.svelte";
  import type { Discussion, Problem } from "$lib/types";
  import type { PageData } from "../$types";

  export let data: PageData;
  let problem: Problem = data.problem;

  let discussion: Discussion = {
    title: "",
    question: "",
    tags: [],
    problem_id: $page.params.id,
  };

  function onSave(): void {
    api.discussion.create(discussion).then((res) => {
      discussion = res.data;
      goto(`/idea/${$page.params.id}/discussion/${discussion.id}`);
    });
  }
</script>

<IdeaShell bind:problem>
  {#if discussion}
    <EditableDiscussion bind:discussion on:save={onSave} />
  {/if}
</IdeaShell>
