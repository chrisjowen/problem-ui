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

  $: ratio = statistics && {
    likes:
      (100 / (statistics.likes.length + statistics.dislikes.length)) *
      statistics.likes.length || 0,
    dislikes:
      (100 / (statistics.likes.length + statistics.dislikes.length)) *
      statistics.dislikes.length || 0,
  };
</script>

{#if statistics}
  <div class="my-4">
    <div class="mb-4 space-y-2 w-full text-xl border p-4">
      <div class="flex items-center">
        <div class="mr-2 w-[90px] text-green-500">
            <i class="fas fa-thumbs-up ml-2" /> {ratio.likes}% 
        </div>
        <div class="flex-1 ">
          <div style="width: {ratio.likes}%" class="p-5 bg-green-500 text-white flex items-center">
          </div>
        </div>
      </div>

      <div class="flex items-center">
        <div class="mr-2 w-[90px] text-red-500">
            <i class="fas fa-thumbs-down ml-2" /> {ratio.dislikes}% 
        </div>
        <div class="flex-1 ">
          <div style="width: {ratio.dislikes}%" class="p-5 bg-red-500 text-white flex items-center">
          </div>
        </div>
      
      </div>
    </div>


  </div>

  <div class="mb-4">
    <h1 class="mb-4">Votes</h1>
    <ValidationVotes {problem} />
  </div>

  <h1 class="mb-4">Comments</h1>
  <div class="bg-white border mb-4 p-4">
    {#if problem.comments.length > 0}
      {#each problem.comments as comment}
        <CommentView {comment} readOnly={true} />
      {/each}
    {:else}
      No Comments Yet
    {/if}
  </div>

  <div class="mb-4">
    <h1 class="mb-4">Contribution Requests</h1>
    <ContributionRequests {problem} />
  </div>

  <!-- <h1 class="mb-4">Users Will Pay</h1>
  <div class="p-6 mb-4 border bg-white">
    <PriceChart {problem} />
  </div> -->
{/if}
