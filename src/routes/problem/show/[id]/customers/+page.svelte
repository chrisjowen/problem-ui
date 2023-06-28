<script lang="ts">
  import api from "$lib/api";
  import ProblemLayout from "$lib/components/problem/ProblemLayout.svelte";
  import type { PaginationResults } from "$lib/types";
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import type { Stakeholder } from "$lib/types/stakeholders";
  import { entries } from "lodash";
  import Stakeholders from "$lib/components/old/showproblem/research/stakeholders.svelte";
  import Demographics from "$lib/components/old/showproblem/research/demographics.svelte";
  import Wherewhen from "$lib/components/old/showproblem/research/wherewhen.svelte";
  import { imageUrl } from "$lib/util/imageutil";

  let problemId = $page.params.id;
  let stakeholders: PaginationResults<Stakeholder>;

  onMount(load);

  function load() {
    api.problem
      .stakeholders(problemId)
      .list()
      .then((res) => {
        stakeholders = res.data;
      });
  }
</script>
<ProblemLayout>
  <div class="flex mb-5 m-4">
    <h1 class="flex-1 items-end flex text-xl text-primary-600">
      Customer Insights
    </h1>
  </div>

  <div class="m-4 space-y-4">
    <h2>Stakeholders</h2>

    <div class=" grid grid-cols-2 gap-2">
      {#if stakeholders}
        {#each stakeholders.entries as stakeholder}
          <div class="bg-white rounded-lg border p-4 space-y-4">
            <h1
              class="text-xl text-primary-600 bg-gray-100 p-4 flex items-center"
            >
              {#if stakeholder.img}
                <img
                  src={imageUrl(stakeholder.img)}
                  class="w-[75px] rounded-lg mr-5"
                />
              {/if}

              <i class="fas fa-user mr-2" />

              {stakeholder.type}
            </h1>

            <h1 class="mb-2 text-xl text-primary-600">Who Are They?</h1>

            <div class="prose">
              {@html stakeholder.description}
            </div>
            <section id="Demographics">
              <h1 class="text-xl mb-3 text-primary-600">
                What Are There Demographics
              </h1>

              <div class="my-6">
                <Demographics {stakeholder} />
              </div>
            </section>

            <section id="problems">
              <h1 class="mb-2 text-xl text-primary-600">
                How Are They Affected?
              </h1>
              {#each stakeholder.problems as problem}
                <div
                  class="flex flex-row pb-2 ml-4 pt-2 border-gray-200 items-center"
                >
                  <i class="fa fa-warning mr-2" />
                  <div class="flex-1">{@html problem}</div>
                </div>
              {/each}
            </section>
          </div>
        {/each}
      {/if}
    </div>
  </div>
</ProblemLayout>
