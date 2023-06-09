<script lang="ts">
  import SolutionLayout from "$lib/components/solution/SolutionLayout.svelte";
  import DiscussionForm from "$lib/components/shared/discussions/DiscussionForm.svelte";
  import { onMount } from "svelte";
  import api from "$lib/api";
  import { page } from "$app/stores";

  let solution: any = null;

  onMount(() => {
    api.solution.get($page.params.id, []).then((res) => {
      solution = res.data;
    });
  });

  function onCreateDiscussion(event: any) {
    console.log(event);
  }
</script>

<SolutionLayout bind:solution>
  <div class="bg-white border">
    <DiscussionForm on:submit={onCreateDiscussion} />
  </div>
</SolutionLayout>
