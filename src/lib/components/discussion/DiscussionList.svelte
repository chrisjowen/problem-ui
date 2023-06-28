<script lang="ts">
  import type { Discussion, PaginationResults } from "$lib/types";
  import DiscussionForm from "$lib/components/discussion/DiscussionForm.svelte";
  import { Button, Modal } from "flowbite-svelte";
  import { createEventDispatcher } from "svelte";
  import Gravitar from "$lib/components/shared/Gravitar.svelte";
  import { auth } from "$lib/store";
  import { goto } from "$app/navigation";
  import TagList from "../shared/TagList.svelte";

  let dispatch = createEventDispatcher();
  let showModal = false;

  export let discussions: PaginationResults<any>;
  export let editable = false;
  export let baseUrl = "";

  function showCreateDiscussion() {
    if (!$auth.loggedInUser) {
      goto("/login");
    } else {
      goto(`${baseUrl}/discussion/create`);
    }
  }

  async function onCreateDiscussion(event: any) {
    let item = event.detail;
    dispatch("create", item);
    showModal = false;
  }

  let onClick = (discussion: Discussion) => (event: any) =>
    dispatch("click", discussion);
</script>

<div>
  <Modal
    bind:open={showModal}
    title="Start Discussion"
    size="full"
    class="w-[80%] "
  >
    <DiscussionForm on:submit={onCreateDiscussion} />
  </Modal>

  <div class="flex mb-5">
    <h1 class="flex-1 items-end flex text-xl text-primary-600">Discussions</h1>
    {#if editable}
      <Button size="xs" color="light" on:click={showCreateDiscussion}>
        <i class="fa fa-comment mr-2 text-xs" />
        Create Discussion
      </Button>
    {/if}
  </div>

  {#if discussions}
    {#if discussions.total_entries == 0}
      <div class="bg-white p-4 border rounded-md">No Discussions Started</div>
    {/if}
    {#each discussions.entries as discussion}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div
        class="bg-white hover:drop-shadow-md p-4 border mb-2"
        on:click={onClick(discussion)}
      >
        <div class="flex">
          <div class="pr-2 mt-1">
            <Gravitar
              email={discussion.user.email}
              size="md"
              className="rounded-md"
            />
          </div>
          <div class="flex-1 ml-4">
            <h2 class="text-xl text-gray-800 bold">
              {discussion.title}
            </h2>
            <p class="text-xs text-gray-400">
              {discussion.user.name}
              {discussion.user.last_name}
              - <span class="text-xs text-gray-500 mr-3"> 3 Answers </span>
            </p>

            <p class="text-xs text-gray-400">5 Mins ago</p>

            {#if discussion.tags?.length > 0}
              <div class="pt-4">
                <TagList tags={discussion.tags} editable={false} />
              </div>
            {/if}
          </div>
          <div class="flex justify-center items-center mr-2">
            <i class="fas fa-chevron-right text-gray-500" />
          </div>
        </div>
      </div>
    {/each}

    <div class="text-xs m-2 flex justify-end">
      Showing {(discussions.page_number - 1) *
        discussions.page_size}-{discussions.page_number * discussions.page_size}
      of {discussions.total_entries}
      Discussions
    </div>
  {/if}
</div>
