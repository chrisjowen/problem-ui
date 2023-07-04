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
  import TagList from '../shared/TagList.svelte';
  import UserList from '../user/UserList.svelte';
  import _ from 'lodash';
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

  $: contributers = _.uniqBy(discussion?.answers.map((a) => a.user).concat(discussion?.user) || [], "id");
</script>
{#if discussion}

<div  class="block lg:flex">
  <div class="flex-1 xl:min-w-[1000px] max-w-[1000px] md:m-4">
      <div class="border bg-white mb-2 md:mb-4 pb-4">
        <DiscussionView  {discussion} />
      </div>
      {#if discussion.answers.length > 0}
      <h1 class="text-lg mb-4 mt-4  font-bold ml-2 md:ml-0">Responses</h1>
      {/if}
      {#each discussion.answers as answer}
        <section id="answer-{answer.id}" class="bg-white border-t-[1px] border-x-[1px]">
          <EditableAnswer {answer} on:update={onUpdateAnswer(answer)} />
        </section>
      {/each}
      {#if $auth?.loggedInUser}
      <h1 class="text-sm md:text-lg mb-4 mt-4 font-bold ml-2 md:ml-0">Your Reponse</h1>

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
  </div>
  <div class="hidden 2xl:block flex-1 m-4 space-y-4">
    <h1>Tags</h1>
    <TagList tags={discussion.tags} editable={false}  />

    <h1>Contributers</h1>
    <div class="border bg-white p-4">
      <UserList users={contributers} editable={false}  />
    </div>
  </div>
</div>

<!-- <div class="flex">



</div> -->
{/if}
