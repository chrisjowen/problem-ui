<script lang="ts">
  import type { Page } from "$lib/types/index";
  import { Button, Input } from "flowbite-svelte";
  import AiHelper from "../shared/AiHelper.svelte";
  import Editor from "../shared/editor/Editor.svelte";
  import { createEventDispatcher } from "svelte";

  export let page: Page;

  let dispatch = createEventDispatcher();

  function onSavePage(): void {
    dispatch("save", page)
  }
</script>

<div class="h-full flex flex-col bg-white flex-1">
  <div class="p-2 bg-gray-100 border-b-[1px]">
    <Input type="text" class="text-xl" bind:value={page.title} />
  </div>

  <div class=" bg-white flex-1 overflow-auto">
    <Editor bind:html={page.body} height="full" showFullscreen={false} />
  </div>

  <div class="p-2 bg-gray-50 border-t-[1px] z-30 flex justify-end">
    <Button  size="xs" on:click={onSavePage}>
        <i class="fas fa-save mr-2"></i>
        Save </Button>
  </div>
</div>
<div class="hidden w-[400px]  border-l-[1px] ">
    <div class="flex flex-col justify-end h-full" >
        <AiHelper>
            <h3>I'm Here To Help</h3>
           <div class="">
                <Input type="text" placeholder="Ask me anything" />
           </div>

        </AiHelper>
    </div>


</div>
