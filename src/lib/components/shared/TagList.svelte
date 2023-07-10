<script lang="ts">
	import { createEventDispatcher } from 'svelte';
  let dispatch = createEventDispatcher();
  let tag = "";
  export let tags: string[] = [];
  import { Input } from "flowbite-svelte";
  export let editable = true;
  export let clickable = false;
  export let icon = "fas fa-tag";

  export let selected: string[] = [];


  function onKeyDown(e: KeyboardEvent): void {
    if (e.code == "Enter") {
      saveTag();
    }
  }

  function saveTag(): void {
    if (tag == "") return;
    tags = [...tags, tag];
    tag = "";
  }
  let removeAtIdx = (idx: number) => () => {
    let tmp = [...tags];
    tmp.splice(idx, 1);
    tags = tmp;
  };

  let onTagClicked = (tag: string) => () => {
    if (clickable) {
      dispatch("click", tag);
    }
  };
</script>

{#if editable}
  <Input type="text" bind:value={tag} on:keydown={onKeyDown} size="lg">
    <button slot="right" on:click={saveTag} color="light">
      <i class="fas fa-plus mr-2 " />
    </button>
  </Input>
{/if}
<div class="pt-2">
  {#if tags}
    {#each tags as tag, idx}
      <button
        class="text-gray-600  text-xs mr-1 border inline-block mr-2 {clickable
          ? 'hover:bg-primary-100 hover:text-gray-600'
          : ''}
          
          {selected.includes(tag)
            ? 'bg-primary-400 text-white '
            : 'bg-white'}
          "
        on:click={onTagClicked(tag)}
      >
        <div class="flex items-center">
          <span class="py-1 mx-2"
            ><i class="{icon} mr-2" /> {tag.toLowerCase()}</span
          >
          {#if editable}
            <button
              class="border-l-[1px] hover:bg-red-500 p-2 group "
              on:click={removeAtIdx(idx)}
            >
              <i class="fas fa-trash group-hover:text-white" />
            </button>
          {/if}
        </div>
      </button>
    {/each}
  {/if}
</div>
