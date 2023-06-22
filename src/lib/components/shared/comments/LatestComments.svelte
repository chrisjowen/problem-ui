<script lang="ts">
  import { page } from "$app/stores";
  import baseApi from "$lib/api";
  import type { PaginationResults, Comment } from "$lib/types/index";
  import { createEventDispatcher, onMount } from "svelte";
  import CommentForm from "./CommentForm.svelte";
  import CommentView from "./CommentView.svelte";
  import type { AxiosResponse } from "axios";

  let pagination: PaginationResults<Comment>;
  export let type = "solution";
  export let id: null | string = $page.params.id;
  let api: any = baseApi[type];
  let dispatch = createEventDispatcher();

  onMount(() => {
    loadComments();
  });

  function loadComments() {
    api
      .comments(id)
      .list("", 4, 0, ["user"])
      .then((res: AxiosResponse<PaginationResults<Comment>>) => {
        pagination = res.data;
      });
  }

  async function onPostComment(event: any) {
    let result = await api.comments(id).create({ comment: event.detail });
    dispatch("created", result);
    loadComments();
  }

  async function onEditComment(event: any) {
    let comment = event.detail;
    let result = await api.comments(id).update(comment.id, comment);
    dispatch("created", result);
    loadComments();
  }
</script>

{#if pagination && pagination.entries}
  <div>
    <CommentForm on:post={onPostComment} />
    {#each pagination.entries as comment}
      <CommentView {comment} on:edit={onEditComment} />
    {/each}
  </div>
  <div class="p-4 flex justify-end">
    <p class=" text-xs text-primary-400">
      {pagination.total_entries} Comments
    </p>
  </div>
{/if}
