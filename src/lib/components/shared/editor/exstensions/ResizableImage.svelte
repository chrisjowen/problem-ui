<script lang="ts">
  import type { NodeViewProps } from "@tiptap/core";
  import cx from "classnames";
  import { NodeViewWrapper, draggable } from "svelte-tiptap";

  export let node: NodeViewProps["node"];
  export let editor: NodeViewProps["editor"];
  export let updateAttributes: NodeViewProps["updateAttributes"];
  export let selected: NodeViewProps["selected"] = false;

  $: editable = editor.isEditable;
  const setWidth = (width: string) => () => {
    updateAttributes({ width: width });
  };
</script>

<NodeViewWrapper
  class={cx("svelte-component", { selected })}
  action={draggable}
>
  {#if editable}
    <div class="group relative  inline-block" >
      <div  class="hidden group-hover:inline absolute top-[0px] left-[0px] bg-white border rounded-xl">
        <button on:click={setWidth("25%")}  class="p-2 hover:bg-primary-50">
            <i class="fa fa-image text-xs" />
        </button>
        <button on:click={setWidth("50%")}  class="p-2 hover:bg-primary-50">
          <i class="fa fa-image text-md" />
        </button>
        <button on:click={setWidth("75%")} class="p-2 hover:bg-primary-50">
          <i class="fa fa-image text-lg" />
        </button>
        <button on:click={setWidth("100%")} class="p-2 hover:bg-primary-50">
          <i class="fa fa-image text-xl" />
        </button>
      </div>
      <img src={node.attrs.src} class="group-hover:border" alt={node.attrs.src} width="{node.attrs.width}" />
    </div>
  {:else}
    <img src={node.attrs.src} alt={node.attrs.src} width="{node.attrs.width}" />
  {/if}
</NodeViewWrapper>
