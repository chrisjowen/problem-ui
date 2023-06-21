<script lang="ts">
  import type { Editor } from "@tiptap/core";

  export let editor: Editor;
  export let editing: boolean = false;
  let showTableMenu = false;

  import { Listgroup, ListgroupItem } from "flowbite-svelte";
  let icons = [
    {
      name: "Delete Table",
      icon: "fa-solid fa-remove",
      action: () => editor.commands.deleteTable(),
    },
    {
      name: "Delete Row",
      icon: "fa-solid fa-remove",
      action: () => editor.commands.deleteRow(),
    },
    {
      name: "Add Row After",
      icon: "fa-solid fa-remove",
      action: () => editor.commands.addRowAfter(),
    },
    {
      name: "Add Row Before",
      icon: "fa-solid fa-remove",
      action: () => editor.commands.addRowBefore(),
    },
    {
      name: "Delete Col",
      icon: "fa-solid fa-remove",
      action: () => editor.commands.deleteColumn(),
    },
    {
      name: "Add Col After",
      icon: "fa-solid fa-remove",
      action: () => editor.commands.addColumnAfter(),
    },
    {
      name: "Add Col Before",
      icon: "fa-solid fa-remove",
      action: () => editor.commands.addColumnBefore(),
    },
  ];

  function toggleTableMenu() {
    if(editing) {
        showTableMenu = !showTableMenu;
    }
    else{
        insertTable()
    }
  }

  let insertTable = () => {
    editor.commands.insertTable({ rows: 3, cols: 3, withHeaderRow: true });
    editor.commands.focus();
  };

  let executeAction = (item: any)  => () => {
    item.action();
    showTableMenu = false;
  }


  $: showTableMenu = editing && showTableMenu
  

</script>

  <button
    class="text-xs w-[40px] border-r-[1px] hover:bg-gray-50 {editing ? 'bg-gray-50 text-red-500' : ''}"
    on:click={toggleTableMenu}
  >
    <i class="fa-solid fa-table" />
  </button>
  <div class="relative">

  {#if showTableMenu}
    <div class="absolute left-[-40px] top-[30px]">
      <Listgroup active class="w-48">
        {#each icons as item}
          <ListgroupItem
            class="text-base font-semibold gap-2"
            on:click={executeAction(item)}
          >
            <i class="{item.icon} mr-2" />
            {item.name}
          </ListgroupItem>
        {/each}
      </Listgroup>
    </div>
  {/if}

</div>
