<script lang="ts">
  import axios from "axios";
  import {
    Modal,
    Spinner,
  } from "flowbite-svelte";
  import { onMount } from "svelte";
  import type { Stakeholder } from "$lib/types/stakeholder.ts";
  import Demographics from "../demographics.svelte";
  import Wherewhen from "../wherewhen.svelte";
  
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

<!-- <h1 class="text-2xl text-bold text-primary-900 mb-4">Stakeholders</h1> -->
{#if stakeholders.length != 0}
  {#each stakeholders as stakeholder}
    <div class="flex border bg-white p-3 hover:bg-primary-50" on:click={showInfo(stakeholder)}>
      <i class="fa fa-user text-sm text-primary-900 mr-3" />
      <span class="text-primary-900">{stakeholder.type}</span>
    </div>
  {/each}

  <Modal bind:open={showModal} class="w-full" size="xl" autoclose>
    {#if stakeholder}
      <div class="grid grid-cols-1">
        <div>
          <div>
            <h1 class="mb-2 mt-2 text-3xl text-primary-900">
              {stakeholder.type}
            </h1>
            <p>{@html stakeholder.description}</p>

            <div class=" mt-4 mb-4 bg-gray-50 p-5 border">
              <h1 class="mb-2 mt-2 text-xl text-primary-900">Problems</h1>
              {#each stakeholder.problems as problem}
                <p class="mb-2 ml-4 user-content text-primary-900">
                  <i class="fa fa-warning text-sm  mr-4" />
                  {@html problem}
                </p>
              {/each}
              <div />
            </div>
          </div>
          <div class="grid grid-cols-3 border">
            <div class="col-span-3">
              <div class="grid grid-cols-2">
                <div class="mr-4 p-5">
                  <Wherewhen {stakeholder} />
                </div>
                <div class=" p-5 border-l-[1px]">
                  <Demographics {stakeholder} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    {/if}
  </Modal>
{:else}
  <Spinner color="yellow" size={10} />
{/if}
