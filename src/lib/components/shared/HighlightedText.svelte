<script lang="ts">
  export let q = "";
  export let value = "";

  $: html = highlight(value);

  function highlight(input: any) {
    if (q) {
      return input.replace(
        new RegExp(q, "gi"),
        (match: String) => `<span class="bg-yellow-200">${match}</span>`
      );
    }

    return input;
  }
</script>

{@html html}
