<script lang="ts">
  import api from "$lib/api";
  import MultiSectorSearchSelect from "$lib/components/sector/MultiSectorSearchSelect.svelte";
  import StatementTip from "$lib/components/problem/create/StatementTip.svelte";
  import type { Sector } from "$lib/types";
  import { Button, Input, Label, StepIndicator } from "flowbite-svelte";
  import { onMount } from "svelte";
  import { state } from "$lib/store";
  import { redirectIfNotLoggedIn } from "$lib/util/authUtil";
  import AiHelper from "$lib/components/shared/AiHelper.svelte";
  import BlurbInput from "$lib/components/problem/create/BlurbInput.svelte";
  import StatusIndicator from "$lib/components/problem/create/StatusIndicator.svelte";
  import ProblemCreateSteps from "$lib/components/problem/create/ProblemCreateSteps.svelte";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";

  onMount(redirectIfNotLoggedIn);

  let watch: (traceId: String) => Promise<void>;
  let sector: null | Sector;
  let check: any = null;
  let isChecking = false;
  let currentStep = 1;
  let createdProblemId: null | string | number = null;
  let onCheck: () => void;
  let steps = [
    "Step 1 - Describe Your Idea",
    "Step 2 - Select The Relevent Sectors",
  ];
  let form = {
    blurb: "",
    sectors: [],
    title: ""
  };

  onMount(() => {
    if ($page.params.ideaId) {
      api.ideas.get($page.params.ideaId, ["sectors"]).then((res) => {
        let idea = res.data;
        form.blurb = `${idea.title}: ${idea.description}`;
        form.sectors = idea.sectors;
        setTimeout(onCheck, 0);
      });
    }
  });


  function createProblem() {
    api.problem
      .create({
        ...form,
        sector_ids: form.sectors.map((s: any) => s.id),
      })
      .then(async (res) => {
        goto(`/problem/show/${res.data.id}`);
      });
  }

  function onBlurbPassed() {
    let proposedSectors = check.proposedSectors.map((s: any) =>
      s.toLowerCase()
    );
    form.sectors = $state.sectors.entries.filter(
      (s: any) => proposedSectors.indexOf(s.name.toLowerCase()) > -1
    );
    currentStep = 2;
  }

  function onProblemCreated(e: CustomEvent<any>): void {
    createdProblemId = e.detail;
  }
</script>

{#if $state?.sectors?.entries?.length > 0}
  <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 h-full">
    <section id="sector" class="md:bg-white col-span-1 xl:col-span-2">
      <div class="p-4 mb-4 bg-gray-50 hidden md:block">
        <StepIndicator {currentStep} {steps} />
      </div>

      <div
        class="p-4 m-4 prose prose-h2:m-0 text-sm bg-white mb-2 md:hidden rounded-xl flex flex-shrink-0"
      >
        <div class="flex items-start flex-shrink-0 mx-6 hidden md:block">
          <img src="/img/ai.png" class="h-[60px]" alt="robot" />
        </div>
        <div>
          {#if currentStep == 1 || currentStep == 2}
            <StatementTip {check} bind:checking={isChecking} bind:sector />
          {:else if createdProblemId == null}
            <h2>Your problem is being created!</h2>
            <p>You can sit back and relax while I do the heavy lifting.</p>
          {:else}
            <h2>Congratulations, Your Problem Has Been Created</h2>
            <p>
              <a href="/problem/show/{createdProblemId}">View Problem</a>
            </p>
          {/if}
        </div>
      </div>

      {#if currentStep == 1 || currentStep == 2}
      <section class="flex p-4">
        <div class="hidden md:block">
          <StatusIndicator
            valid={form.title.length > 5}
          />
        </div>

        <div class="flex-1">
          <Label>Title</Label>
          <Input type="text" bind:value={form.title} />
        </div>
      </section>

        <BlurbInput
          bind:onCheck
          bind:blurb={form.blurb}
          bind:check
          bind:checking={isChecking}
          on:passed={onBlurbPassed}
        />
        {#if currentStep == 2}
          <section class="flex p-4">
            <div class="hidden md:block">
              <StatusIndicator
                warning={form.sectors.length == 0}
                valid={form.sectors.length > 0}
              />
            </div>

            <div class="flex-1">
              <h1>Select Relevent Sectors</h1>
              <MultiSectorSearchSelect bind:selected={form.sectors} />
            </div>
          </section>
          <div class="p-4 md:p-8">
            <Button
              color="primary"
              class=" w-full"
              disabled={form.sectors.length == 0}
              on:click={createProblem}
            >
              <i class="fas fa-robot mr-2" />
              Generate My Idea
            </Button>
          </div>
        {/if}
      {:else}
        <section class="p-4">
          <ProblemCreateSteps bind:watch on:created={onProblemCreated} />
        </section>
      {/if}
    </section>
    <seciton
      id="helper"
      class="bg-gray-100 flex justify-center items-top col-span-1 min-h-[150px] w-full"
    >
      <div class="flex-1 flex w-full hidden md:block">
        <AiHelper>
          {#if currentStep == 1 || currentStep == 2}
            <StatementTip {check} bind:checking={isChecking} bind:sector />
          {:else if createdProblemId == null}
            <h2>Your SolveSpace is being created!</h2>
            <p>You can sit back and relax while I do the heavy lifting.</p>
          {:else}
            <h2>Congratulations, Your SolveSpace Has Been Created</h2>
            <p class="p-4 bg-primary-100">
              <a href="/problem/show/{createdProblemId}">
                <i class="fas fa-robot mr-2" />
                View SolveSpace</a
              >
            </p>
          {/if}
        </AiHelper>
      </div>
    </seciton>
  </div>
{/if}

<style lang="scss">
  .speech-bubble {
    background: white;
    padding: 40px;
    border-radius: 20px;
    min-height: 150px;
    position: relative;

    &:after {
      content: "";
      position: absolute;
      bottom: 0;
      right: 50px;
      width: 0;
      height: 0;
      border: 20px solid transparent;
      border-top-color: white;
      border-bottom: 0;
      border-left: 0;
      margin-left: -10px;
      margin-bottom: -20px;
    }
  }
</style>
