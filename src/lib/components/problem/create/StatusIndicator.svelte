<script>
  export let warning = false;
  export let loading = false;
  export let valid = true;
</script>

<div class="indicator py-2 pr-4 md:pr-8">
{#if warning}
  <i class="fa fa-exclamation-triangle text-yellow-400 text-lg md:text-4xl" />
{:else if loading}
  <i class="fas fa-spinner fa-spin text-gray-400 text-lg md:text-4xl" />
{:else if valid}
  <i class="fa fa-check-circle text-green-400 text-lg md:text-4xl" />
{:else}
  <i class="fa fa-circle text-gray-400 text-lg md:text-4xl" />
{/if}
</div>