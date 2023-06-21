<script lang="ts">
  import HighlightCommands from "./commands/HighlightCommands.svelte";
  import TableCommands from "./commands/TableCommands.svelte";
import PictureUploadComand from "./commands/pictureUploadComand.svelte";
  import type { Editor } from "@tiptap/core";
  let element: HTMLDivElement;
  export let editor: Editor;
  export let fullscreen: boolean;
  export let selection: any;
  export let showFullscreen = true;


  let toggleList = () => {
    editor.chain().focus().toggleBulletList().run();
  };

  let toggleTaskList = () => {
    editor.chain().focus().toggleTaskList().run();
  };
  let toggleNumbers = () => {
    editor.chain().focus().toggleOrderedList().run();
  };
  let toggleQuote = () => {
    editor.chain().focus().toggleBlockquote().run();
  };
  let toggleCode = () => {
    editor.chain().focus().toggleCodeBlock().run();
  };

  $: path = selection?.$head?.path
    ?.map((p: any) => p?.type?.name)
    .filter((p) => p);
  $: showTableOptions = path?.indexOf("table") > -1;
</script>

{#if editor}
  <div class="flex flex-row p-1 border-b-[1px] {fullscreen ? 'z-50' : 'z-40'}">
    <button
      class="text-xs p-1 w-[40px] hover:bg-gray-50"
      on:click={() => editor.chain().focus().setParagraph().run()}
    >
      <i class="fa fa-p" />
    </button>
    <button
      class="text-xs w-[40px] border-l-[1px] hover:bg-gray-50"
      on:click={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
    >
      <i class="fa fa-heading" /><span>1</span>
    </button>
    <button
      class="text-xs w-[40px] hover:bg-gray-50"
      on:click={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
    >
      <i class="fa fa-heading" /><span>2</span>
    </button>
    <button
      class="text-xs w-[40px] hover:bg-gray-50"
      on:click={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
    >
      <i class="fa fa-heading" /><span>3</span>
    </button>
    <HighlightCommands {editor}/>
  

    <TableCommands {editor} bind:editing={showTableOptions} />


    <button
      class="text-xs w-[40px] hover:bg-gray-50"
      on:click={() => editor.chain().focus().setTextAlign("left").run()}
    >
      <i class="fa fa-align-left" />
    </button>

    <button
      class="text-xs w-[40px] hover:bg-gray-50"
      on:click={() => editor.chain().focus().setTextAlign("center").run()}
    >
      <i class="fa fa-align-center" />
    </button>
    <button
      class="text-xs w-[40px] hover:bg-gray-50 border-r-[1px]"
      on:click={() => editor.commands.setTextAlign("right")}
    >
      <i class="fa fa-align-right" />
    </button>

    <PictureUploadComand {editor} let:buttonClicked>
      <button
        class="text-xs w-[40px] hover:bg-gray-50"
        on:click={buttonClicked}
      >
        <i class="fas fa-image" />
      </button>
    </PictureUploadComand>
    <button
      class="text-xs w-[40px] border-l-[1px] hover:bg-gray-50"
      on:click={toggleList}
    >
      <i class="fa fa-list" />
    </button>
    <button
      class="text-xs w-[40px] border-l-[1px] hover:bg-gray-50"
      on:click={toggleTaskList}
    >
      <i class="fa-solid fa-list-check"></i>
    </button>

    <button
      class="text-xs w-[40px] border-r-[1px] hover:bg-gray-50"
      on:click={toggleNumbers}
    >
      <i class="fa fa-thin fa-list-ol" />
    </button>
    <button
      class="text-xs w-[40px] border-r-[1px] hover:bg-gray-50"
      on:click={toggleQuote}
    >
      ""
    </button>
    <button
      class="text-xs w-[40px] border-r-[1px] hover:bg-gray-50"
      on:click={toggleCode}
    >
      <i class="fa-solid fa-code" />
    </button>


    {#if showFullscreen}
      <div class="flex-1 flex flex-row justify-end">
        <button
          class="text-xs w-[40px] hover:bg-gray-50"
          on:click={() => (fullscreen = !fullscreen)}
        >
          {#if !fullscreen}
            <i class="fa-solid fa-up-right-and-down-left-from-center" />
          {:else}
            <i class="fa-solid fa-down-left-and-up-right-to-center" />
          {/if}
        </button>
      </div>
    {/if}
  </div>
{/if}
