<script lang="ts">
  import { suggestions } from "$lib/store";
  import api from "$lib/api";

  export let checking: boolean = false;
  export let check: null | any = null;
  export let sector: null | any = null;

  let suggestion: any;

  function randomIntFromInterval(min: number, max: number) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  $: {
    if (sector) {
      api.suggestion.list(`sector_id=${sector.id}`).then((res) => {
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
  {#if check.proposedSector.toLowerCase() != sector.name.toLowerCase()}
    <h2>Is This The Correct Sector?</h2>
    <p class="bg-yellow-50 p-2 border">
      <i class="fa fa-exclamation-triangle text-yellow-400 text-lg mr-2" />

      This problem statement seems unrealted to <strong>{sector.name}</strong>
      and more related to <strong>{check.proposedSector}</strong>
    </p>
  {:else if check.score < 70}
    <h2>I Need A Little More Info</h2>
    <p>
      A good problem statement should create awareness and stimulate creative
      thinking.
    </p>
  {:else}
    <h2>The Problem Statement Looks Good</h2>
    <p>
      I think I can use this to generate a template for you, but if you want to
      add more infomtion go ahead.
    </p>
  {/if}
{:else}
  <h2>Describe The Problem Statement</h2>
{/if}

{#if !checking && !check?.hints}
  <p>
    A good problem statement should create awareness and stimulate creative
    thinking.
  </p>
  <p
  class="font-bold text-primary-500  p-2 text-center bg-gray-50  "
>
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
        <i class="fa fa-lightbulb text-yellow-500  mr-2" /> Example
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

 
{:else if !checking}
  <h3>Hints:</h3>
  {#each check.hints as item}
    <ul>
      <li>{item.hint}</li>
    </ul>
  {/each}
{/if}
