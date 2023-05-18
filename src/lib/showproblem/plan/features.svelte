<script lang="ts">
  import Feature from "./feature.svelte";
  export let solution: any;
  export let problemId: any;
  export let editable = false;
  import { suggestions } from "$lib/store";
  import axios from "axios";
  import { Button, Modal } from "flowbite-svelte";

  $: features = solution.keyFeatures || [];

  let suggestedFeatures: any[] = [];
  let isSuggestionsLoading = false;
  let showModal = false;

  export function suggest() {
    isSuggestionsLoading = true;
    showModal = suggestedFeatures.length > 0;

    axios
      .post(`/api/ai/advice/solution/features`, {
        problem_id: problemId,
        solution_id: solution.id,
      })
      .then((response) => {
        console.log(response);
        showModal = true;
        suggestions.update((data) => {
          isSuggestionsLoading = false;
          data.features = data.features.concat(response.data.features);
          return data;
        });
      })
      .catch((error) => {
        isSuggestionsLoading = false;
        console.log(error);
      });
  }

  let addFeatures = (passedFeatures: any[]) => () => {
    if (solution.keyFeatures == null) {
      solution.keyFeatures = [];
    }
    solution.keyFeatures = solution.keyFeatures.concat(
      passedFeatures.map((f) => f.name)
    );
    suggestions.update((data) => {
      data.features = data.features.filter(
        (feature) => !passedFeatures.includes(feature)
      );
      return data;
    });

    console.log(solution.features);
  };

  suggestions.subscribe((value) => {
    suggestedFeatures = value.features;
  });
</script>

<section>
  {#if features.length === 0}
    <p class="text-gray-500">No key features yet.</p>
  {:else}
    {#each features as feature}
      <div class="p-2">
  <i class="fa-brands fa-trello mt-1 mr-3 ml-1 text-primary-600" />
        {feature}
      </div>
    {/each}
  {/if}
</section>

<Modal bind:open={showModal} size="full">
  <h1 class="mb-4 text-xl text-primary-600">Suggested Features</h1>

  <div class="mb-3 text-xs flex justify-end">
    <Button size="xs" on:click={suggest}>
      <i class="fa-solid fa-robot mr-2" />
      AI Suggest Features</Button
    >
    <Button
      size="xs"
      on:click={addFeatures(suggestedFeatures)}
      color="red"
      class="ml-6"
      ><i class="fa-solid fa-plus-circle mr-2" /> Add All Features</Button
    >
  </div>
  {#if suggestedFeatures.length > 0}
    <div class="grid grid-cols-1 gap-2">
      {#each suggestedFeatures as feature}
        <div class="border bg-white p-3 flex">
          <i class="fa-solid fa-robot text-2xl text-primary-600 mb-3 mr-6" />
          <div class="flex-1">
            <h1 class="text-md mb-2">{feature.name}</h1>
            <p class="text-xs mb-2">{feature.description}</p>
          </div>
          <div>
            <Button size="xs" on:click={addFeatures([feature])} color="light"
              ><i class="fa-solid fa-plus-circle mr-2" /> Add
            </Button>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</Modal>
