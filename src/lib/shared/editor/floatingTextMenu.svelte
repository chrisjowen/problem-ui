<script lang="ts">
  import type { Editor } from "@tiptap/core";
  import { Card, Modal } from "flowbite-svelte";
  import { Listgroup, ListgroupItem } from "flowbite-svelte";
  import axios from "axios";

  export let element: HTMLDivElement;
  export let editor: Editor;

  let showAI = false;
  let aiSuggestion = "";
  let showAIModel = false;


  let ai = (type: string) => () => {
    showAIModel = true;
    let context = editor.getHTML();
    let state = editor.view.state;
    let { to, from } = state.selection;
    let fragment = state.doc.textBetween(from, to, "");

    axios
      .post(`/api/ai/advice/text`, {
        context: context,
        fragment: fragment,
        operation: type,
      })
      .then((response) => {
        showAIModel = false;
        aiSuggestion = response.data.content;
        editor.commands.setTextSelection({ from: from, to: to });
        editor.commands.insertContent(response.data.content);
        editor.commands.focus();
      });
  };
  let toggleAI = () => {
    showAI = !showAI;
  };
</script>

<Card padding="none">
  <div class="flex flex-row bg-black text-white">
    <button
      class="flex-1 text-xs p-2 w-[50px] hover:bg-primary-600"
      on:click={() => editor.chain().focus().toggleBold().run()}>B</button
    >
    <button
      class="flex-1 text-xs p-2 border-l-[1px] w-[50px] hover:bg-primary-600"
      on:click={() => editor.chain().focus().toggleItalic().run()}>I</button
    >
    <button
      class="flex-1 text-xs p-2 border-l-[1px] w-[50px] hover:bg-primary-600"
      on:click={() => editor.chain().focus().toggleItalic().run()}>U</button
    >
    <button
      class="flex-1 text-xs p-2 border-l-[1px] hover:bg-primary-600 {showAI
        ? 'bg-primary-100'
        : ''}"
      on:click={toggleAI}
    >
      <div class="flex">
        <i class="fa fa-robot text-xs mr-2" />
        <span class="bold">AI</span>
      </div>
    </button>
  </div>
</Card>
{#if showAI}
  <div class="pt-1 relative text-right flex justify-end">
    <Listgroup class="w-48" active>
      <ListgroupItem on:click={ai("shorter")}
        ><i class="fa fa-edit text-xs mr-3" /> Make Shorter</ListgroupItem
      >
      <ListgroupItem on:click={ai("longer")}
        ><i class="fa fa-edit text-xs mr-3" /> Make Longer</ListgroupItem
      >
      <ListgroupItem on:click={ai("simplify")}
        ><i class="fa fa-edit text-xs mr-3" /> Simplify</ListgroupItem
      >
    </Listgroup>
  </div>
{/if}
<Modal open={showAIModel}>Waiting for AI to respond...</Modal>
