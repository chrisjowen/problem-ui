<script lang="ts">
  import { page } from "$app/stores";
  import api from "$lib/api";
  import SectorSearchSelect from "$lib/components/SectorSearchSelect.svelte";
  import ProblemCreateSteps from "$lib/components/problem/create/ProblemCreateSteps.svelte";
  import StatementBlurb from "$lib/components/problem/create/StatementBlurb.svelte";
  import StatementTip from "$lib/components/problem/create/StatementTip.svelte";
  import StatusIndicator from "$lib/components/problem/create/StatusIndicator.svelte";
  import type { Sector } from "$lib/types";
  import { StepIndicator, Button } from "flowbite-svelte";
  import { onMount } from "svelte";

  import { redirectIfNotLoggedIn } from "$lib/util/authUtil";
  import AiHelper from "$lib/components/shared/AiHelper.svelte";

  onMount(redirectIfNotLoggedIn);

  let watch: Function;
  let sector: null | Sector;
  let valid = false;
  let check: any = null;
  let isChecking = false;
  let canCheck = true;
  let currentStep = 1;
  let steps = [
    "Step 1 - Select The Problem's Sector",
    "Step 2 - Describe The Problem",
    "Step 3 - Sit Back And Relax",
  ];
  let form = {
    title: "",
    blurb: "",
  };
  let lastLength = 0;

  function onSectorSelected(e: CustomEvent<Sector>): void {
    sector = e.detail;
    currentStep = 2;
    check = null;
    checkHints();
  }

  function checkHints() {
    if (!sector || !canCheck) {
      return;
    }
    if (form.blurb.length > 75 && !isChecking) {
      valid = false;
      isChecking = true;
      lastLength = form.blurb.length;
      api.aiProblem
        .precheck(form.blurb, sector.name)
        .then((response) => {
          check = response.data;
          isChecking = false;
          valid = check.score >= 70;
        })
        .catch((err) => {
          isChecking = false;
          valid = false;
        });
    }
  }

  function buildTemplate() {
    currentStep = 3;
    api.workflow
      .template({
        sector_id: sector!.id,
        statement: form.blurb,
      })
      .then(async (res) => {
        watch(res.data.trace_id);
      });
  }

  $: warning =
    check &&
    check?.proposedSector?.toLowerCase() != sector?.name?.toLowerCase();
  $: hasSector = sector != null;
</script>

<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 h-full">
  <section id="sector" class="bg-white col-span-1 xl:col-span-2">
    <div class="p-4 mb-4 bg-gray-50">
      <StepIndicator {currentStep} {steps} />
    </div>

    <div class="p-4">
      {#if currentStep != 3}
        <section id="SectorSearch" class="flex p-4 mb-4">
          <StatusIndicator bind:valid={hasSector} />
          <div class="flex-1">
            <SectorSearchSelect
              initialSectorId={$page.params.sectorId}
              on:select={onSectorSelected}
            />
          </div>
        </section>
        {#if sector}
          <section id="BlurbContent" class="flex p-4">
            <StatusIndicator
              bind:warning
              bind:loading={isChecking}
              bind:valid
            />
            {#if currentStep == 2}
              <div class="flex-1">
                <div class="mb-4">
                  <StatementBlurb
                    bind:blurb={form.blurb}
                    on:check={checkHints}
                  />
                  {#if valid}
                    <div class="flex justify-end">
                      <Button
                        on:click={buildTemplate}
                        class="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600"
                      >
                        <i class="fa fa-arrow-right mr-2" />
                        Generate Problem Statement Template
                      </Button>
                    </div>
                  {/if}
                </div>
              </div>
            {:else}
              <div
                class="bg-white h-[150px] overflow-hidden p-4 border text-gray-200"
              >
                {form.blurb}
              </div>
            {/if}
          </section>
        {/if}
      {/if}

      {#if currentStep == 3}
        <section class=" p-4">
          <ProblemCreateSteps bind:watch />
        </section>
      {/if}
    </div>
  </section>
  <seciton
    id="helper"
    class="bg-gray-100 flex justify-center items-top col-span-1 min-h-[150px]"
  >
    <div class="flex-1 m-8">
      <AiHelper>
        {#if currentStep == 1 || !sector}
          <h2>Select Your Sector</h2>
          <p>
            Select the sector that is most affected by this problem, dont worry
            you can change this later
          </p>
        {:else if currentStep == 2}
          <StatementTip {check} bind:checking={isChecking} bind:sector />
        {:else if currentStep == 3}
          <h2>
            <i class="fa fa-smile mr-2" />
            Thanks For The Problem Suggestion
          </h2>
          <p>
            Ok, let me generate a problem statement template for you to use... <strong
              >This may take a little while</strong
            >
          </p>
        {/if}
      </AiHelper>
    </div>
  </seciton>
</div>

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
