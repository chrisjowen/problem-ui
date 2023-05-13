<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { Editor } from "@tiptap/core";
  import StarterKit from "@tiptap/starter-kit";
  import { createEventDispatcher } from "svelte";
  import { Card } from "flowbite-svelte";
  import { fade } from 'svelte/transition';
  import { Listgroup, ListgroupItem } from 'flowbite-svelte';
  import Table from '@tiptap/extension-table';
  import TableRow from '@tiptap/extension-table-row';
  import TableCell from '@tiptap/extension-table-cell';
  import TableHeader from '@tiptap/extension-table-header';

  Table.configure({
    resizable: true,
    HTMLAttributes: {
      class: 'w-full text-sm text-left text-gray-500 dark:text-gray-400 border'
    }
  })
  TableCell.configure({
    HTMLAttributes: {
      class: 'border p-4 bg-red-50'
    }
  })

  const dispatch = createEventDispatcher();

  let element: HTMLDivElement;
  let editor: Editor;

  export let html = `<h2>Who </h2><p>Software developers and other makers who have recently retrenched, as well as innovators in their respective industry who lack the technical skills to create solutions.  </p><h2>What </h2><p>Dunno </p><h2>Why </h2><p>Nonsense </p><h2>When </h2><p>The problem is currently ongoing and is increasingly becoming more difficult. </p><h2>Where </h2><p>This problem impacts businesses worldwide.</p>`;
  let textSelected = false;
  let overlayTop = 0;
  let overlayLeft = 0;
  let showAI = false;

  function onSelectClick() {
    textSelected = true;
    let state = editor.view.state;
    let { to, from } = state.selection;
    console.log(state.doc.textBetween(from, to, ""));
  }

  function onInsertClick() {
    let state = editor.view.state;
    let cursor = state.selection.from;
    let hasSpace = state.doc.textBetween(cursor, cursor + 1, "");
    let text = "Test";
    editor.commands.insertContent(hasSpace ? text : " " + text);
    editor.commands.focus();
  }
  let insertTable = () => {
    editor.commands.insertTable({ rows: 3, cols: 3, withHeaderRow: false })
    editor.commands.focus();
  }
  let ai = (type: string) =>() => {
    alert(type)
  }
  let toggleAI = () => {
    showAI = !showAI;
  };
  onMount(() => {
    dispatch("change", html);
    editor = new Editor({
      element: element,
      extensions: [StarterKit, Table, TableRow, TableCell, TableHeader],
      content: html,
      onTransaction: () => {
        editor = editor;
      },
      onUpdate: ({ editor }) => {
        html = editor.getHTML();
        dispatch("change", html);
      },
      onSelectionUpdate: ({ editor }) => {
        let box = element.getBoundingClientRect()
        let parentTop = box.top + element.scrollTop;
        let parentLeft = box.left + element.scrollLeft;
        const {to, from} = editor.state.selection;
        if (from !== to) {
           overlayTop =  editor.view.coordsAtPos(from).top  - parentTop + 50;
           overlayLeft =  editor.view.coordsAtPos(from).left  - parentLeft;
        }
        else{
          showAI = false;
        }
        textSelected = to != from;
      },
    });
  });
  onDestroy(() => {
    if (editor) {
      editor.destroy();
    }
  });
</script>

<div class="h-full border">
  {#if editor}
  <div class="flex flex-row  border-b-[1px] ">
    <button class="text-xs w-[60px] p-3 border-r-[1px] hover:bg-gray-50"  on:click={() => editor.chain().focus().setParagraph().run()}>
      <i class="fa fa-p " /> 
    </button>
    <button class="text-xs p-3 pl-3 w-[60px] border-r-[1px] hover:bg-gray-50" on:click={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
      <i class="fa fa-heading " /><span>1</span>
    </button>
    <button class="text-xs p-3 pl-3 w-[60px] border-r-[1px] hover:bg-gray-50" on:click={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
      <i class="fa fa-heading " /><span>2</span>
    </button>
    <button class="text-xs p-3 pl-3 w-[60px] border-r-[1px] hover:bg-gray-50"  on:click={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
      <i class="fa fa-heading " /><span>3</span>
    </button> 
    <button class="text-xs p-3 pl-3 w-[60px] border-r-[1px] hover:bg-gray-50"  on:click={insertTable}>
      <i class="fa fa-table " />
    </button>
  </div>
  {/if}

  <div class="editor relative  p-4 h-full overflow-auto user-content">
    <div  bind:this={element}  />
    {#if editor && textSelected}
    <div transition:fade class="absolute" style="top:{overlayTop}px; left:{overlayLeft}px;  ">
        <Card padding="none">
          <div class="flex flex-row">
            <button class="flex-1 text-xs p-2 w-[50px] hover:bg-gray-50" on:click={() => editor.chain().focus().toggleBold().run()}>B</button>
            <button class="flex-1 text-xs p-2 border-l-[1px] w-[50px] hover:bg-gray-50" on:click={() => editor.chain().focus().toggleItalic().run()}>I</button>
            <button class="flex-1 text-xs p-2 border-l-[1px] w-[50px] hover:bg-gray-50" on:click={() => editor.chain().focus().toggleItalic().run()}>U</button>
            <button class="flex-1 text-xs p-2 border-l-[1px] hover:bg-gray-50  {showAI ? 'bg-primary-100' : ''}" on:click={toggleAI}>
              <div class="flex">
                <i class="fa fa-robot text-xs  mr-2" />
                <span class="bold">AI</span>
              </div>
            </button>
          </div>
        </Card>
        {#if showAI}
        <div class="pt-1 relative text-right flex  justify-end " >
         <Listgroup class="w-48" active >
            <ListgroupItem on:click={ai("shorter")}><i class="fa fa-edit text-xs mr-3" /> Make Shorter</ListgroupItem>
            <ListgroupItem on:click={ai("longer")}><i class="fa fa-edit text-xs mr-3" /> Make Longer</ListgroupItem>
            <ListgroupItem on:click={ai("simplify")}><i class="fa fa-edit text-xs mr-3" /> Simplify</ListgroupItem>
         </Listgroup>
        </div>
        {/if}
    </div>
    {/if}
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
