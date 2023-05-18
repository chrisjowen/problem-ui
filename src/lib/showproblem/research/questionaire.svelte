<script lang="ts">
  import axios from "axios";
  import { Modal } from "flowbite-svelte";
  import { onMount } from "svelte";

  let selectedQuestionaire: any = null;
  let showModal = false;

  let questionaires: any[] = [];
  export let problemId: null | number = null;

  onMount(async () => {
    reload();
  });

  let select = (questionaire: any) => () => {
    selectedQuestionaire = questionaire;
    showModal = true;
  };

  export async function reload() {
    let response = await axios.get(`/api/problem/${problemId}/questionaire`);
    questionaires = response.data;
  }
</script>

<!-- <h1 class="text-2xl mb-3 text-primary-600">Questionaires</h1> -->

{#each questionaires as questionaire}
  <div
    class="flex bg-white border p-3 text-primary-600"
    on:click={select(questionaire)}
  >
    <i
      class="fa-sharp fa-solid fa-clipboard-question text-primary-600 mr-3  text-xs"
    />

    <span class="text-xs">{questionaire.stakeholder.type}</span>
  </div>
{/each}

{#if selectedQuestionaire}
  <Modal bind:open={showModal} class="w-full" size="xl" autoclose>
    <h1 class="text-xl text-primary-600">Questions</h1>

    <div class="pl-4">
      {#each selectedQuestionaire.questions as question}
        <div class="p-2">
          <span class="mr-2 bg-primary-50 p-2">{question.type}</span>
          {question.question}
        </div>
      {/each}
    </div>
  </Modal>
{/if}
