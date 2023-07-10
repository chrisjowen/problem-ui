<script>
  export let input = "";
  export let maxLength = 100;
  export let minLength = 25;
  export let valid = false;

  $: color = () => {
    if (input.length < minLength) {
      valid = false;
      return "text-gray-500";
    }
    if (input.length >= minLength && input.length <= maxLength) {
      valid = true;
      return "text-green-500";
    }
    valid = false;
    return "text-red-500";
  };

  $: minReached = input.length >= minLength;
  $: maxReached = input.length >= maxLength;
</script>

<span class={color()}>
  {#if !minReached}
  <i class="fas fa-info-circle mr-2" />
    Required {input.length}/{minLength} characters
  {:else if maxReached}
    Oooh, {input.length - maxLength} characters too long
  {:else}
    <i class="fas fa-check mr-2" />
    {maxLength - input.length} characters remaining
  {/if}
</span>
