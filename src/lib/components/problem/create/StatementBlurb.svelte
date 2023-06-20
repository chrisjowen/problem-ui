<script>
  import LengthChecker from "$lib/components/shared/LengthChecker.svelte";
  export let blurb = "";
</script>

<div class="border">
  <textarea
    bind:value={blurb}
    class="h-[350px] w-full focus:outline-none border-0 bg-white active:outline-0 focus:ring-0"
  />
</div>
<p class="text-xs">
  <LengthChecker bind:input={blurb} maxLength={600} minLength={125} />
</p>
