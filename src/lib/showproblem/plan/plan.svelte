<script lang="ts">
  import axios from "axios";

  import Questions from "./questions.svelte";
  import Experts from "./experts.svelte";
  import SolutionOverview from "./solutionoverview.svelte";
  import { onMount } from "svelte";
  import { Tabs, TabItem } from "flowbite-svelte";
  import type { Solution } from "$lib/types/solution";
  import Statistics from "./statistics.svelte";
  import Feature from "./feature.svelte";

  export let problemId: null | number = null;
  export let editable = false;

  let solution: Solution;

  onMount(async () => {
    reload();
  });

  export async function reload() {
    let response = await axios.get(`/api/problem/${problemId}/solution`);
    solution = response.data;
  }
</script>

{#if solution}
  <Tabs
    contentClass="border-0 bg-gray-50 h-screen"
    activeClasses="p-4  m-0 border-[0px] border-b-[4px] border-primary-900 text-primary-900 text-xs"
    inactiveClasses="p-4 hover:border-b-[4px] border-primary-900 m-0 text-xs"
  >
    <TabItem open title="Solution">
      <div slot="title" class="flex items-center gap-2">
        <i class="fa-solid fa-flask" />
        Solution
      </div>
      <div class="grid grid-cols-5 h-screen">
        <div class="col-span-4 m-5">
          <SolutionOverview {solution} />
        </div>
        <div class="p-4 col-span-1 bg-gray-100 border-gray-200 border-l-[1px]">
          <section>
            <div class="m-1">
              <h1 class="mb-4 text-xl text-primary-900">Technologies</h1>
              <div>
                {#each solution.technologies as technology}
                  <span
                    class="text-xs bg-primary-900 p-2 mr-1 mb-2 inline-block text-white"
                  >
                    {technology}
                  </span>
                {/each}
              </div>
            </div>
            <div class="m-1">
              <h1 class="mb-4 text-xl text-primary-900">Team Expertise</h1>
              <div>
                {#each solution.expertise as expertise}
                  <span
                    class="text-xs bg-primary-900 p-2 mr-1 mb-1 inline-block text-white"
                  >
                    {expertise}
                  </span>
                {/each}
              </div>
            </div>
          </section>
        </div>
      </div>
    </TabItem>
    <TabItem>
      <div slot="title" class="flex items-center gap-2">
        <i class="fa-solid fa-clock" />
        Time & Budget
      </div>
      <section class="m-5">
        <!-- <h1 class="mb-4 text-xl text-primary-900">Time & Budget</h1> -->
        <div class=" mb-5 bg-white border p-4">
          <Statistics {solution} />
        </div>
      </section>
    </TabItem>
    <TabItem title="Features">
      <div slot="title" class="flex items-center gap-2">
        <i class="fa-brands fa-trello" />
        Features
      </div>
      <section class="mb-6 p-5">
        <!-- <h1 class="mb-4 text-xl text-primary-900">Key Features</h1> -->
        <div class="grid grid-cols-1 gap-2">
          {#each solution.keyFeatures as feature}
            <Feature value={feature} {editable} />
          {/each}
        </div>
      </section>
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
{/if}
