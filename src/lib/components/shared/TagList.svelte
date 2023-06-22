<script lang="ts">
  let tag = "";
  export let tags: string[] = [];
  import { Button, Input } from "flowbite-svelte";
  export let editable = true;

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
</script>

{#if editable}
  <div class="flex mb-2 inline">
    <div class="flex-1">
      <Input type="text" bind:value={tag} size="sm" on:keydown={onKeyDown} />
    </div>
    <div class="flex items-center">
      <Button on:click={saveTag} size="xs" color="light" class="ml-2">
        <i class="fas fa-tag mr-2" /> Tag
      </Button>
    </div>
  </div>
{/if}
<div>
  {#if tags}
    {#each tags as tag, idx}
      <div class="text-gray-600 text-xs mr-1 border inline-block mr-2">
        <div class="flex items-center">
          <span class="py-1 mx-2"><i class="fas fa-tag mr-2" /> {tag}</span>
          {#if editable}
            <button
              class="border-l-[1px] hover:bg-red-500 p-2 group rounded-r-lg"
              on:click={removeAtIdx(idx)}
            >
              <i class="fas fa-trash group-hover:text-white" />
            </button>
          {/if}
        </div>
      </div>
    {/each}
  {/if}
</div>
