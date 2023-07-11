<script lang="ts">
  import { page } from "$app/stores";
  import Discussion from "$lib/components/discussion/Discussion.svelte";
  import IdeaShell from "$lib/components/idea/manage/IdeaShell.svelte";
  import ProblemLayout from "$lib/components/problem/ProblemLayout.svelte";
  import type { Problem } from "$lib/types";
  import type { PageData } from "../$types";

  export let data: PageData;
  let problem: Problem = data.problem;
</script>

<IdeaShell bind:problem>
  <Discussion discussionId={$page.params.discussionId} />
</IdeaShell>
