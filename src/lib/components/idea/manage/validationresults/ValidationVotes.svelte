<script lang="ts">
  import Gravitar from "$lib/components/shared/Gravitar.svelte";
  import type { Problem } from "$lib/types";
  import { fromNow } from "$lib/util/datetimeUtil";
  export let problem: Problem;
</script>

<div class="bg-white  border prose max-w-none ">
  {#if problem.votes.length > 0}
    <table>
      <tr class="bg-gray-100 border-b-[1px]">
        <th class="border-r-[1px] px-4">Voter</th>
        <th class="border-r-[1px] px-4">Vote</th>
        <th class="px-4">Comments</th>
      </tr>
      {#each problem.votes as vote}
        <tr class="border-b-[1px] hover:bg-primary-100">
          <td class="flex items-center px-4 border-r-[1px] py-1">
            <Gravitar user={vote.user} className="rounded-md mr-4 my-1" />
            <span class="text-xs hidden md:inline"> @{vote.user?.username}</span>
          </td>
          <td class="border-r-[1px] px-4">
            {#if vote.liked}
              <i class="fas fa-thumbs-up mr-2 text-green-500" />
              <span class="hidden md:inline">Loved It</span>
            {:else}
              <i class="fas fa-thumbs-down mr-2 text-red-500" />
              <span class="hidden md:inline">Hated It</span>
            {/if}
          </td>
          <td class="px-4">
            {fromNow(vote.inserted_at)}
          </td>
        </tr>
      {/each}
    </table>
  {:else}
  <div class="p-4">
    No Votes Yet
  </div>
  {/if}
</div>
