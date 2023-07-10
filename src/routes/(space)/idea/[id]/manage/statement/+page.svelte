<script lang="ts">
  import type { Problem } from "$lib/types";
  import type { PageData } from "./$types";
  import { Button } from "flowbite-svelte";
  import IdeaShell from "$lib/components/idea/manage/IdeaShell.svelte";
  import Editor from "$lib/components/shared/editor/Editor.svelte";

  export let data: PageData;
  export let save: (message?: null | string) => () => Promise<void>;
  let problem: Problem = data.problem;
</script>

<IdeaShell bind:problem bind:save>
  {#if problem}
    <div class="flex h-full flex-col">
      <div class="flex-1 overflow-auto bg-white  ">
          <Editor bind:html={problem.overview} showFullscreen={false} />
      </div>
      <div class="p-2 bg-gray-50  z-40">
        <div class="flex justify-end">
          <Button size="xs" on:click={save("Problem Statament Updated")}
            >Save</Button
          >
        </div>
      </div>
    </div>
  {/if}
</IdeaShell>
