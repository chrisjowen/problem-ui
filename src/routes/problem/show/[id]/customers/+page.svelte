<script lang="ts">
  import api from "$lib/api";
  import ProblemLayout from "$lib/components/problem/ProblemLayout.svelte";
  import type { PaginationResults, Stakeholder } from "$lib/types";
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { imageUrl } from "$lib/util/imageutil";
  import { TabItem, Tabs } from "flowbite-svelte";
  import Demographics from "$lib/components/customers/demographics.svelte";
  import StakeHolderView from "$lib/components/customers/StakeHolderView.svelte";

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

  <section id="stakeholders" class="px-4">
    <div class="space-y-4 bg-white border rounded-lg">
      {#if stakeholders}
        <Tabs style="underline"  contentClass="p-0 m-0">
          {#each stakeholders.entries as stakeholder, idx}
            <TabItem title={stakeholder.type} open={idx == 0}>
              <StakeHolderView {stakeholder} />
            </TabItem>
          {/each}
        </Tabs>
      {/if}
    </div>
  </section>
</ProblemLayout>
