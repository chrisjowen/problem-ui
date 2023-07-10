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
    <div class="md:p-4">
      <div class="md:flex">
        <div class="max-w-[800px] mr-4">
          <IdeaValidationView {problem} editable={true} />
        </div>
        <div class="hidden lg:block">
          <ProblemCard {problem} readOnly={true} />
        </div>
      </div>
    </div>
  {/if}
</IdeaShell>
