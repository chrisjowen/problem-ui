<script lang="ts">
  export let solution: any;
  $: features = (solution.keyFeatures || []).slice(0, 5);
</script>

<section class="">
  {#if features.length === 0}
    <p class="text-gray-500">No key features yet.</p>
  {:else}
    {#each features as feature}
      <div class="p-2 border mb-4 bg-white rounded-md">
        <i class="fa-brands fa-trello mt-1 mr-3 ml-1 text-primary-600" />
        {feature}
      </div>
    {/each}
  {/if}
</section>
