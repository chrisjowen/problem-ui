<script lang="ts">
  import api from "$lib/api";
  import type { PaginationResults, Stakeholder } from "$lib/types";
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { TabItem, Tabs } from "flowbite-svelte";
  import StakeHolderView from "$lib/components/customers/StakeHolderView.svelte";

  let problemId = $page.params.id;
  let stakeholders: PaginationResults<Stakeholder>;

  onMount(load);

  export function load() {
    api.problem
      .stakeholders(problemId)
      .list()
      .then((res) => {
        stakeholders = res.data;
      });
  }
</script>

{#if stakeholders && stakeholders.entries.length > 0}
  <section id="stakeholders">
    <div class="space-y-4 bg-white">
      {#if stakeholders}
        <Tabs style="underline" contentClass="p-0 m-0">
          {#each stakeholders.entries as stakeholder, idx}
            <TabItem title={stakeholder.type} open={idx == 0}>
              <StakeHolderView {stakeholder} />
            </TabItem>
          {/each}
        </Tabs>
      {/if}
    </div>
  </section>
{:else}
  <div class="p-8">
    <i class="fas fa-spinner fa-spin mr-8" />
    <i class="fas fa-robot" /> Generating Stakeholders
  </div>
{/if}
