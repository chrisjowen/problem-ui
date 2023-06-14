<script lang="ts">
  import Gravitar from "$lib/components/shared/Gravitars.svelte";
  import Editor from "$lib/components/shared/editor/Editor.svelte";
  import { Button } from "flowbite-svelte";
  import { createEventDispatcher } from "svelte";

  export let title: null | String = null;
  export let input: String;
  export let owner: null | any = null;
  export let editable = false;
  export let height = "full";

  const dispatch = createEventDispatcher();

  let editing = false;
  let fullscreen = true;
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

  $: mainClass =
    editing && fullscreen
      ? "absolute top-0 bottom-0 bg-white right-0 left-0 bg-white flex flex-col z-50 "
      : "flex flex-col  ";
</script>

<div class={mainClass}>
  <div class="flex text-xs pt-5 pb-3 px-7">
    <div class="flex-1 flex">
      {#if owner}
        <div class="rounded flex-shrink-0">
          <div class="m-auto w-full mt-1">
            <Gravitar email={owner.email} size="sm" className="rounded-md" />
          </div>
        </div>
        <div class="px-4">
          <p class="font-bold text-gray-600 md:text-lg text-sm">
            {owner.name}
            {owner.last_name}
            {#if title}
              {title}
            {/if}
            <span
              class="text-xs ml-2 bg-white text-primary-500 rounded inline-block hidden"
            >
              <i class="fa fa-plus" />
              Follow
            </span>
          </p>
          <p class="text-xs text-gray-500 font-bold mb-1">
            <span class="mr-1 mb-1 text-xs"
              >Problem Solver | Design Thinker | Experience Creator | Author of
              the
            </span>
          </p>
          <!-- <p class="text-xs text-gray-400">Last Updated: Today at 1:42 pm</p> -->
        </div>
      {:else if title}
        <h1 class="text-2xl">{title}</h1>
      {/if}
    </div>

    {#if editable}
      <div>
        {#if !editing}
          <Button size="xs" color="light" on:click={() => (editing = true)}>
            <i class="fa-solid fa-edit" />
          </Button>
        {:else}
          <Button size="xs" color="light" on:click={onDiscard} class="mr-2 ">
            <i class="fa-solid fa-times-circle mr-2" />
            Discard
          </Button>
          <Button size="xs" on:click={onSave}>
            <i class="fa-solid fa-check-circle mr-2" />
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
    <div class="flex-1 overflow-auto flex">
      <div class="relative flex-1">
        <Editor bind:html={input} bind:fullscreen bind:height={height}>
          <slot {editing} />
        </Editor>
      </div>

    
    
    </div>
  {:else}
    <div
      class="px-8 py-4 prose prose-td:p-4 prose-zinc prose-h1:text-gray-600 prose-h2:text-gray-500 prose-h2:mt-0 prose-md max-w-none editor relative"
      on:click={() => (editable ? editing = true : null)}
    >
      {@html input}
    </div>
  {/if}
</div>
