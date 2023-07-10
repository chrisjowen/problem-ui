<script lang="ts">
  import { readonly } from "svelte/store";
  import CommentView from "$lib/components/comments/CommentView.svelte";
  import Gravitar from "$lib/components/shared/Gravitar.svelte";
  import type { Problem, Vote } from "$lib/types";
  import { comment } from "svelte/internal";
  import { fromNow } from "$lib/util/datetimeUtil";
  import PriceChart from "./PriceChart/PriceChart.svelte";
  import ValidationVotes from "./validationresults/ValidationVotes.svelte";
  import ContributionRequests from "./validationresults/ContributionRequests.svelte";

  export let problem: Problem;

  $: statistics = problem &&
    problem.votes && {
      comments: problem.comments,
      likes: problem.votes.filter((v: Vote) => v.liked == true),
      dislikes: problem.votes.filter((v: Vote) => v.liked == false),
      views: 320,
    };
</script>

{#if statistics}
  <div class="bg-white py-4">
    <div class="mx-8 my-4">
      <div class="grid grid-cols-3 gap-2">
        <div class=" border p-2 text-center text-green-500 bg-white">
          <i class="fas fa-thumbs-up text-2xl" />
          <p class="text-sm mt-2">
            {statistics?.likes.length} Love It
          </p>
        </div>

        <div class=" border p-2 text-center text-red-500 bg-white">
          <i class="fas fa-thumbs-down text-2xl" />
          <p class="text-sm mt-2">
            {statistics?.dislikes.length} Hate It
          </p>
        </div>

        <div class="border p-2 text-center text-primary-500 bg-white">
          <i class="fa-solid fa-comment text-2xl" />
          <p class="text-sm mt-2">
            {problem?.comments?.length} Comments
          </p>
        </div>
      </div>
    </div>

    <h1 class="mx-8 mb-4">Votes</h1>
    <ValidationVotes {problem} />

    <h1 class="mx-8 mb-4">Contribution Requests</h1>
    <ContributionRequests {problem} />

    <!-- 

  <h1 class="mx-8 mb-4">Users Will Pay</h1>
  <div class="p-6 mx-8 mb-4 border bg-white">
    <PriceChart {problem} />
  </div> -->

    <h1 class="mx-8 mb-4">Comments</h1>
    <div class="bg-white border mx-8 mb-4 p-4">
      {#if problem.comments.length > 0}
        {#each problem.comments as comment}
          <CommentView {comment} readOnly={true} />
        {/each}
      {:else}
        No Comments Yet
      {/if}
    </div>
  </div>
{/if}
