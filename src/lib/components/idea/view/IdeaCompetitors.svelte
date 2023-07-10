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

{#if problem.products}
{#each problem.products as product}
  <a class="flex  p-4 hover:bg-primary-100" href={product.url}>
    <div class="mr-4">
      <object
        title={product.name}
        data="https://image.thum.io/get/{product.url}"
        type="image/png"
        class="w-[60px] h-[60px] border"
      >
        <i
          class="fa text-8xl fa-external-link-alt text-primary-300"
        />
      </object>
    </div>
    <div>
      <h1 class="text-lg font-bold text-gray-700">{product.name}</h1>
      <h2  class="text-sm font-bold text-gray-400">{product.url}</h2>
      <p>{@html product.description}</p>
      <p />
    </div>
  </a>
{/each}
{/if}