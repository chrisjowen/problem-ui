<script lang="ts">
  import LengthChecker from "$lib/components/shared/LengthChecker.svelte";
  import { Button, Helper, Input, Textarea } from "flowbite-svelte";
  import { createEventDispatcher } from "svelte";

  export let value = {
    description: "",
    features: [""],
  };

  let checked = false;
  let validLength: boolean = false;
  let dispatch = createEventDispatcher();

  function valid() {
    dispatch("valid", true);
  }

  export function validate() {
    checked = true;
    setTimeout(() => {
      if (errors.features) {
        return;
      }
      valid();
    }, 1);
  }

  let deleteFeature = (idx: number) => () => {
    let temp = [...value.features];
    temp.splice(idx, 1);
    value.features = temp;
  };

  let addFeature = () => {
    value.features = [...value.features, ""];
  };

  $: invalidFeatures =
    value?.features.length == 0 ||
    value?.features.find((f: string) => f == "") != null;

  $: errors = {
    description: !validLength && checked,
    features: invalidFeatures && checked,
  };
</script>

<div class="hidden">
  <h1 class="text-lg font-bold mb-4">Solution Overview</h1>
  {#if errors.description}
    <Helper class="mt-2" color="red">
      Please ensure you describe your solution
    </Helper>
  {/if}
  <Textarea
    class="border bg-white {errors.description
      ? '!border-red-400'
      : ''} h-[150px] overflow-auto"
    bind:value={value.description}
  />
  <div class="flex justify-end text-xs">
    <LengthChecker
      input={value.description}
      bind:valid={validLength}
      minLength={75}
      maxLength={350}
    />
  </div>
</div>

<div class="mb-4">
  <h1 class="text-lg font-bold my-4 flex-1">Killer Features</h1>
  {#if errors.features}
    <Helper class="mt-2" color="red">
      <span class="font-medium">Please add at least one feature</span>
    </Helper>
  {/if}

  {#each value.features as feature, idx}
    <div class="flex items-center">
      <div class="flex-1 mb-2 flex text-primary-700">
        <i class="fa-brands fa-trello mr-2 text-3xl" />
        <Input
          bind:value={feature}
          size="lg"
          class={checked && feature.length == 0 ? "!border-red-400" : ""}
        >
          <button
            slot="right"
            class="p-2 hover:text-red-500"
            on:click={deleteFeature(idx)}
          >
            <i class="fas fa-close" />
          </button>
        </Input>
      </div>
    </div>
  {/each}

  <div class="flex w-full justify-end">
    <Button size="xs" color="light" on:click={addFeature}>
      Add Feature<i class="fas fa-add ml-2" />
    </Button>
  </div>
</div>
<div class="flex justify-end pt-4">
  <Button size="lg" on:click={validate}
    >Next <i class="fas fa-arrow-right ml-2" />
  </Button>
</div>
