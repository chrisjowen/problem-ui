<script lang="ts">
  import api from "$lib/api";
  import StatusIndicator from "$lib/components/problem/create/StatusIndicator.svelte";
  import LengthChecker from "$lib/components/shared/LengthChecker.svelte";
  import { Button } from "flowbite-svelte";
  import { createEventDispatcher } from "svelte";
  export let blurb = "";
  export let checking = false;
  export let check: any = null;

  let valid = false;
  let warning = false;
  let dispatch = createEventDispatcher();

  function onTyping() {
    valid = false;
    warning = false;
  }

  export function onCheck() {
    if (!checking) {
      valid = false;
      warning = false;
      checking = true;

      api.aiProblem
        .precheck(blurb)
        .then((response) => {
          checking = false;
          check = response.data;

          if (check.error || check.score < 70) {
            check.valid = false;
            warning = true;
            valid = false;
          } else {
            check.valid = true;
            warning = false;
            valid = true;
            dispatch("passed", check);

          }
        })
       
    }
  }
</script>

<section class="flex p-4">
  <div class="hidden md:block">
    <StatusIndicator bind:warning bind:loading={checking} bind:valid />
  </div>
  <div class="mb-4 flex-1">
    <h1>Describe Your SolveSpace's Core Problem To Solve</h1>
    <div class="border">
      <textarea
        on:keydown={onTyping}
        on:click={onTyping}
        bind:value={blurb}
        class="h-[200px] md:h-[350px]
          w-full focus:outline-none border-0 bg-white active:outline-0 focus:ring-0"
      />
    </div>
    <p class="text-xs pt-4">
      <LengthChecker bind:input={blurb} maxLength={500} minLength={100} />
    </p>

    {#if !valid}
      <div class="flex justify-end">
        <Button on:click={onCheck}   disabled={checking} class="w-full md:w-auto mt-4">
          <i class="fa fa-robot mr-2" />
          Validate My Idea
        </Button>
      </div>
    {/if}
  </div>
</section>
