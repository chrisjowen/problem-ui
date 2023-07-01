<script lang="ts">
  import { onMount } from "svelte";

  interface Item {
    value: string;
    name: string;
  }

  export let selected: String[] = [];
  export let items: Item[] = [];
  let showOptions = false;

  onMount(() => {
    selected = selected == null? [] : selected;
  })

  function onKeyPressed(event: KeyboardEvent) {
    if (event.code == "Escape") {
      showOptions = false;
    }
  }

  function toggleShowValues() {
    showOptions = !showOptions;
  }
  let addItem = (item: Item) => () => {
    selected = [...selected, item.value];
  };

  let removeItem = (value: String) => () => {
    selected = selected.filter((i) => i != value);
  };

  $: unSelected = selected && items.filter((i) => !selected.includes(i.value));

</script>

{#if selected}
<div class="relative" on:keydown={onKeyPressed}>
  <section
    data-type="input"
    class="border rounded-lg  flex items-center {showOptions ? "bg-white" : "bg-gray-50"} border-gray-300"
  >
    <button on:click={toggleShowValues} class="flex-1 min-h-[40px] w-full text-left p-2 ">
      {#each selected as item}
        <div class="border inline-block text-xs rounded-lg bg-white mr-2 ">
          <div class="flex">
            <div class="p-2">
              <slot {item}>
                {item}
              </slot>
            </div>
            <button
              class="px-2 hover:bg-red-500 rounded-r-lg "
              on:click={removeItem(item)}
            >
              <i class="fas fa-times" />
            </button>
          </div>
        </div>
      {/each}
    </button>
    <div class="px-4 text-gray-500 text-xs">
      <i class="fas fa-chevron-down cursor-pointer" />
    </div>
  </section>
  {#if showOptions}
    <section
      data-type="selects"
      class="absolute bg-white w-full h-[200px] z-50 overflow-auto border rounded-lg drop-shadow-lg"
      on:mouseleave={toggleShowValues}
    >
      {#each unSelected as item}
        <div>
          <button
            class="p-4 hover:bg-primary-200 w-full text-left"
            on:click={addItem(item)}>{item.name}</button
          >
        </div>
      {/each}
    </section>
  {/if}
</div>
{/if}
