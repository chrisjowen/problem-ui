<script lang="ts">
  import { readonly } from "svelte/store";
  import Editor from "./shared/editor/Editor.svelte";

  export let value: any;

  $: html =
    value && "<code><pre>" + JSON.stringify(value, null, 2) + "</pre></code>";
</script>

<Editor editable={false} bind:html />
