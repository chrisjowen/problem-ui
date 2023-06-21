<script lang="ts">
  import type { Editor } from "@tiptap/core";

  export let editor: Editor;
  let showMenu = false;

  let colors = [
    "white", "red", "yellow", "green", "blue", "indigo", "purple", "pink"
];

  function toggleMenu() {
      showMenu = !showMenu;
  }

  let highlight = (color: string)  => () => {
    editor.commands.setHighlight({ color })
    showMenu = false;
  }


  

</script>

  <button
    class="text-xs w-[40px] border-l-[1px] border-r-[1px] hover:bg-gray-50" 
    on:click={toggleMenu}
  >
    <i class="fa-solid fa-highlighter"></i>
  </button>
  <div class="relative">

  {#if showMenu}
    <div class="absolute left-[-40px] top-[30px] w-[100px] bg-white border p-1 space-y-0">
        {#each colors as color}
          <button
          style="background: {color}" class="block w-full p-2 border m-0 hover:border-gray-900"
            on:click={highlight(color)}
          >
          </button>
        {/each}
    </div>
  {/if}

</div>
