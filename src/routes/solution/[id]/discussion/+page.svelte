<script lang="ts">
  import type { PaginationResults } from "$lib/types";
  import { page } from "$app/stores";
  import api from "$lib/api";
  import SolutionLayout from "$lib/components/solution/SolutionLayout.svelte";
  import { onMount } from "svelte";
  import DiscussionList from "$lib/components/shared/discussions/DiscussionList.svelte";

  let solution: any = null;
  let solutionId = $page.params.id;
  let discussions: PaginationResults<any>;

  onMount(() => {
    api.solution.get($page.params.id, []).then((res) => {
      solution = res.data;
    });
    loadDiscussions();
  });

  async function loadDiscussions() {
    api.solution
      .discussion($page.params.id)
      .list("", 50, 1, ["user"])
      .then((res) => {
        discussions = res.data;
      });
  }

  async function createDiscussion(event: any) {
    let discussion = event.detail;
    await api.solution.discussion(solutionId).create(discussion);
    loadDiscussions();
  }



</script>

<SolutionLayout bind:solution>
  <DiscussionList {discussions} on:create={createDiscussion} />
</SolutionLayout>
