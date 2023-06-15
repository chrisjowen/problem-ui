<script lang="ts">
  import { classNames } from "classnames";
  import { state } from "$lib/store";
  import { page } from "$app/stores";
  import api from "$lib/api";
  import ProblemLayout from "$lib/components/problem/ProblemLayout.svelte";
  import type { Obstacle } from "$lib/types";
  import {
    Button,
    Checkbox,
    Input,
    Label,
    Modal,
    Popover,
    Select,
    Textarea,
  } from "flowbite-svelte";
  import { onMount } from "svelte";

  let problem: any = null;
  let obstacle: null | Obstacle = null;
  let modalVisible = false;

  let stateChange = {
    state: "owned",
    notes: "",
  };

  let states = [
    { value: "owned", name: "Owned" },
    { value: "resolved", name: "Resolved" },
    { value: "accepted", name: "Accepted" },
    { value: "mitigated", name: "Mitigated" },
  ];

  $: filteredStates = states.filter((s) => s.value !== obstacle?.state);

  onMount(loadObstacle);

  function loadObstacle() {
    api.problem
      .obstacles($page.params.id)
      .get($page.params.obstacle_id)
      .then((res) => {
        obstacle = res.data;
        modalVisible = false;
      });
  }

  function onShowTransitionModal() {
    stateChange = {
      state: "owned",
      notes: "",
    };
    modalVisible = true;
  }

  function onUpdateState() {
    let states = (obstacle.state_history || []).concat([stateChange]);

    api.problem
      .obstacles($page.params.id)
      .update(obstacle.id, { state_history: states, state: stateChange.state })
      .then(loadObstacle);
  }
</script>

<ProblemLayout bind:problem>
  <Modal
    title="Update State"
    bind:open={modalVisible}
    size="xl"
    autoclose={false}
    class="w-full"
  >
    <form class="flex flex-col space-y-6" action="#">
      <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
        Sign in to our platform
      </h3>
      <Label class="space-y-2">
        <span>State</span>
        <Select
          bind:items={filteredStates}
          bind:value={stateChange.state}
          required
        />
      </Label>
      <Label class="space-y-2">
        <span>Notes</span>
        <Textarea
          name="notes"
          class="h-[200px]"
          placeholder="Why did this changhe state?"
          bind:value={stateChange.notes}
          required
        />
      </Label>

      <Button type="submit" class="w-full" on:click={onUpdateState}
        >Update State</Button
      >
    </form>
  </Modal>

  {#if obstacle}
    <div class="m-8 space-y-6">
      <h1 class="text-2xl text-primary-500 font-bold">
        {obstacle.description}
      </h1>

      <div>
        {#each obstacle.tags as tag}
          <span
            class="text-xs bg-primary-300 p-2 mr-1 mb-1 inline-block text-white"
          >
            #{tag}
          </span>
        {/each}
      </div>

      <div class="border bg-white p-4 space-y-4">
        <h2 class="text-xl text-gray-500 font-bold">Questions To Resolve</h2>
        <ul>
          {#each obstacle.questions as question}
            <li class="px-4 py-1">
              <i class="fa-solid fa-circle-question mr-2" />
              {question}
            </li>
          {/each}
        </ul>
      </div>

      <div class="border bg-white p-4 space-y-4">
        <h2 class="text-xl text-gray-500 font-bold">Risk History</h2>

        <div class="flex">
          <span
            class="text-xs p-2 mr-1 ml-1 mb-1 inline-block text-gray-400 "
          >

            NEW
          </span>

          <span class="mt-1 mx-3">
            <i class="fas fa-chevron-right text-gray-500" />
          </span>

          {#each obstacle.state_history as state}
            <span
              class="text-xs  p-2 mr-1 ml-1 mb-1 inline-block text-gray-400 "
            >
              <i class="fa-solid fa-exclamation-triangle mr-1" />

              {state.state.toUpperCase()}
            </span>

            <Popover class="w-96 text-sm font-light" defaultClass="" title="notes">
              <div class="p-4 prose">
                {@html state.notes}
              </div>
            </Popover>

            {#if state.state !== "resolved"}
              <span class="mt-1 mx-3">
                <i class="fas fa-chevron-right text-gray-500" />
              </span>
            {/if}
          {/each}

          {#if obstacle.state !== "resolved"}
            <div>
              <Button size="xs" color="light" on:click={onShowTransitionModal}>
                <i class="fa-sharp fa-solid fa-wrench mr-2" />
                Transition
              </Button>
            </div>
          {/if}
        </div>
      </div>

      <div class="bg-yellow-50 p-8 border">
        <div class="flex mb-4">
          <h2 class="text-xl text-gray-500 font-bold">Suggestion</h2>
        </div>
        <p>{obstacle.hint}</p>
      </div>
    </div>
  {/if}
</ProblemLayout>
