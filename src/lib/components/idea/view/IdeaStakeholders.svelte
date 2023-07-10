<script lang="ts">
  import StakeHolderView from "$lib/components/customers/StakeHolderView.svelte";
  import type { Problem, Stakeholder } from "$lib/types";
  import { imageUrl } from "$lib/util/imageutil";
  import { Modal } from "flowbite-svelte";
  export let problem: Problem;

  let showModel = false;
  let selected: Stakeholder;

  let showStakeholder = (stakeholder: Stakeholder) => () => {
    selected = stakeholder;
    showModel = true;
  };
</script>

<Modal bind:open={showModel} size="xl" class="w-full" title="Stakeholder Overview">
  <StakeHolderView stakeholder={selected} />
</Modal>

{#if problem.stakeholders}
  {#each problem.stakeholders as stakeholder}
    <button on:click={showStakeholder(stakeholder)} class="hover:bg-primary-50 p-4 w-full text-left flex">
      {#if stakeholder.img}
        <img
          src={imageUrl(stakeholder.img)}
          class="w-[50px] h-[50px] border mr-5"
          alt="stakeholder"
        />
      {/if}
      <div class="flex-1">
        <h1 class="text-lg font-bold">{stakeholder.type}</h1>
        {@html stakeholder.description}
      </div>
    </button>
  {/each}
{/if}
