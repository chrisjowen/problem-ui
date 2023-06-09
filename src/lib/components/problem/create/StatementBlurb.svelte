<script>
  import LengthChecker from "$lib/components/shared/LengthChecker.svelte";
  import { createEventDispatcher } from "svelte";

  export let blurb = "";

    let dispatch = createEventDispatcher();

  let timer;
  const debounce = () => {
    if (timer) {
      clearTimeout(timer);

    }
    timer = setTimeout(() => {
        dispatch("check", blurb); 
    }, 1200);
  };
</script>

<div class="border">
  <textarea
    on:keyup={debounce}
    bind:value={blurb}
    class="h-[350px] w-full focus:outline-none border-0 bg-white active:outline-0 focus:ring-0"
  />
</div>
<p class="text-xs">
  <LengthChecker bind:input={blurb} maxLength={600} minLength={125} />
</p>
