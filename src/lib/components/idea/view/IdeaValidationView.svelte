<script lang="ts">
  import IdeaOverview from "./IdeaOverview.svelte";
  import type { ContributionRequest, Problem, Vote } from "$lib/types";
  import IdeaUser from "./IdeaUser.svelte";
  import IdeaBanner from "./IdeaBanner.svelte";
  import IdeaProblemStatement from "./IdeaProblemStatement.svelte";
  import { Button } from "flowbite-svelte";
  import IdeaStakeholders from "./IdeaStakeholders.svelte";
  import LatestComments from "$lib/components/comments/LatestComments.svelte";
  import IdeaSolvers from "./IdeaSolvers.svelte";
  import IdeaCompetitors from "./IdeaCompetitors.svelte";
  import api from "$lib/api";
  import type { AxiosResponse } from "axios";
  import { auth } from "$lib/store";
  import LoginModal from "$lib/components/shared/LoginModal.svelte";
  import ContributeModal from "./ContributeModal.svelte";
  import { createEventDispatcher } from "svelte";
  let myVote: Vote;
  let showLogin = false;

  export let problem: Problem;
  export let editable = false;

  let showContributeModal = false;

  let dispatch = createEventDispatcher();

  function createContibuteRequest(e: CustomEvent){
    debugger
    let form = e.detail;

    api.problem
      .contributionRequests(problem.id)
      .create(form)
      .then((res) => {
        showContributeModal = false;
        dispatch("reload", true);
      });
  };

  // function vote(like: boolean, comments: string, answers: any) {
  let vote = (liked: boolean) => () => {
    if (!$auth.loggedInUser) {
      showLogin = true;
      return;
    }

    api.problem
      .votes(problem.id)
      .create({ liked })
      .then((res: AxiosResponse<Vote, any>) => {
        myVote = res.data;
      });
  };

  $: myVote =
    $auth?.loggedInUser &&
    problem?.votes?.find(
      (v: Vote) =>
        v.problem_id === problem.id && v.user_id === $auth.loggedInUser?.id
    );

  $: myContribRequest =
    $auth?.loggedInUser &&
    problem?.contribution_requests?.find((v: ContributionRequest) =>
        v.problem_id === problem.id && v.user_id === $auth.loggedInUser?.id
    );

</script>

<LoginModal bind:open={showLogin} />
<ContributeModal
  bind:open={showContributeModal}
  on:contribute={createContibuteRequest}
/>

{#if !editable && !myVote}
  <div>
    <div class="border bg-white z-30 p-4 md:hidden w-full absolute bottom-0">
      <div class="flex">
        <Button
          class="w-full mr-2 bg-green-500 hover:bg-green-600"
          on:click={vote(true)}
        >
          <i class="fas fa-thumbs-up mr-2" />
        </Button>
        <Button
          class="w-full bg-red-500 hover:bg-red-600"
          on:click={vote(false)}
        >
          <i class="fas fa-thumbs-down mr-2" />
        </Button>
      </div>
    </div>
  </div>
{/if}

<div class="flex max-w-[1200px] mx-auto">
  <div class="flex-1 space-y-4">
    {#if problem.user && !editable}
      <div>
        <IdeaUser user={problem.user} />
      </div>
    {/if}

    <div class="border">
      <IdeaBanner {problem} />
    </div>
    <div class="border bg-white p-8">
      <IdeaOverview {problem} />
    </div>

    <div class="border bg-white p-8">
      <IdeaProblemStatement {problem} />
    </div>
    <div class="border bg-white p-8">
      <IdeaSolvers {problem} />
    </div>
    <div class="border bg-white p-8">
      <div class="prose">
        <h2>Stakeholders</h2>
      </div>
      <IdeaStakeholders {problem} />
    </div>

    <div class="border bg-white p-8">
      <div class="prose mb-8">
        <h2>Competitors</h2>
      </div>
      <IdeaCompetitors {problem} />
    </div>

    <div class="mb-[200px] md:hidden">Empty space</div>
  </div>
  {#if !editable}
    <div class="shrink-0 w-[370px] p-4 relative hidden md:block h-full">
      <div class=" w-[350px] overflow-auto h-full">
        <div class="flex justify-end mt-2 mb-5">
          <Button color="light" size="xs">
            Share
            <i class="fas fa-share ml-2" />
          </Button>
        </div>

        {#if myVote}
          {#if myVote.liked}
            <div class="border p-4 mb-4 bg-white text-center">
              <div
                class="border p-4 mb-4 bg-green-500 text-white text-2xl font-bold"
              >
                <i class="fas fa-thumbs-up mr-2" />
                You Loved It
              </div>
              <div>
                Leave a comment below and tell the solvers why you liked it.
              </div>
            </div>

            {#if myContribRequest}
            <div class="p-4 mb-4 bg-white border">
              <h1 class="text-center text-xl font-bold">
                You Requested To Contibute
              </h1>
              </div>
            {:else}
            <div class="p-4 mb-4 bg-white border">
              <h1 class="text-center text-xl font-bold">
                Want To Get Involved?
              </h1>
              <p class="my-4 text-center">
                The solvers are looking for contrinutors to this idea
              </p>

              <Button
                class="w-full mr-2 "
                color="light"
                on:click={() => (showContributeModal = true)}
              >
                <i class="fas fa-arrow-right mr-2" />
                Request To Contibute
              </Button>
            </div>
            {/if}
          {:else}
            <div class="border p-4 mb-4 bg-red-500">
              <div class="w-full text-white text-center text-2xl font-bold">
                <i class="fas fa-thumbs-down mr-2" />
                You Hated It
              </div>
            </div>
          {/if}
        {:else}
          <div class="border bg-white p-4 mb-4">
            <h1 class="text-center text-xl font-bold">
              What You Think Of This Idea?
            </h1>
            <p class="text-center p-4">
              Let the solvers know what you think of their idea, is it worth
              perusing?
            </p>
            <div class="flex">
              <Button
                class="w-full mr-2 bg-green-500 hover:bg-green-600"
                on:click={vote(true)}
              >
                <i class="fas fa-thumbs-up mr-2" />
                Love
              </Button>
              <Button
                class="w-full bg-red-500 hover:bg-red-600"
                on:click={vote(false)}
              >
                <i class="fas fa-thumbs-down mr-2" />
                Hate
              </Button>
            </div>
          </div>
        {/if}

        <div class="mb-4">
          <h1 class="text-xl font-bold mb-2">Latest Comments</h1>

          <div class="bg-white border pt-4">
            <LatestComments type="problem" showCommentForm={true} />
          </div>
        </div>
      </div>
    </div>
  {/if}
</div>
