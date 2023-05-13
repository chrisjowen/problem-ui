<script lang="ts">
  import type { Problem } from "$lib/types/problem.ts";
  import Editor from "$lib/shared/autoform/editor/editor.svelte";
  import { Avatar, Button, Card, Input } from "flowbite-svelte";
  export let problem: Problem;
  let editable = true;
  let editing = false;
</script>

<Card size="2xl" padding="none" >
  <div class="flex space-x-4 text-xs bg-gray-50 p-3 rounded-t-md justify-end">
    <Avatar src="https://placebeard.it/300x300" size="sm" class="top-[10px]" />
    <div class="">
      <p class="bold text-black">Christopher Owen</p>
      <p>Last Updated: Today at 1:42 pm</p>
    </div>
    <div class="flex-1 flex justify-end">
      {#if editable}
        {#if !editing}
          <Button size="xs" color="light" on:click={() => (editing = true)}>
            <i class="fa-solid fa-edit mr-2" />
            Edit Problem
          </Button>
        {:else}
          <Button size="xs" color="light" on:click={() => (editing = false)} class="mr-2">
            <i class="fa-solid fa-edit mr-2" />
            Discard Changes
          </Button>
          <Button size="xs" color="primary" on:click={() => (editing = false)}>
            <i class="fa-solid fa-edit mr-2" />
            Save Problem
          </Button>
        {/if}
      {/if}
    </div>
  </div>
  <div>
    {#if editing}
      <div class="text-3xl p-4 text-bold">
        <Input
          type="text"
          class="text-xl text-primary-900"
          bind:value={problem.title}
        />
      </div>
    {:else}
      <h1 class="text-3xl text-primary-900 p-6 bold">
        <i class="fas fa-info-circle text-primary-900 mr-4" />
        {problem.title}
      </h1>
    {/if}
  </div>

  {#if editing}
    <div class="m-4">
      <Editor bind:html={problem.overview} />
    </div>
  {:else}
    <div class="pl-6 pr-6 pb-6 space-y-4 user-content text-gray-600 h-full">
      {@html problem.overview}
    </div>
  {/if}
</Card>
