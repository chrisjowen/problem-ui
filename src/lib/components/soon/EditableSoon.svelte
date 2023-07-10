<script lang="ts">
  import {
    Button,
    Input,
    Label,
  } from "flowbite-svelte";
  import Editor from "../shared/editor/Editor.svelte";
  import { createEventDispatcher } from "svelte";
  
  export let entity: any;

  let dispatch = createEventDispatcher();
  function onSave(): void {
    dispatch("save", entity);
  }
</script>

<div class="h-full md:flex">
  <div class="h-full flex flex-col border-x-[1px] border-b-[1px] flex-1">
    <div class="p-2 bg-white border-b-[1px]">
      <Input type="text" class="text-xl" bind:value={entity.title} />
    </div>

    <div class=" bg-white flex-1 overflow-auto">
      <Editor bind:html={entity.content} height="full" showFullscreen={false} />
    </div>

    <div class="p-2 bg-gray-50 border-t-[1px] z-30 flex justify-end">
      <Button size="xs" on:click={onSave}>
        <i class="fas fa-save mr-2" />
        Save
      </Button>
    </div>
  </div>
  <div class="border-l-[1px] min-w-[500px]">
    <div class="m-6">
      <Label class="block mb-2">Icon</Label>
      <Input type="text" class="text-xl" bind:value={entity.icon} />
    </div>
  </div>
</div>
