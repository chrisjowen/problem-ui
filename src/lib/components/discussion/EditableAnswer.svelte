<script lang="ts">
  import type { Answer, Problem } from "$lib/types";
  import { createEventDispatcher } from "svelte";
  import LatestComments from "../comments/LatestComments.svelte";
  import { Button } from "flowbite-svelte";
  import { isOwnedByMe } from "$lib/util/authUtil";
  import Editor from "../shared/editor/Editor.svelte";
  import EntityOverview from "../shared/EntityOverview.svelte";

  export let answer: Answer;
  export let problem: Problem;
  let refreshEditor = () => null;
  let refreshReadOnlyEditor = () => null;
  let dispatch = createEventDispatcher();
  let editable = false;
  function toggleEdit() {
    editable = !editable;
  }
  let onUpdateAnswer = (answer: Answer) => () => {
    dispatch("update", answer);
    refreshEditor();
    refreshReadOnlyEditor();
    editable = false;
  };
</script>

{#if answer}
  <div class="p-8">
    <div class="flex mb-4">
      <div class="flex-1">
        <EntityOverview entity={answer} />
      </div>
      {#if isOwnedByMe(answer)}
        <div>
          {#if !editable}
            <Button color="light" size="xs" on:click={toggleEdit}>Edit</Button>
          {:else}
            <Button color="light" size="xs" on:click={onUpdateAnswer(answer)}
              >Save</Button
            >
          {/if}
        </div>
      {/if}
    </div>
    {#if editable}
      <div class="border h-[500px]">
        <Editor
          bind:html={answer.answer}
          refresh={refreshReadOnlyEditor}
          editable={true}
          showFullscreen={false}
        />
      </div>
    {:else}
      <Editor
        bind:html={answer.answer}
        refresh={refreshEditor}
        editable={false}
      />
    {/if}
  </div>

  <div class="border-t-[1px] m-4 pt-4">
    <LatestComments type="answer" id={answer.id} />
  </div>
{/if}
