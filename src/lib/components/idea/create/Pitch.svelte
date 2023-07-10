<script lang="ts">
  import api from "$lib/api";
  import LengthChecker from "$lib/components/shared/LengthChecker.svelte";
  import Editor from "$lib/components/shared/editor/Editor.svelte";
  import { Button, Helper, Input, Textarea } from "flowbite-svelte";
  import { createEventDispatcher } from "svelte";

  export let value = "";
  let checked = false;
  let validLength: boolean;
  let validationResult = null;
  let dispatch = createEventDispatcher();
  let checking = false;

  function valid() {
    dispatch("valid", true);
  }

  export function onCheck() {
    if (!checking) {
      checking = true;
      api.aiProblem.precheck(value).then((response) => {
        checking = false;
        validationResult = response.data;
        console.log(validationResult)
        if (!validationResult.error && validationResult.score > 70) {
          valid();
        }
      });
    }
  }

  export function validate() {
    checked = true;
    if (!value || !validLength) {
      return;
    }

    onCheck();
  }

  $: errors = {
    pitch: checked && !validLength,
  };
</script>

<h1 class="text-lg font-bold mb-4">The Pitch</h1>

{#if errors.pitch}
  <Helper class="mt-2" color="red">
    Invalid pitch, please check the length
  </Helper>
{:else if validationResult && validationResult.score < 70}
  <Helper class="mt-2" color="red">
    Your pitch is too unclear, please elaborate a little more
  </Helper>
{:else if validationResult && validationResult.error}
  <Helper class="mt-2" color="red">
    {validationResult.error}
  </Helper>
{/if}
<Textarea
  class="border bg-white {errors.pitch
    ? '!border-red-400'
    : ''} h-[200px] overflow-auto"
  bind:value
/>
<div class="flex justify-end text-xs">
  <LengthChecker
    input={value}
    bind:valid={validLength}
    minLength={75}
    maxLength={350}
  />
</div>

<div class="flex justify-end pt-4">
  {#if !checking}
    <Button size="lg" on:click={validate}
      >Next <i class="fas fa-arrow-right ml-2" />
    </Button>
  {:else}
    <Button size="lg" color="red" enabled={false} on:click={validate}
      >Checking
      <i class="fas fa-spinner animate-spin ml-2" />
    </Button>
  {/if}
</div>
