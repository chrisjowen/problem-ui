<script lang="ts">
  import api from "$lib/api";
  import { auth } from "$lib/store";
  import type { Discussion } from "$lib/types";
  import EditableTextArea from "../EditableTextArea.svelte";
  export let discussion: any;



  function onUpdateDiscussion(e: CustomEvent<Discussion>): void {
    let question = e.detail;
    api.discussion.update(discussion.id, {question}).then((res) => {
      // discussion = res.data;
    });
  }
</script>

<div class="p-4 px-4 flex bg-gray-50  border-b-[1px] ">
  <h2 class="md:text-xl text-sm text-primary-600 font-bold">
    <i class="fas fa-question-circle text-primary-500 mr-3" />
    {discussion.title}
  </h2>
</div>

<EditableTextArea
  bind:input={discussion.question}
  on:save={onUpdateDiscussion}
  owner={discussion.user}
  editable={$auth?.loggedInUser?.id == discussion?.user?.id}
  let:editing
>

</EditableTextArea>
