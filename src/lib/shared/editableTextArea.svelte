<script lang="ts">
  import Gravitar from "$lib/components/shared/gravitar.svelte";
  import Editor from "$lib/shared/editor/editor.svelte";
  import { Button } from "flowbite-svelte";
  import { createEventDispatcher } from "svelte";

  export let input: String;
  export let owner: null | any = null;
  export let editable = false;

  const dispatch = createEventDispatcher();

  let editing = false;
  let fullscreen = false;
  let original = `${input}`;

  // $: {
  //   $overflow = !editing;
  // }

  let onDiscard = () => {
    editing = false;
    fullscreen = false;
    input = original;
  };
  let onSave = () => {
    editing = false;
    fullscreen = false;
    dispatch("save", input);
  };

  $: className = editing
    ? "absolute top-0 bottom-0 bg-white right-0 left-0 bg-white flex flex-col z-50"
    : "flex flex-col";
</script>

<div class={className}>
  <div class="flex text-xs bg-gray-100 text-gray-600 border-b-[1px]">
    {#if owner}
      <div class="p-3 flex-1 flex">
        <div>
          <Gravitar email={owner.email} size="md" />
        </div>
        <div class="px-3 py-1">
          <p class="font-bold text-md">{owner.name} {owner.last_name}</p>
          <p>Last Updated: Today at 1:42 pm</p>
        </div>
      </div>
    {/if}
    {#if editable}
      <div class="p-3">
        {#if !editing}
          <Button size="xs" color="light" on:click={() => (editing = true)}>
            <i class="fa-solid fa-edit" />
          </Button>
        {:else}
          <Button size="xs" color="red" on:click={onDiscard} class="mr-2">
            <i class="fa-solid fa-edit mr-2" />
            Discard Changes
          </Button>
          <Button size="xs" color="primary" on:click={onSave}>
            <i class="fa-solid fa-edit mr-2" />
            Save
          </Button>
        {/if}
      </div>
    {/if}
  </div>
  {#if !editing}
    <slot />
  {/if}
  {#if editing}
    <div class="flex-1 overflow-auto">
      <Editor bind:html={input} bind:fullscreen>
        <slot {editing} />
      </Editor>
    </div>
  {:else}
    <div class="p-4 user-content">
      {@html input}
    </div>
  {/if}
</div>
