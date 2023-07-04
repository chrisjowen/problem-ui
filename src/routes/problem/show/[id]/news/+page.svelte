<script lang="ts">
  import NewsList from "$lib/components/news/NewsList.svelte";
  import ProblemLayout from "$lib/components/problem/ProblemLayout.svelte";
  import Tip from "$lib/components/problem/Tip.svelte";
  import type { Problem } from "$lib/types";
  import { Button } from "flowbite-svelte";

  let problem: Problem;
</script>

<ProblemLayout bind:problem>

  {#if problem}
  <Tip title="Related News">
    Keep up to date with the latest news related to your problem statment. To tweak your newsfeed see the 
  </Tip>
    <div class="flex mx-4 mt-4">
      <h1 class="flex-1 items-end flex text-xl text-primary-600">
        Related News
      </h1>
    </div>

    <NewsList tags={problem.sectors.map((s) => s.name)}>
      <!-- <div slot="actions" class="flex justify-end">
        <Button color="light" size="xs" href="/news/create">
          <i class="fas fa-link mr-2" />
          Save In Resources
        </Button>
      </div> -->
    </NewsList>
  {/if}
</ProblemLayout>
