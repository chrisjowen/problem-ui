<script lang="ts">
  import type { Editor } from "@tiptap/core";
  import { Card } from "flowbite-svelte";

  export let element: HTMLDivElement;
  export let editor: Editor;

</script>

<Card padding="none">
  <div class="flex flex-row  ">
    <button
      class="flex-1 text-xs p-2 w-[50px] hover:bg-gray-50"
      on:click={() => editor.commands.addColumnBefore() }>ACB</button>
      <button
      class="flex-1 text-xs p-2 w-[50px] hover:bg-gray-50"
      on:click={() => editor.commands.addColumnAfter()}>ACA</button>
  </div>
</Card>

