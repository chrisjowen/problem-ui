<script lang="ts">
  import { Button, Input } from "flowbite-svelte";

  export let items: string[] = [];
  export let validating: boolean = false;
  export let icon = "fa-brands fa-trello "

  let deleteItem = (idx: number) => () => {
    let temp = [...items];
    temp.splice(idx, 1);
    items = temp;
  };

  let addItem = () => {
    items = [...items, ""];
  };
</script>

{#each items as item, idx}
  <div class="flex items-center">
    <div class="flex-1 mb-2 flex ">
      <i class="{icon} mr-2 text-3xl" />
      <Input
        bind:value={item}
        class={validating && item.length == 0 ? "!border-red-400" : ""}
      >
        <button
          slot="right"
          class="p-2 hover:text-red-500"
          on:click={deleteItem(idx)}
        >
          <i class="fas fa-close" />
        </button>
      </Input>
    </div>
  </div>
{/each}
<div class="flex w-full justify-end">
  <Button size="xs" color="light" on:click={addItem}>
    Add Item<i class="fas fa-add ml-2" />
  </Button>
</div>
