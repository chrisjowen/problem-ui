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
    if (input.length > minLength && input.length < maxLength) {
      valid = true;
      return "text-green-500";
    }
    valid = false;
    return "text-red-500";
  };
</script>

<span class={color()}>{input.length}/{maxLength} remaining</span>
