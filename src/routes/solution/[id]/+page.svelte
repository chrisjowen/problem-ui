<script lang="ts">
  import { page } from "$app/stores";
  import api from "$lib/api";
  import LatestComments from "$lib/components/shared/comments/LatestComments.svelte";
  import LeftMenuLayout from "$lib/components/shared/LeftMenuLayout.svelte";
  import EditableTextArea from "$lib/components/shared/EditableTextArea.svelte";
  import Features from "$lib/components/showproblem/plan/features.svelte";
  import TechnologiesAndExpertise from "$lib/components/showproblem/plan/technologiesAndExpertise.svelte";
  import { auth } from "$lib/store";
  import { onMount } from "svelte";
  import type {PaginationResults, Comment}  from "$lib/types/index";
  import SolutionLayout from "$lib/components/solution/SolutionLayout.svelte";


  let solution: any = null;
  let problem: any = null;
  let comments: null | PaginationResults<Comment> = null 


  onMount(async () => {
    let result = await api.solution.get($page.params.id, ["user", "problem"]);
    solution = result.data;
    problem = solution.problem;
    loadComments();
  });

  function loadComments() {
    api.solution.comments(solution.id).list("", 4,0,["user"]).then((res) => {
      comments = res.data;
    });
  }
</script>

<SolutionLayout bind:solution={solution}>
  {#if solution}
    <div class="xl:flex">
      <div class="xl:max-w-[840px] mx-auto">
        <div class="border bg-white mb-4">
          <EditableTextArea
            bind:input={solution.description}
            owner={solution.user}
            let:editing
            editable={$auth.loggedInUser?.id == solution.user.id}
          />
        </div>
        <div class="bg-white p-2 rounded-md border">
          <LatestComments pagination={comments} on:created={loadComments}  />
        </div>
      </div>

      <div class="flex-1 px-5 md:p-0 xl:pl-4 space-y-4 xl:max-w-[940px] mx-auto">
       
        <div>
          <h1 class="mb-4 text-xl text-primary-600">Key Features</h1>
          <Features {solution} />
        </div>
        <div>
          <TechnologiesAndExpertise {solution} />
        </div>
      </div>
    </div>
  {/if}
</SolutionLayout>
