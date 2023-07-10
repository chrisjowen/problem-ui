<script lang="ts">
  import ProblemCard from "$lib/components/problem/new/ProblemCard.svelte";
  import type { Problem } from "$lib/types";
  import type { PageData } from "./$types";
  import IdeaShell from "$lib/components/idea/manage/IdeaShell.svelte";
  import { Button } from "flowbite-svelte";
  import api from "$lib/api";
  import IdeaChecklist from "$lib/components/idea/manage/IdeaChecklist.svelte";
  import ValidationResults from "$lib/components/idea/manage/ValidationResults.svelte";


  export let reload: ( force: boolean, successMessage?: string) => void;

  export let data: PageData;
  let problem: Problem = data.problem;

  function activateProblem(): void {
    api.problem.update(problem.id, { status: "ACTIVE" }).then((res) => {
      // problem = res.data;
      reload(true, "Validation started")
    });
  }

  
</script>

<IdeaShell bind:problem bind:reload={reload}>
  {#if problem}
    <div class="md:flex h-full">
      <div class="flex-1 h-full">
        {#if problem.status == "DRAFT"}
          <IdeaChecklist {problem} on:activate={activateProblem} />
        {:else}
          <ValidationResults {problem} />
        {/if}
      </div>
     
    </div>
  {/if}
</IdeaShell>
