<script lang="ts">
  import { page } from "$app/stores";
  import Discussion from "$lib/components/discussion/Discussion.svelte";
  import ProblemLayout from "$lib/components/problem/ProblemLayout.svelte";
</script>

<ProblemLayout>
    <Discussion discussionId={$page.params.discussionId} />
</ProblemLayout>
