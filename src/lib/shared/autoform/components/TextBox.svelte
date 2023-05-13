<script lang="ts">
  import { Input, Label } from "flowbite-svelte";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let element: any = null;
  export let value = "";
</script>

<Label class="mb-3" for={element.id}>{element.label}</Label>
<Input
  label={element.label}
  type="text"
  id={element.id}
  placeholder={element.placeholder}
  required={element.required}
  bind:value
  on:keyup={() => dispatch("change", value)}
/>
