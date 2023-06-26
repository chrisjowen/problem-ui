<script lang="ts">
  import { Button, Input } from "flowbite-svelte";
  import { createEventDispatcher } from "svelte";
  import ObstacleStepsEditor from "./ObstacleStepsEditor.svelte";
  
  export let obstacle = {
    description: "",
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
  <div class="h-full flex flex-col border-x-[1px] border-b-[1px] flex-1 ">
    <div class="p-4 bg-white border-b-[1px]">
      <h1 class="mb-2">Risk</h1>
      <Input type="text" bind:value={obstacle.description} />
    </div>
    <!-- <div class="p-4 bg-white border-b-[1px]">
      <h1 class="mb-2">Tags</h1>
      <TagList bind:tags={obstacle.tags} />
    </div> -->

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
     
    </div>
  </div>
</div>
