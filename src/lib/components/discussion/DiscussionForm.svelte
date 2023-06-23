<script lang="ts">
  import { Button, Input } from "flowbite-svelte";
  import { auth } from "$lib/store";
  import { createEventDispatcher } from "svelte";
  import Editor from "$lib/components/shared/editor/Editor.svelte";

  let dispatch = createEventDispatcher();
  let user = $auth.loggedInUser;
  let form = {
    title: "",
    question: "",
  };

  function onSubmit() {
    dispatch("submit", { ...form, user_id: user.id });
  }
</script>

{#if user}
  <div class="mb-2">
    <Input
      type="text"
      bind:value={form.title}
      placeholder="Ask your question"
    />
  </div>

  <div class="h-[300px] border">
    <Editor bind:html={form.question} showFullscreen={false} />
  </div>

  <div class="flex justify-end">
    <Button
      size="xs"
      class="bg-primary-400"
      on:click={onSubmit}
    >
      <i class="fa fa-comment mr-2 text-xs" />
      Post
    </Button>
  </div>
{/if}
