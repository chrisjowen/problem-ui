<script lang="ts">
  import type { Problem } from "$lib/types/problem.ts";
  import { Input } from "flowbite-svelte";
  import EditableTextArea from "$lib/shared/editableTextArea.svelte";
  export let problem: Problem;
  export let editable = false;
</script>

<EditableTextArea bind:input={problem.overview} let:editing editable={editable}>
  {#if editing}
    <div class="text-3xl p-4 text-bold">
      <Input
        type="text"
        class="text-xl text-primary-600"
        bind:value={problem.title}
      />
    </div>
  {:else}
    <h1 class="text-3xl text-primary-600 p-4 bold">
      <i class="fas fa-info-circle text-primary-600 mr-4" />
      {problem.title}
    </h1>
  {/if}
</EditableTextArea>
