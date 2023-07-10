<script lang="ts">
  import type { Problem } from "$lib/types";
  import { Button } from "flowbite-svelte";
  import { createEventDispatcher } from "svelte";

  let dispatch = createEventDispatcher();
  export let problem: Problem;

  function activateProblem(): void {
    dispatch("activate", problem);
  }
</script>

<div class="max-w-none p-8 bg-white border-b-[1px] flex-1">
  <div class="prose">
    <h2 class="text-2xl font-bold">Before You Begin Validation:</h2>
    <p class="mb-4">
      Your idea is currently in <span
        class="p-1 px-2 border bg-gray-500 text-white bg-primary-800 font-bold"
        >{problem.status}</span
      > mode
    </p>

    <p>
      In order to continue please make sure you have completed the following
      steps:
    </p>

    <div class="md:mt-4">
      <ul class="p-0">
        <ol class="flex items-center">
          <i class="fas fa-check-circle text-green-500 mr-4" />
          <span>
            Check your <a href="./manage/details">Idea Basic details</a>
          </span>
        </ol>
        <ol class="flex items-center">
          <i class="fas fa-check-circle text-green-500 mr-4" />
          <span>
            Validate the generated <a href="./manage/statement"
              >Problem Statment</a
            >
          </span>
        </ol>
        <ol class="flex items-center">
          <i class="fas fa-check-circle text-green-500 mr-4" />
          <span>
            Confirm we accurately identified your <a
              href="./manage/stakeholders">Stakeholders</a
            >
          </span>
        </ol>
        <ol class="flex items-center">
          <i class="fas fa-check-circle text-green-500 mr-4" />
          <span>
            Check the suggested <a href="./manage/competition">Competition</a>
          </span>
        </ol>

        <!-- <ol class="flex items-center">
            <i class="fas fa-check-circle text-green-500 mr-4" />
            <span>
              Add a message and <a href="./manage/competition"
                >Invite solvers
              </a>
            </span>
          </ol> -->
      </ul>
    </div>

    <div>
      <p class="mt-4">
        Once you have completed the above steps, you can begin the validation
        process.
      </p>
      <Button color="green" class="w-full" size="md" on:click={activateProblem}>
        <i class="fas fa-play mr-2" />Begin Validation</Button
      >
    </div>
  </div>
</div>
