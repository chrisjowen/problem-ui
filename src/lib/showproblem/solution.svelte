<script lang="ts">
  import axios from "axios";
  import { onMount } from "svelte";
  import type { Solution } from "$lib/types/solution.ts";
  import { Spinner, Input, Tabs, TabItem, Card } from "flowbite-svelte";
  import Feature from "./plan/feature.svelte";
  import Statistics from "./plan/statistics.svelte";

  let solution: Solution;
  export let problemId: null | number = null;
  export let editable = false;

  onMount(async () => {
    reload();
  });

  export async function reload() {
    let response = await axios.get(`/api/problem/${problemId}/solution`);
    solution = response.data;
  }
</script>

<div class="bg-gray-50">
  {#if solution}
  <section >
    <div class="grid grid-cols-5 h-screen ">
      <div class="col-span-3">
        <section class="drop-shadow-100 p-5 m-9 bg-white border drop-shadow-md">
          <h1 class="text-2xl text-primary-900">Solution Overview</h1>
          <div class="pt-4 ">
            {@html solution.description}
          </div>
        </section>
      </div>
      <div class="p-4 col-span-2 bg-gray-100 border-gray-200  border-l-[1px]">
        <section >
          <h1 class="mb-4 text-xl text-primary-900">Time & Budget</h1>
          <div  class=" mb-5 bg-white border p-4">
            <Statistics solution={solution} />
          </div>
        </section>
        <section  class="mb-6">
          <h1 class="mb-4 text-xl text-primary-900">Key Features</h1>
          {#each solution.keyFeatures as feature}
            <Feature value={feature} {editable} />
          {/each}
        </section>
        <section>
          <div class="m-1">
            <h1 class="mb-4 text-xl text-primary-900">Technologies</h1>
            <div >
              {#each solution.technologies as technology}
                <span class="text-xs bg-primary-900 p-2 mr-1 mb-2 inline-block text-white">
                  {technology}
                </span>
              {/each}
            </div>
          </div>
          <div class="m-1">
            <h1 class="mb-4 text-xl text-primary-900">Team Expertise</h1>
            <div >
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
    <div>
    </div>
  </section>
  {:else}
    <Spinner color="yellow" size={10} />
  {/if}
</div>