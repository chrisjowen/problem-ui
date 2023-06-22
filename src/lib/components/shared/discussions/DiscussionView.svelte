<script lang="ts">
  import { goto } from "$app/navigation";
  import api from "$lib/api";
  import type { Discussion } from "$lib/types";
  import { isOwnedByMe } from "$lib/util/authUtil";
  import { Button } from "flowbite-svelte";
  import { editable } from "svelte-tiptap";
  import EntityOverview from "../EntityOverview.svelte";
  import LatestComments from "../comments/LatestComments.svelte";
  import Editor from "../editor/Editor.svelte";
  export let discussion: any;
  export let baseUrl = "";

  function onUpdateDiscussion(e: CustomEvent<Discussion>): void {
    let question = e.detail;
    api.discussion.update(discussion.id, { question }).then((res) => {
      // discussion = res.data;
    });
  }
</script>

<div class="p-4 px-4 flex bg-gray-50 border-b-[1px]">
  <h2 class="md:text-xl text-sm text-primary-600 font-bold">
    <i class="fas fa-question-circle text-primary-500 mr-3" />
    {discussion.title}
  </h2>
</div>

<div class="p-8">
  <div class="flex">
    <div class="flex-1">
      <EntityOverview entity={discussion} />
    </div>
    {#if isOwnedByMe(discussion)}
      <div>
        <Button
          color="light"
          size="xs"
          on:click={() => goto(`${baseUrl}/discussion/${discussion.id}/update`)}
          >Edit</Button
        >
      </div>
    {/if}
  </div>
  <Editor
    bind:html={discussion.question}
    on:save={onUpdateDiscussion}
    editable={false}
    showFullscreen={false}
  />
</div>
<div class="border-t-[1px] m-4 pt-4">
  <h1 class="font-bold text-xs">Comments:</h1>
  <LatestComments type="discussion" id={discussion.id} />
</div>
