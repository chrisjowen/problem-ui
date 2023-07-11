<script lang="ts">
  import ProblemCard from "$lib/components/problem/new/ProblemCard.svelte";
  import type { Problem } from "$lib/types";
  import type { PageData } from "./$types";
  import IdeaShell from "$lib/components/idea/manage/IdeaShell.svelte";
  import { Button } from "flowbite-svelte";
  import api from "$lib/api";
  import IdeaChecklist from "$lib/components/idea/manage/IdeaChecklist.svelte";
  import ValidationResults from "$lib/components/idea/manage/ValidationResults.svelte";
  import ShareCommunity from "$lib/components/idea/ShareCommunity.svelte";

  export let reload: (force: boolean, successMessage?: string) => void;

  export let data: PageData;
  let problem: Problem = data.problem;

  function activateProblem(): void {
    api.problem.update(problem.id, { status: "ACTIVE" }).then((res) => {
      // problem = res.data;
      reload(true, "Validation started");
    });
  }
</script>

<IdeaShell bind:problem bind:reload>
  {#if problem}
    <div class="md:flex h-full">
      <div class="flex-1 h-full">
        {#if problem.status == "DRAFT"}
          <IdeaChecklist {problem} on:activate={activateProblem} />
        {:else}
          <div class="bg-white">
            <div
              class="bg-primary-50 border-b-[1px] mb-4 p-4 py-8 prose max-w-none prose-slate text-center"
            >
              <h1 class="text-primary-700">
                <i class="fas fa-info-circle  mr-2" />
                Idea Is Being Validated
              </h1>
              <p>
                Give the community some time to check out your idea and provide
                feedback.
              </p>
            </div>

            <div class="p-4">
              <h1 class="text-xl font-bold mb-2">Share Places</h1>
              <p>
                While you wait, we have identified a few communities that may be
                relevent to your idea. You can share your idea with these
                communities to get feedback.
              </p>

              <div class="grid md:grid-cols-3  gap-4 mt-8">
                <ShareCommunity url="https://www.reddit.com/r/Entrepreneur/" text="/r/Entrepreneur/" />
                <ShareCommunity url="https://www.reddit.com/r/Startup_Ideas/" text="/r/Startup_Ideas/" />
                <ShareCommunity url="https://www.facebook.com/groups/startupandentrepreneur/" text="Facebook - startupandentrepreneur" />
                <ShareCommunity url="https://www.linkedin.com/groups/3993513/" text="LinkedIn - ENTREPRENEURS, STARTUPS" />
                <ShareCommunity url="https://www.quora.com/topic/Entrepreneurship" text="Quora - Entrepreneurship" />
              </div>

            </div>

            <div class="p-4">
              <h1 class="text-xl font-bold my-2">Latest Results</h1>
              <ValidationResults {problem} />
            </div>
          </div>
        {/if}
      </div>
    </div>
  {/if}
</IdeaShell>
