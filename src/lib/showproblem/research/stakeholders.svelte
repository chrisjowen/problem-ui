<script lang="ts">
  import axios from "axios";
  import { Card, Modal, Spinner } from "flowbite-svelte";
  import { onMount } from "svelte";
  import type { Stakeholder } from "$lib/types/stakeholder.ts";
  import Demographics from "./demographics.svelte";
  import Wherewhen from "./wherewhen.svelte";
  import Persona from "./persona.svelte";

  let stakeholders: Stakeholder[] = [];
  let showModal = false;
  let stakeholder: Stakeholder = null;

  export let problemId: null | number = null;

  onMount(async () => {
    reload();
  });

  let showInfo = (selected: Stakeholder) => () => {
    stakeholder = selected;
    showModal = true;
  };

  export async function reload() {
    let response = await axios.get(`/api/problem/${problemId}/stakeholder`);
    stakeholders = response.data;
  }
</script>

<!-- <h1 class="text-2xl text-bold text-primary-600 mb-4">Stakeholders</h1> -->
{#if stakeholders.length != 0}
  {#each stakeholders as stakeholder}
    <div
      class="flex border bg-white p-3 hover:bg-primary-50"
      on:click={showInfo(stakeholder)}
    >
      <i class="fa fa-user text-xs text-primary-600 mr-3" />
      <span class="text-primary-600 text-xs">{stakeholder.type}</span>
    </div>
  {/each}

  <Modal bind:open={showModal} class="w-full" size="xl" autoclose>
    {#if stakeholder}
      <div class="grid grid-cols-1">
        <div>
          <h1 class="mb-3 mt-2 text-3xl text-primary-600">
            {stakeholder.type}
          </h1>
          <p class="mb-5">{@html stakeholder.description}</p>

          <h1 class="mb-2 text-xl text-primary-600">Problems</h1>
          {#each stakeholder.problems as problem}
            <p class="mb-2 user-content text-primary-600 border p-4">
              <i class="fa fa-warning text-sm mr-4" />
              {@html problem}
            </p>
          {/each}
          <div class="mb-3">
            <Wherewhen {stakeholder} />
          </div>
          <div class="mb-3">
            <Demographics {stakeholder} />

          </div>
        </div>

        <!-- <div class="m-4">
          <Persona />
        </div> -->
      </div>
    {/if}
  </Modal>
{/if}
