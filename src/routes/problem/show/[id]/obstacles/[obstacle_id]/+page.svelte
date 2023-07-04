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
  import { redirectIfNotLoggedIn } from "$lib/util/authUtil";
  import Gravitar from "$lib/components/shared/Gravitar.svelte";

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
      .get($page.params.obstacle_id, ["state_history.user"])
      .then((res) => {
        obstacle = res.data;
        modalVisible = false;
      });
  }

  function onShowTransitionModal() {
    redirectIfNotLoggedIn();
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
    title="Update Risk"
    bind:open={modalVisible}
    size="xl"
    autoclose={false}
    class="w-full"
  >
    <form class="flex flex-col space-y-6" action="#">
      <Label class="space-y-2">
        <span>State</span>
        <Select
          bind:items={filteredStates}
          bind:value={stateChange.state}
          required
        />
      </Label>
      <Label class="space-y-2">
        <span>Pages</span>
        <Textarea
          name="notes"
          class="h-[200px]"
          placeholder="Why did this changhe state?"
          bind:value={stateChange.notes}
          required
        />
      </Label>

      <Button type="submit" class="w-full" on:click={onUpdateState}
        >Update
      </Button>
    </form>
  </Modal>

  {#if obstacle}
    <div class="m-4 space-y-6">
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
        <h2 class="text-xl text-gray-500 font-bold">Steps To Resolve</h2>
        <ul>
          {#each obstacle.questions as question}
            <li class="px-4 py-1">
              <i class="fa-sharp fa-regular fa-square-check mr-2"></i>
              {question}
            </li>
          {/each}
        </ul>
      </div>

      <div class="border bg-white p-4 space-y-4">
        <h2 class="text-xl text-gray-500 font-bold">Risk History</h2>

        {#each obstacle.state_history as state}
          <div>
            <div class="flex items-center">
              <div class="ml-2">
                <Gravitar user={state?.user} />
              </div>
              <div class="flex items-center text-xs ml-4 text-gray-400">
                <span class="font-bold mr-2"
                  >@{state.user?.username || "unknown"}</span
                >
                transitioned risk to <i class="fas fa-arrow-right mx-4" />
              </div>
              <div class="text-xs inline-block text-gray-400 flex items-center">
                {#if state.state == "resolved"}
                  <i class="fa-solid fa-check-circle text-green-500 mx-1" />
                {:else}
                  <i class="fa-solid fa-exclamation-triangle text-orange-500  mr-1" />
                {/if}
                {state.state.toUpperCase()}
              </div>
            </div>
            <div class="p-4 text-sm prose text-gray-500 ">
              <blockquote>
                {@html state.notes}
              </blockquote>
            </div>
          </div>
        {/each}

        {#if obstacle.state !== "resolved"}
          <div>
            <Button
              size="xs"
              class="w-full"
              color="light"
              on:click={onShowTransitionModal}
            >
              <i class="fa-sharp fa-solid fa-wrench mr-2" />
              Transition
            </Button>
          </div>
        {/if}
      </div>

    
    </div>
  {/if}
</ProblemLayout>
