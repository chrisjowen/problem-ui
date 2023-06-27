<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { Editor } from "@tiptap/core";
  import StarterKit from "@tiptap/starter-kit";
  import { createEventDispatcher } from "svelte";
  import Table from "@tiptap/extension-table";
  import TableRow from "@tiptap/extension-table-row";
  import TableCell from "@tiptap/extension-table-cell";
  import TableHeader from "@tiptap/extension-table-header";
  import TextAlign from "@tiptap/extension-text-align";
  import Link from "@tiptap/extension-link";
  import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
  import { SvelteImageExtension } from "./exstensions/SvelteImageExtension";
  import TaskList from "@tiptap/extension-task-list";
  import TaskItem from "@tiptap/extension-task-item";
  import Highlight from "@tiptap/extension-highlight";


  import css from "highlight.js/lib/languages/css";
  import js from "highlight.js/lib/languages/javascript";
  import ts from "highlight.js/lib/languages/typescript";

  import { lowlight } from "lowlight";

  lowlight.registerLanguage("css", css);
  lowlight.registerLanguage("js", js);
  lowlight.registerLanguage("ts", ts);

  import TopMenu from "./TopMenu.svelte";
  export let showFullscreen = true;
  export let editable = true;
  export let fullscreen = false;
  export let height = "full";
  export let simple = false
  export let html = `
   <p>This is still the text editor you’re used to, but enriched with node views.</p>

    <p>Did you see that? That’s a Svelte component. We are really living in the future.</p>
      
   `;
  const dispatch = createEventDispatcher();

  let element: HTMLDivElement;
  let editor: Editor;
  // let overlayTop = 0;
  // let overlayLeft = 0;
  let selection: any;
  let selectedNode = "";

  $: {
    if (html && editor && !editable) {
      refresh()
    }
  }
  
  $: {
    if (selection) {
      selectedNode = selection.node;
    } else {
      selectedNode = "";
    }
  }

  $: heightClass = height === "full" ? "h-full" : `h-[${height}]`;

  $: className = fullscreen
    ? "absolute top-0 bottom-0 bg-white right-0 left-0 bg-white flex flex-col z-40 "
    : `flex flex-col  ${heightClass} relative  overflow-y-auto `;

  onMount(() => {
    dispatch("change", html);
    editor = new Editor({
      element: element,
      editable: editable,
      extensions: [
        Link,
        CodeBlockLowlight.configure({
          HTMLAttributes: {
            class: "not-prose",
          },
          lowlight,
          defaultLanguage: "js",
        }),
        StarterKit,
        Highlight.configure({
          multicolor: true,
        }),
        TaskItem.configure({
          HTMLAttributes: {
            class: "flex space-x-2 items-start",
          },
        }),
        TaskList.configure({
          HTMLAttributes: {
            class: "not-prose",
          },
        }),
        Table.configure({
          resizable: false,
          HTMLAttributes: {
            class: "border border-red",
          },
        }),
        TableRow.configure({
          HTMLAttributes: {
            class: "border",
          },
        }),
        TableHeader.configure({
          HTMLAttributes: {
            class: "bg-gray-50 border",
          },
        }),
        TableCell.configure({
          HTMLAttributes: {
            class: "border",
          },
        }),
        SvelteImageExtension.configure({
          HTMLAttributes: {
            class: "not-prose",
          },
        }),
        TextAlign.configure({
          types: ["heading", "paragraph", "image"],
        }),
      ],
      content: html,
      onTransaction: () => {
        editor = editor;
      },
      onUpdate: ({ editor }) => {
        html = editor.getHTML();
        dispatch("change", html);
      },
      onSelectionUpdate: ({ editor }) => {
        selection = editor.state.selection;
      },
    });
  });
  onDestroy(() => {
    if (editor) {
      editor.destroy();
    }
  });

  export function focus() {
    editor.commands.focus();
  }

  function onClickEditor() {
    editor.commands.focus();
  }

  export function refresh() {
   editor.chain().clearContent().setContent(html).run();
  }
</script>

<div class={className}>
  {#if editable}
    <TopMenu {simple} {editor} bind:fullscreen bind:showFullscreen bind:selection />
  {/if}

  <div class="flex-1 overflow-y-auto  " on:click={onClickEditor} on:keyup={focus}>
    <slot />
    <div
      class="{ editable ? "px-8 py-4" : ""}  prose prose-td:p-4 prose-zinc prose-h1:text-gray-600 prose-h2:text-gray-500 prose-h2:mt-0 prose-md max-w-none editor relative"
    >
      <div class="h-full w-full ProseMirror max-w-[1000px]" bind:this={element} />
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

  :global(.ProseMirror-selectednode) {
    border: solid 1px red !important;
    border-radius: 10px;
  }

  :global(.ProseMirror) {
    > * + * {
      margin-top: 0.75em;
    }

    & :global(pre) {
      background: #0d0d0d;
      color: #fff;
      font-family: "JetBrainsMono", monospace;
      padding: 0.75rem 1rem;
      border-radius: 0.5rem;

      & :global(code) {
        color: inherit;
        padding: 0;
        background: none;
        font-size: 0.8rem;
      }

      & :global(.hljs-comment),
      & :global(.hljs-quote) {
        color: #616161;
      }

      & :global(.hljs-variable),
      & :global(.hljs-template-variable),
      & :global(.hljs-attribute),
      & :global(.hljs-tag),
      & :global(.hljs-name),
      & :global(.hljs-regexp),
      & :global(.hljs-link),
      & :global(.hljs-name),
      & :global(.hljs-selector-id),
      & :global(.hljs-selector-class) {
        color: #f98181;
      }

      & :global(.hljs-number),
      & :global(.hljs-meta),
      & :global(.hljs-built_in),
      & :global(.hljs-builtin-name),
      & :global(.hljs-literal),
      & :global(.hljs-type),
      & :global(.hljs-params) {
        color: #fbbc88;
      }

      & :global(.hljs-string),
      & :global(.hljs-symbol),
      & :global(.hljs-bullet) {
        color: #b9f18d;
      }

      & :global(.hljs-title),
      & :global(.hljs-section) {
        color: #faf594;
      }

      & :global(.hljs-keyword),
      & :global(.hljs-selector-tag) {
        color: #70cff8;
      }

      & :global(.hljs-emphasis) {
        font-style: italic;
      }

      & :global(.hljs-strong) {
        font-weight: 700;
      }
    }
  }
</style>
