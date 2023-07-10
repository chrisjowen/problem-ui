<script lang="ts">
  import type { Problem } from "$lib/types";
  import type { PageData } from "./$types";
  import IdeaShell from "$lib/components/idea/manage/IdeaShell.svelte";
  import IdeaStakeholders from "$lib/components/idea/view/IdeaStakeholders.svelte";
  import { imageUrl } from "$lib/util/imageutil";
  import { Button } from "flowbite-svelte";

  export let data: PageData;
  let problem: Problem = data.problem;
</script>

<IdeaShell bind:problem>
  {#if problem}
    <div class="border-b-[1px] p-4 bg-white relative">
      {#if problem.stakeholders}
        {#each problem.stakeholders as stakeholder}
          <a
            href="./stakeholders/{stakeholder.id}"
            class="hover:bg-primary-50 p-4 w-full text-left flex"
          >
            {#if stakeholder.img}
              <img
                src={imageUrl(stakeholder.img)}
                class="w-[60px] h-[60px] border mr-5"
                alt="stakeholder"
              />
            {/if}
            <div class="flex-1">
              <h1 class="text-xl font-bold text-gray-500">
                {stakeholder.type}
              </h1>
              {@html stakeholder.description}
            </div>
          </a>
        {/each}
      {/if}
    </div>
    <div class="p-4">
      <div class="flex justify-end">
        <Button href="./stakeholders/create" size="xs">
          <i class="fas fa-plus mr-2" />
          Stakeholder</Button
        >
      </div>
    </div>
  {/if}
</IdeaShell>
