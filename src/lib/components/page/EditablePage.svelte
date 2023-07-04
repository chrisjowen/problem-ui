<script lang="ts">
  import type { Page } from "$lib/types/index";
  import { Button, ButtonGroup, Input, InputAddon, Label } from "flowbite-svelte";
  import AiHelper from "../shared/AiHelper.svelte";
  import Editor from "../shared/editor/Editor.svelte";
  import { createEventDispatcher } from "svelte";
  import TagList from "../shared/TagList.svelte";

  export let page: Page;

  let dispatch = createEventDispatcher();
  function onSavePage(): void {
    dispatch("save", page);
  }
</script>

<div class="h-full md:flex">

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
  <div class="border-l-[1px]  min-w-[500px]">

    <div class="m-6">
      <Label class="block mb-2">Tags</Label>
      <TagList bind:tags={page.tags} />

      <Label class="block mb-2">Slug</Label>
      <Input type="text"  bind:value={page.slug} />




      <Label class="block mb-2">Scope</Label>
      {page.scope || "PAGE"}
    </div>
  </div>

</div>