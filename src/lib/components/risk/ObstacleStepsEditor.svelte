<script lang="ts">
  import { Button, Input } from "flowbite-svelte";
  export let steps: string[] = [];
  let next = "";

  function onKeyDown(e: KeyboardEvent): void {
    if (e.code == "Enter") {
      addStep();
    }
  }

  let removeAtIdx = (idx: number) => () => {
    let tmp = [...steps];
    tmp.splice(idx, 1);
    steps = tmp;
  };

  let addStep = () => {
    steps = [...steps, next];
    next = "";
  };
</script>

<div>
  <ul>
    {#each steps as step, idx}
      <li class="flex mb-2">
        <div class="flex-1">
          <Input type="text" size="sm" bind:value={step} />
        </div>
        <div class="flex items-center">
          <button on:click={removeAtIdx(idx)} class="px-4">
            <i class="fas fa-trash" />
          </button>
        </div>
      </li>
    {/each}
    <li class="flex">
      <div class="flex-1">
        <Input type="text" bind:value={next} size="sm" on:keydown={onKeyDown} />
      </div>
      <div class="flex items-center">
        <div>
          <Button on:click={addStep} size="xs" color="light" class="px-4 ml-2">
            <i class="fas fa-add mr-2" /> Step
          </Button>
        </div>
      </div>
    </li>
  </ul>
</div>
