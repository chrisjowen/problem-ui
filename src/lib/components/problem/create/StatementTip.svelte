<script lang="ts">
  import { goto } from "$app/navigation";
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
  <h2>Checking Your Idea</h2>
  <p>
    Please bear with me, I'm just checking your Idea to see if there is any
    advice I can give you to help you out
  </p>
{:else if check}
  {#if check.error}
    <h2>Error</h2>
    <p>{check.error}</p>
  {:else if !check.valid}
    <h2>I Need A Little More Info</h2>
    <p>A good idea should create awareness and stimulate creative thinking.</p>
  {:else}
    <h2>The Idea Looks Good</h2>
    <p>
      I think I can use this to generate a template for you, here are some
      sectors that seem relevent to the idea you provided...
    </p>
  {/if}
{:else}
  <h2>
    <i class="fa fa-rocket mr-2 text-primary-400" />
    SolveSpace Creation
  </h2>
{/if}

{#if !checking && !check}
  <p>
    <strong>Hey there,</strong> <br /> Im the SolveSpace Creation AI wizzard, I'm
    here to help you create a space where you can work on your idea and build the
    next unicorn.
  </p>
  <div class=" p-4 !my-8 rounded-lg text-center bg-gray-50 border">
    <p>
      Firstly, telling me your idea but keep it keep it short and sweet, I will
      help you expand it later
    </p>
  </div>

  <h3 class="">Having Trouble Thinking Up An Idea?</h3>
  <p>
    Take a look at our <a href="/ideas">
      <i class="fa fa-lightbulb ml-2 text-yellow-400" />
      AI generated ideas
    </a> for inspiration.
  </p>
  <div class="text-center" />
{:else if !checking && check?.hints && !check?.valid}
  <h3>Hints:</h3>
  {#each check.hints as item}
    <ul>
      <li>{item}</li>
    </ul>
  {/each}
{/if}
