<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import Gravitar from "$lib/components/shared/Gravitar.svelte";
  import CommentForm from "./CommentForm.svelte";
  import { auth } from "$lib/store";
  export let comment: any = {};
  let viewMore = false;
  let showEditForm = false;
  let dispatch = createEventDispatcher();
  let user = $auth.loggedInUser;

  function toggleViewMore() {
    viewMore = !viewMore;
  }
  function toggleShowEditForm() {
    if (user?.id === comment.user_id) {
      showEditForm = !showEditForm;
    }
  }
  async function onPostComment(event: any) {
    showEditForm = false;
    dispatch("edit", { ...comment, comment: event.detail });
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="mt-2">
  {#if showEditForm}
    <CommentForm on:post={onPostComment} comment={comment.comment} />
  {:else}
    <div class="mx-4 p-2 flex mb-1 bg-gray-50" on:click={toggleShowEditForm}>
      <div>
        <Gravitar
          user={comment.user}
          size="xs"
          className="rounded-md w-[20px] h-[20px]"
        />
      </div>
      <div class="px-4 flex-1">
        <p class="text-xs">
          {comment.user.name}
          {comment.user.last_name} -
          <span class="text-xs text-gray-400"> just now </span>
        </p>
        {#if viewMore}
          <p class="text-sm py-2">{comment.comment}</p>
          {#if comment.comment.length > 100}
            <button on:click={toggleViewMore}>
              <span class="text-xs text-primary-300">View Less</span>
            </button>
          {/if}
        {:else}
          <p class="text-sm py-2">
            {comment.comment.slice(
              0,
              100
            )}{#if comment.comment.length > 100}...{/if}
          </p>
          {#if comment.comment.length > 100}
            <button on:click={toggleViewMore}>
              <span class="text-xs text-primary-300">View More</span>
            </button>
          {/if}
        {/if}
        <p class="text-xs flex justify-end hidden">
          <i class="fa fa-thumbs-up mr-1" />
          Like
        </p>
      </div>
    </div>
  {/if}
</div>
