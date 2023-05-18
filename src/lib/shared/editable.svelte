<script lang="ts">
  import { Input } from "flowbite-svelte";
  import { onMount, onDestroy } from "svelte";
  let editing = false;
  export let editable = false;
  function edit() {
    if (!editable) return;
    editing = true;
  }
  function unedit() {
    editing = false;
  }
  export let value = "";
</script>

{#if !editing}
  <span class="w-full block" on:click={edit}>{value}</span>
{:else}
  <Input type="text" on:blur={unedit} bind:value />
{/if}
