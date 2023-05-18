<script lang="ts">
  import axios from "axios";

  import Questions from "./questions.svelte";
  import Experts from "./experts.svelte";
  import SolutionOverview from "./solutionoverview.svelte";
  import { onMount } from "svelte";
  import { Tabs, TabItem, Card, Button } from "flowbite-svelte";
  import type { Solution } from "$lib/types/solution";
  import Statistics from "./statistics.svelte";
  import Feature from "./feature.svelte";
  import CreateSolution from "./createSolution.svelte";
  import Features from "./features.svelte";
  import TechnologiesAndExpertise from "./technologiesAndExpertise.svelte";

  export let problemId: null | number = null;
  export let editable = false;

  let solution: Solution;
  let suggestFeatures : any;

  onMount(async () => {
    reload();
  });

  export async function onSolutionUpdated() {
    await reload();
    suggestFeatures();
  }

  export async function reload() {
    let response = await axios.get(`/api/problem/${problemId}/solution`);
    solution = response.data;
  }
</script>

{#if solution}
  <Tabs
    contentClass="border-0 bg-gray-50 "
    activeClasses="p-4  m-0 border-[0px] border-b-[4px] border-primary-600 text-primary-600 text-xs"
    inactiveClasses="p-4 hover:border-b-[4px] border-primary-600 m-0 text-xs"
  >
    <TabItem open title="Solution">
      <div slot="title" class="flex items-center gap-2">
        <i class="fa-solid fa-flask" />
        Solution
      </div>
      <div class="grid grid-cols-5 h-full">
        <div class="col-span-4 m-5">
          <Statistics {solution} />
          <SolutionOverview {solution} />
        </div>
        <div class="p-4 col-span-1 bg-gray-100 border-gray-200 border-l-[1px]">
            <TechnologiesAndExpertise {solution} />
        </div>
      </div>
    </TabItem>
  
    <TabItem title="Features">
      <div slot="title" class="flex items-center gap-2">
        <i class="fa-brands fa-trello" />
        Features
      </div>
      <Features solution={solution} problemId={problemId} bind:suggest={suggestFeatures}  />
    </TabItem>
    <TabItem title="Discuss">
      <div slot="title" class="flex items-center gap-2">
        <i class="fa-regular fa-comments" />
        Discuss
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-4">
        <div class="col-span-3 m-4">
          <Questions />
        </div>
        <div class="m-4">
          <Experts />
        </div>
      </div>
    </TabItem>
  </Tabs>
{:else}
  <CreateSolution {problemId} on:created={onSolutionUpdated} />
{/if}
