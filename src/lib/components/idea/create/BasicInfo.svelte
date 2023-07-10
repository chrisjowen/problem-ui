<script>
  import MultiSectorSearchSelect from "$lib/components/sector/MultiSectorSearchSelect.svelte";
  import { Button, Helper, Input } from "flowbite-svelte";
  import { createEventDispatcher } from "svelte";

  

  export let value = {
    title: "",
    sectors: [],
  };

  let checked = false;
  let dispatch = createEventDispatcher();

  function valid() {
    dispatch("valid", true);
  }

  export function validate() {
    checked = true;
    if (!value.title || value.title.length < 1 || value.sectors.length == 0) {
      return;
    }
    valid();
  }

  $: errors = {
    title: checked && value.title.length == 0,
    sectors: checked && value.sectors.length == 0,
  };
</script>

<h1 class="text-lg font-bold mb-4">Basic Info</h1>

{#if errors.title}
  <Helper class="mt-2" color="red">
    Please ensure you provide a idea title
  </Helper>
{/if}
<Input
  type="text"
  color={errors.title ? "red" : "light"}
  class="mb-4"
  bind:value={value.title}
  size="lg"
  placeholder="Your idea title i.e. AI Healthcase worker"
/>
<div class="mb-4">
  {#if errors.sectors}
    <Helper class="mt-2" color="red">
      <span class="font-medium">Please select at least one sector</span>
    </Helper>
  {/if}

  <MultiSectorSearchSelect
    color={errors.sectors ? "red" : "light"}
    bind:selected={value.sectors}
  />
</div>
<div class="flex justify-end pt-4">
  <Button size="lg" on:click={validate}
    >Next <i class="fas fa-arrow-right ml-2" />
  </Button>
</div>
