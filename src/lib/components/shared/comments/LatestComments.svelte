<script lang="ts">
  import { page } from "$app/stores";
  import api from "$lib/api";
  import type { PaginationResults, Comment } from "$lib/types/index";
  import { createEventDispatcher } from "svelte";
  import Gravitar from "../Gravitar.svelte";
  import CommentForm from "./CommentForm.svelte";

  export let pagination: PaginationResults<Comment>;
  export let type = "solution"
  export let id = $page.params.id

  let dispatch = createEventDispatcher();
  
  async function onPostComment(event : any) {
    let result = await api[type].comments(id).create(event.detail)
    dispatch("created", result)
  }
</script>

{#if pagination && pagination.entries}
<div>
    <CommentForm on:post={onPostComment} />
    {#each pagination.entries as comment}
      <div class="mx-4 py-4 flex border-b-[1px]">
        <div>
          <Gravitar
            email={comment.user.email}
            size="xs"
            className="rounded-md"
          />
        </div>
        <div class="px-4 flex-1">
          <p class="text-xs">
            {comment.user.name}
            {comment.user.last_name} -
            <span class="text-xs text-gray-400"> just now </span>
          </p>
          <p class="text-sm py-2">
            {comment.comment.slice(
              0,
              100
            )}{#if comment.comment.length > 100}...{/if}
          </p>

          {#if comment.comment.length > 100}
            <p>
              <span class="text-xs text-primary-300">View More</span>
            </p>
          {/if}

          <p class="text-xs flex justify-end hidden">
            <i class="fa fa-thumbs-up mr-1" />
            Like
          </p>
        </div>
      </div>
    {/each}
  </div>
  <div class="p-4 flex justify-end">
    <p class=" text-xs text-primary-400 ">
       Show All {pagination.total_entries} Comments
    </p>
  </div>
{/if}
