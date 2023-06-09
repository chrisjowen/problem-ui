<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { Editor } from "@tiptap/core";
  import StarterKit from "@tiptap/starter-kit";
  import { createEventDispatcher } from "svelte";
  import { blur } from "svelte/transition";
  import Table from "@tiptap/extension-table";
  import TableRow from "@tiptap/extension-table-row";
  import TableCell from "@tiptap/extension-table-cell";
  import TableHeader from "@tiptap/extension-table-header";
  import Image from "@tiptap/extension-image";
  import TopMenu from "./TopMenu.svelte";
  import FloatingTextMenu from "./FloatingTextMenu.svelte";
  import FloatingImageMenu from "./FloatingImageMenu.svelte";
  export let showFullscreen = true;
  export let fullscreen = false;
  export let height = "full";
  export let html = `<h2>Who </h2><p>Software developers and other makers who have recently retrenched, as well as innovators in their respective industry who lack the technical skills to create solutions.  </p><h2>What </h2><p>Dunno </p><h2>Why </h2><p>Nonsense </p><h2>When </h2><p>The problem is currently ongoing and is increasingly becoming more difficult. </p><h2>Where </h2><p>This problem impacts businesses worldwide.</p>`;
  const dispatch = createEventDispatcher();
  
  Table.configure({
    resizable: true,
    HTMLAttributes: {
      class: "w-full text-sm text-left text-gray-500 dark:text-gray-400 border",
    },
  });
  TableCell.configure({
    HTMLAttributes: {
      class: "border p-4 bg-red-50",
    },
  });
  
  let element: HTMLDivElement;
  let editor: Editor;
  let overlayTop = 0;
  let overlayLeft = 0;
  let selection: any;
  let selectedNode = "";
  
  $: {
    if (selection) {
      selectedNode = selection.node;
    } else {
      selectedNode = "";
    }
  }

  $: className =  fullscreen
    ? "absolute top-0 bottom-0 bg-white right-0 left-0 bg-white flex flex-col z-50 "
    : `flex flex-col  h-[${height}] relative `;

  onMount(() => {
    dispatch("change", html);
    editor = new Editor({
      element: element,
      extensions: [StarterKit, Table, TableRow, TableCell, TableHeader, Image],
      content: html,
      onTransaction: () => {
        editor = editor;
      },
      onUpdate: ({ editor }) => {
        html = editor.getHTML();
        dispatch("change", html);
      },
      onSelectionUpdate: ({ editor }) => {
        let box = element.getBoundingClientRect();
        let parentTop = box.top + element.scrollTop;
        let parentLeft = box.left + element.scrollLeft;

        const { to, from } = editor.state.selection;
        if (from !== to ) {
          // debugger
          selection = editor.state.selection;
          overlayTop = editor.view.coordsAtPos(from).top - parentTop - 25 ;
          overlayLeft =  editor.view.coordsAtPos(from).left - parentLeft;
        } else {
          selection = null;
        }
      },
    });
  });
  onDestroy(() => {
    if (editor) {
      editor.destroy();
    }
  });

  export let refreshEditor = () => {
    editor.commands.clearContent();
  }
</script>

<div class="{className}">
  <TopMenu {editor} bind:fullscreen  bind:showFullscreen={showFullscreen}/>
  <div class="flex-1 overflow-y-auto ">
    <slot {editing} />
    <div class="px-8 py-4 prose  prose-zinc prose-h1:text-gray-600 prose-h2:text-gray-500  prose-h2:mt-0 prose-md max-w-none editor relative">
      <div class="h-full w-full" bind:this={element} />
      {#if editor && selection}
        <div
          transition:blur
          class="absolute z-10"
          style="top:{overlayTop}px; left:{overlayLeft}px;  "
        >
       
          {#if selectedNode == "image"}
            <FloatingImageMenu {editor} {element} />
          {:else if selectedNode != "image"}
            <FloatingTextMenu {editor} {element} />
          {/if}
        </div>
      {/if}
    </div>
  </div>
</div>

<style lang="scss">
  .editor {
    :global(div) {
      overflow: auto;
      &:focus-visible {
        outline: 0;
      }
    }
  }

</style>
