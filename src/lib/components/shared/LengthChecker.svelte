<script>
  import { max } from "lodash";

  export let input = "";
  export let maxLength = 100;
  export let minLength = 25;
  export let valid = false;

  $: color = () => {
    if (input.length < minLength) {
      valid = false;

      return "text-gray-500";
    }
    if (input.length > minLength && input.length < maxLength) {
      valid = true;
      return "text-green-500";
    }
    valid = false;
    return "text-red-500";
  };

  $: minReached = input.length > minLength;
  $: maxReached = input.length > maxLength;
</script>

<span class={color()}>
  {#if !minReached}
    Add at least {minLength - input.length} more characters
  {:else if maxReached}
    Oooh, {input.length - maxLength} characters too long
  {:else}
    No more than {maxLength - input.length} characters more
  {/if}
</span>
