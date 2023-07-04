<script lang="ts">
  import type { PaginationResults } from "$lib/types";
  import { page } from "$app/stores";
  import api from "$lib/api";
  import { onMount } from "svelte";
  import DiscussionList from "$lib/components/discussion/DiscussionList.svelte";
  import { goto } from "$app/navigation";
  import ProblemLayout from "$lib/components/problem/ProblemLayout.svelte";
  import { isMember } from "$lib/util/authUtil";
  import Tip from "$lib/components/problem/Tip.svelte";

  let problem: any = null;
  let problemId = $page.params.id;
  let discussions: PaginationResults<any>;

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

  let onClick = (event: any, ) => {
    goto(`/problem/show/${problemId}/discussion/${event.detail.id}`);
  };

</script>

<ProblemLayout bind:problem>
  {#if problem}
  <div class="p-4">
    <Tip title="Discussions">
     
      <p class="text-sm">
        Discussions are a great way to share ideas and collaborate with others. Here you can discuss any issues, ideas, 
        or questions you have about the problem, see: <a href="/docs/discussions" class="text-primary-500"><i class="fas fa-file mx-2"></i>Using Discussions</a>
      </p>
    </Tip>
    <DiscussionList baseUrl="/problem/show/{problemId}" {discussions} on:create={createDiscussion} on:click={onClick} editable={isMember(problem)} />
  </div>
  {/if}
</ProblemLayout>
