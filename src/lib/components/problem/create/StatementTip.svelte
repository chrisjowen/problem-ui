<script lang="ts">
  import api from "$lib/api";
  import type { PaginationResults } from "$lib/types";
  import { Button } from "flowbite-svelte";

  export let checking: boolean = false;
  export let check: null | any = null;
  export let sector: null | any = null;

  let suggestion: any;
  let suggestions: PaginationResults<any>;

  function randomIntFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function makeSuggestion() {
    if (suggestions) {
      suggestion =
        suggestions.entries[
          randomIntFromInterval(0, res.data.entries.length - 1)
        ];
    } else {
      api.suggestion.list(``).then((res) => {
        suggestions = res.data;
        suggestion =
          res.data.entries[
            randomIntFromInterval(0, res.data.entries.length - 1)
          ];
      });
    }
  }
</script>

{#if checking}
  <h2>Checking your problem statement</h2>
  <p>
    Please bear with me, I'm just checking your problem statement to see if
    there is any advice I can give you to help you out
  </p>
{:else if check}
  {#if check.error}
    <h2>Error</h2>
    <p>{check.error}</p>
  {:else if !check.valid}
    <h2>I Need A Little More Info</h2>
    <p>
      A good problem statement should create awareness and stimulate creative
      thinking.
    </p>
  {:else}
    <h2>The Problem Statement Looks Good</h2>
    <p>
      I think I can use this to generate a template for you, here are some
      sectors that seem relevent to the problem statement you provided...
    </p>
  {/if}
{:else}
  <h2>Describe The Problem Statement</h2>
{/if}

{#if !checking && !check}
  <p>
    A good problem statement should create awareness and stimulate creative
    thinking.
  </p>
  <p class="font-bold text-primary-500 p-2 text-center bg-gray-50">
    N.B. Keep it short and concise, I will help you expand it later
  </p>
  <p>
    It should <span class="underline">
      not identify a solution or create a bias toward a specific strategy</span
    >.
  </p>

  {#if suggestion}
    <div class="p-4 bg-yellow-50">
      <h2 class="!text-yellow-500">
        <i class="fa fa-lightbulb text-yellow-500 mr-2" /> Example
      </h2>
      <p><strong>{suggestion.title}:</strong> {suggestion.blurb}</p>
    </div>
  {:else}
    <p>It should identify the:</p>

    <ul>
      <li><strong>Who:</strong> Who is currently experiencing the problem</li>
      <li><strong>What:</strong> What is the problem experienced</li>
      <li><strong>Why:</strong> Why is this a problem</li>
      <li>
        <strong>When:</strong> Has this always been a problem or is it just a recent
        thing
      </li>
    </ul>

  {/if}
  <Button on:click={makeSuggestion} class="mt-2 w-full">Give Me A Suggestion</Button>

{:else if !checking && check?.hints && !check?.valid}
  <h3>Hints:</h3>
  {#each check.hints as item}
    <ul>
      <li>{item}</li>
    </ul>
  {/each}
{/if}
