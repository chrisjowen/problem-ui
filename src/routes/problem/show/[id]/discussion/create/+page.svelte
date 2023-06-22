<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import api from "$lib/api";
  import EditableDiscussion from "$lib/components/discussion/EditableDiscussion.svelte";
  import ProblemLayout from "$lib/components/problem/ProblemLayout.svelte";
  import type { Discussion, Problem } from "$lib/types";

  let problem: Problem;
  let discussion: Discussion = {
    title: "",
    question: "",
    tags: [],
    problem_id: $page.params.id
  };


  function onSave(): void {
    api.discussion
      .create(discussion)
      .then((res) => {
        discussion = res.data;
        goto(`/problem/show/${$page.params.id}/discussion/${discussion.id}`)
      });
  }
</script>

<ProblemLayout bind:problem>
  {#if discussion}
    <EditableDiscussion bind:discussion={discussion}  on:save={onSave} />
  {/if}
</ProblemLayout>
