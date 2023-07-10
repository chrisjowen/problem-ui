<script lang="ts">
  import IdeaShell from "$lib/components/idea/manage/IdeaShell.svelte";
  import IdeaValidationView from "$lib/components/idea/view/IdeaValidationView.svelte";
  import ProblemCard from "$lib/components/problem/new/ProblemCard.svelte";
  import type { Problem } from "$lib/types";
  import type { PageData } from "./$types";
  export let data: PageData;
  let problem: Problem = data.problem;
</script>

<IdeaShell bind:problem>
  {#if problem}
    <div class="flex p-4">
      <div class="max-w-[800px] m-2">
        <IdeaValidationView {problem} editable={true} />
      </div>
      <div>
        <ProblemCard {problem} readOnly={true} />
      </div>
    </div>
  {/if}
</IdeaShell>
