<script lang="ts">
  import type { Page } from "$lib/types/index";
  import { Button, Input } from "flowbite-svelte";
  import AiHelper from "../shared/AiHelper.svelte";
  import Editor from "../shared/editor/Editor.svelte";
  import { createEventDispatcher } from "svelte";

  export let page: Page;

  let dispatch = createEventDispatcher();
  function onSavePage(): void {
    dispatch("save", page);
  }
</script>

<div
  class="absolute top-0 bottom-0 bg-white right-0 left-0 bg-white flex flex-col z-40"
>
  <div class="h-full flex flex-col border-x-[1px] border-b-[1px] flex-1">
    <div class="p-2 bg-white border-b-[1px]">
      <Input type="text" class="text-xl" bind:value={page.title} />
    </div>

    <div class=" bg-white flex-1 overflow-auto">
      <Editor bind:html={page.body} height="full" showFullscreen={false} />
    </div>

    <div class="p-2 bg-gray-50 border-t-[1px] z-30 flex justify-end">
      <Button size="xs" on:click={onSavePage}>
        <i class="fas fa-save mr-2" />
        Save
      </Button>
    </div>
  </div>
  <div class="border-l-[1px] hidden">
    <div class="flex flex-col justify-end h-full w-[600px]">
      <AiHelper>
        <h3>I'm Here To Help</h3>
        <div class="">
          <Input type="text" placeholder="Ask me anything" />
        </div>
      </AiHelper>
    </div>
  </div>
</div>
