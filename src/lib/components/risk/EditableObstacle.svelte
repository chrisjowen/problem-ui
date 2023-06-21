<script lang="ts">
  import { Button, Input } from "flowbite-svelte";
  import AiHelper from "../shared/AiHelper.svelte";
  import Editor from "../shared/editor/Editor.svelte";
  import { createEventDispatcher } from "svelte";
  import ObstacleStepsEditor from "./ObstacleStepsEditor.svelte";
  import TagList from "../shared/TagList.svelte";

  export let obstacle = {
    title: "New Obstacle",
    description: "Description",
    steps: [],
    hints: [],
    tags: [],
  };

  let dispatch = createEventDispatcher();
  function onSave(): void {
    dispatch("save", obstacle);
  }
</script>

<div class="flex w-full">
  <div class="h-full flex flex-col border-x-[1px] border-b-[1px] flex-1">
    <div class="p-4 bg-white border-b-[1px]">
      <h1 class="mb-2">Title</h1>
      <Input type="text" bind:value={obstacle.title} />
    </div>
    <div class="p-4 bg-white border-b-[1px]">
      <h1 class="mb-2">Tags</h1>
      <TagList bind:tags={obstacle.tags} />
    </div>
    <div class="bg-white border-b-[1px] overflow-auto flex-1">
        <Editor bind:html={obstacle.description} showFullscreen={false} />
    </div>
    <div class="p-4 bg-white overflow-auto max-h-[200px]">
      <h1 class="mb-2">Steps To Resolve</h1>
      <ObstacleStepsEditor bind:steps={obstacle.steps} />
    </div>
    <div class="p-2 bg-gray-50 border-t-[1px] z-30 flex justify-end">
      <Button size="xs" on:click={onSave}>
        <i class="fas fa-save mr-2" />
        Save
      </Button>
    </div>
  </div>
  <div class="border-l-[1px]">
    <div class="flex flex-col h-full">
      <AiHelper>
        <h3>I'm Here To Help</h3>
        <div class="">
          <Input type="text" placeholder="Ask me anything" />
        </div>
      </AiHelper>
    </div>
  </div>
</div>
