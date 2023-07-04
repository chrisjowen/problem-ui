<script lang="ts">
  import api from "$lib/api";
  import MultiSectorSearchSelect from "$lib/components/sector/MultiSectorSearchSelect.svelte";
  import StatementTip from "$lib/components/problem/create/StatementTip.svelte";
  import type { Sector } from "$lib/types";
  import { Button, Input, Label, StepIndicator } from "flowbite-svelte";
  import { onMount } from "svelte";
  import { auth, state } from "$lib/store";
  import { isLoggedIn, redirectIfNotLoggedIn } from "$lib/util/authUtil";
  import AiHelper from "$lib/components/shared/AiHelper.svelte";
  import BlurbInput from "$lib/components/problem/create/BlurbInput.svelte";
  import StatusIndicator from "$lib/components/problem/create/StatusIndicator.svelte";
  import ProblemCreateSteps from "$lib/components/problem/create/ProblemCreateSteps.svelte";
  import { page } from "$app/stores";
  import Editor from "$lib/components/shared/editor/Editor.svelte";
  import LoginModal from "$lib/components/shared/LoginModal.svelte";

  let idea = {
    title: "",
    sectors: [],
    description: "",
  };

  function onReview() {}
</script>

{#if $state?.sectors?.entries?.length > 0}
  <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 h-full">
    <section id="sector" class="md:bg-white col-span-1 xl:col-span-2">
      <div class="p-4">
        <div class="mb-4 border-b-[1px]">
          <Label>Title</Label>
          <Input type="text" class="text-xl" bind:value={idea.title} />
        </div>

        <div class="mb-4">
          <Label>Description</Label>

          <div class="border h-[300px]">
            <Editor
              height="full"
              bind:html={idea.description}
              simple={true}
              showFullscreen={false}
            />
          </div>
        </div>

        <div class="pb-4 mb-4">
          <Label>Sectors</Label>

          <MultiSectorSearchSelect bind:selected={idea.sectors} />
        </div>

        <div class="p-2 border-t-[1px] z-30 flex justify-end">
          {#if $auth.loggedInUser}
            <Button size="xs" on:click={onReview}>
              <i class="fas fa-robot mr-2" />
              Review My Idea
            </Button>
          {:else}
            <LoginModal let:click>
              <Button size="xs" on:click={click} color="light">
                <i class="fas fa-sign-in-alt mr-2" />
                Login To Submit
              </Button>
            </LoginModal>
          {/if}
        </div>
      </div>
    </section>
    <seciton
      id="helper"
      class="bg-gray-100 flex justify-center items-top col-span-1 min-h-[150px] w-full"
    >
      <div class="flex-1 flex w-full hidden md:block">
        <AiHelper />
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


<!-- Earn the write methadolgy -->
<!-- Vision statement - all rainbows and good news -->
<!-- Enabling great minds fo find problems worth solving.  -->