<script lang="ts">
  import PictureUploadComand from "./commands/pictureUploadComand.svelte";
  import { onMount, onDestroy } from "svelte";
  import { Editor } from "@tiptap/core";
  import StarterKit from "@tiptap/starter-kit";
  import { createEventDispatcher } from "svelte";
  import { Card, Modal } from "flowbite-svelte";
  import { slide, blur } from "svelte/transition";
  import { Listgroup, ListgroupItem } from "flowbite-svelte";
  import Table from "@tiptap/extension-table";
  import TableRow from "@tiptap/extension-table-row";
  import TableCell from "@tiptap/extension-table-cell";
  import TableHeader from "@tiptap/extension-table-header";
  import Image from "@tiptap/extension-image";
  import axios from "axios";
  import TopMenu from "./topMenu.svelte";
  import FloatingTextMenu from "./floatingTextMenu.svelte";

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

  const dispatch = createEventDispatcher();

  let element: HTMLDivElement;
  let editor: Editor;
  export let fullscreen = false;

  export let html = `<h2>Who </h2><p>Software developers and other makers who have recently retrenched, as well as innovators in their respective industry who lack the technical skills to create solutions.  </p><h2>What </h2><p>Dunno </p><h2>Why </h2><p>Nonsense </p><h2>When </h2><p>The problem is currently ongoing and is increasingly becoming more difficult. </p><h2>Where </h2><p>This problem impacts businesses worldwide.</p>`;
  let overlayTop = 0;
  let overlayLeft = 0;
  let selection: any;

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
        if (from !== to) {
          // debugger
          selection = editor.state.selection;
          overlayTop = editor.view.coordsAtPos(from).top - parentTop - 25;
          overlayLeft = editor.view.coordsAtPos(from).left - parentLeft;
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
</script>

<div class="flex flex-col border h-full">
  <TopMenu {editor} bind:fullscreen />
  <div class="flex-1 overflow-auto">
    <slot {editing} />
    <div class="editor h-full p-4 user-content relative">
      <div bind:this={element} />
      {#if editor && selection}
        <div
          transition:blur
          class="absolute"
          style="top:{overlayTop}px; left:{overlayLeft}px;  "
        >
          <FloatingTextMenu {editor} {element} />

          <!-- Selecting Both possible bug? -->
          <!-- {#if selection.node == "image"}
          <FloatingTextMenu {editor} {element} />
        {:else}
          <FloatingTextMenu {editor} {element} />
        {/if} -->
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
