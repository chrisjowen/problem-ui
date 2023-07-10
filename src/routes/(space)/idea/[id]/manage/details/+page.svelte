<script lang="ts">
  import type { Problem } from "$lib/types";
  import type { PageData } from "./$types";
  import IdeaShell from "$lib/components/idea/manage/IdeaShell.svelte";
  import ManageIdeaOverview from "$lib/components/idea/manage/ManageIdeaOverview.svelte";

  export let data: PageData;
  let problem: Problem = data.problem;
  let save: (message?: null | string) => () => Promise<void>;
</script>

<IdeaShell bind:problem bind:save>
  {#if problem}
    <ManageIdeaOverview {problem} on:save={save("Basic Details Updated")} />
  {/if}
</IdeaShell>
