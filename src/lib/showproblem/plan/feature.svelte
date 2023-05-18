<script lang="ts">
  import Editable from "$lib/shared/editable.svelte";
  export let value: string = "";
  export let editable: boolean = false;

  function blur() {
    editable  = false;
  }
</script>

<p class="flex p-5 border  bg-white">
  <i class="fa-brands fa-trello mt-1 mr-3 ml-1 text-primary-600" />
  <Editable class="w-full" value={value} editable={editable} on:blur={blur} />
  {#if editable}
    <span>
      <i class="fa-solid fa-remove text-center text-red-500" />
    </span>
  {/if}
</p>
