<script lang="ts">
  import axios from "axios";
  import { Card, Button, Modal } from "flowbite-svelte";

  export let problemId: any;
  let showModal = false;
  let solutionOverview : null | string = null;
  let isGenerating = false;


  function onGenerateSolution() {
    isGenerating = true;
    showModal = false;
    axios.post(`/api/ai/advice/solution/overview`, { problem_id: problemId}).then((response) => {
      solutionOverview = response.data.content;
      showModal = false;
      isGenerating = false;
    });
  }

  function onSaveSolution() {
    axios.post(`/api/problem/${problemId}/solution`, { problem_id: problemId, description: solutionOverview}).then((response) => {
        showModal = false;
    });
  }

</script>

<Modal bind:open={showModal} size="xl" autoclose>
  <h1 class="text-xl text-primary-600 mb-4">Generating Solution</h1>
  <div class="pl-4" />
</Modal>

<div class="m-4 flex items-center justify-center">
  <Card size="xl">
    {#if solutionOverview}
      <div class="flex flex-col items-center justify-center">
        <h1 class="text-2xl text-primary-600 mb-1">Solution Overview</h1>
        <div class="pt-4 user-content">
          {@html solutionOverview}
        </div>
        <Button on:click={onSaveSolution}>Looks Liks a Good Start!</Button>
        <Button on:click={onGenerateSolution}>Regenerate</Button>


      </div>
    {:else}
      <div class="flex items-center justify-center h-full">
        <div class="flex flex-col items-center justify-center">
          <i class="fa-solid fa-flask text-9xl text-primary-600 mb-3" />
          <h1 class="text-4xl text-primary-600 mb-4">No Solution</h1>
          <p class="text-primary-600 text-center mb-3">
            There is no solution for this problem yet. Be the first to create
            one!
          </p>
          <p>
            {#if isGenerating}
              <Button disabled>
                <i class="fa-solid fa-spinner fa-spin mr-2" />
                Generating
              </Button>
            {:else}
              <Button on:click={onGenerateSolution}>Generate From Problem Statement</Button>
            {/if}
          </p>
        </div>
      </div>
    {/if}
  </Card>
</div>
