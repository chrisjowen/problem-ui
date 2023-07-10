<script lang="ts">
  import Gravitar from "$lib/components/shared/Gravitar.svelte";
  import Editor from "$lib/components/shared/editor/Editor.svelte";
  import type { ContributionRequest, Problem } from "$lib/types";
  import { fromNow } from "$lib/util/datetimeUtil";
  import { Button, Label, Modal } from "flowbite-svelte";
  export let problem: Problem;
  let showMessage = false;

  let selected: ContributionRequest;
  let showRequest = (request: ContributionRequest) => () => {
    selected = request;
    showMessage = true;
  };
</script>

{#if selected}
  <Modal bind:open={showMessage} title="Contribution Request">
    <div class="flex">
      <Gravitar user={selected.user} className="rounded-md mr-4 my-1" />
      <div>
        <p class="text-sm">{selected.user?.name} {selected.user?.last_name}</p>
        <p class="text-xs">@{selected.user?.username}</p>
      </div>
    </div>

    <div>
      <Label class="mb-4">Capacity:</Label>
      <p class="mb-4">{selected.capacity}</p>
      <Label class="mb-4">Message:</Label>
      <div class=" bg-gray-50 p-4">
        <p>{@html selected.message}</p>
      </div>
    </div>
    <div slot="footer" class="w-full">
      <div class="flex justify-end flex-row">
        <Button size="xs">
          <i class="fas fa-comment mr-2" />
          Message User</Button
        >
      </div>
    </div>
  </Modal>
{/if}

<div class="bg-white mx-8 mb-4 border prose max-w-none">
  {#if problem.contribution_requests.length > 0}
    <table>
      <tr class="bg-gray-100 border-b-[1px]">
        <th class="border-r-[1px] px-4">From</th>
        <th class="border-r-[1px] px-4">Capactity</th>
        <th class="px-4">Message</th>
      </tr>
      {#each problem.contribution_requests as request}
        <tr
          class="border-b-[1px] hover:bg-primary-100"
          on:click={showRequest(request)}
        >
          <td class="flex items-center px-4 border-r-[1px] py-1">
            <Gravitar user={request.user} className="rounded-md mr-4 my-1" />
            <span class="text-xs hidden md:inline">
              @{request.user?.username}</span
            >
          </td>
          <td class="border-r-[1px] px-4">
            {request.capacity}
          </td>
          <td class="px-4 text-xs">
            <i class="fas fa-comment mr-2" />
            View Message
          </td>
        </tr>
      {/each}
    </table>
  {:else}
    <div class="p-4">No Contribution Requests Yet</div>
  {/if}
</div>
