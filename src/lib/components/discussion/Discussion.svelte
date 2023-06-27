<script lang="ts">
	import { auth } from '$lib/store';
  import { onMount } from "svelte";
  import api from "$lib/api";
  import type { Discussion } from "$lib/types";
  import DiscussionView from "$lib/components/discussion/DiscussionView.svelte";
  import { page } from "$app/stores";
  import Editor from "$lib/components/shared/editor/Editor.svelte";
  import { Button } from "flowbite-svelte";
  import EditableAnswer from '$lib/components/discussion/EditableAnswer.svelte';
  let refreshEditor: any;
  let discussion: Discussion;
  let answer = "";


  export let discussionId = $page.params.discussionId;


  onMount(() => {
    loadDiscussion();
  });

  async function loadDiscussion() {
    answer = "";
    if(refreshEditor) {
      refreshEditor();
    }
    const response = await api.discussion.get(discussionId, [
      "user",
      "answers",
      "answers.user",
    ]);
    discussion = response.data;
  }

  async function onCreateAnswer() {
    await api.discussion.answer(discussionId).create({ answer });
    loadDiscussion();
  }

  let onUpdateAnswer = (ans: any) => async (event: CustomEvent<any>) => {
    let answer = event.detail;
    await api.discussion.answer(discussionId).update(answer.id, answer);
    loadDiscussion()
  }
</script>

  <div class="max-w-[1000px] m-4">
    {#if discussion}
      <div class="border bg-white md:mb-4 pb-4">
        <DiscussionView  {discussion} />
      </div>
      {#if discussion.answers.length > 0}
      <h1 class="text-lg mb-4  font-bold hidden md:block">Responses</h1>
      {/if}
      {#each discussion.answers as answer}
        <section id="answer-{answer.id}" class="bg-white border-t-[1px] border-x-[1px]">
          <EditableAnswer {answer} on:update={onUpdateAnswer(answer)} {problem} />
        </section>
      {/each}
      {#if $auth?.loggedInUser}
      <h1 class="text-sm md:text-lg mb-4 mt-4 font-bold">Your Reponse</h1>

      <section id="your-answer" class="bg-gray-50 md:p-4 p-3 border mt-4">
        <div class="border bg-white   h-[400px] ">
          <Editor bind:html={answer}   />
        </div>
        <div class="flex justify-end mt-4 z-30 relative">
          <Button size="xs" class="bg-primary-400" on:click={onCreateAnswer}>
            <i class="fas fa-play mr-2" />
            Post Answer
          </Button>
        </div>
      </section>
      {/if}
    {/if}
  </div>
