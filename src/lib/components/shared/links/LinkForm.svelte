<script lang="ts">
  import type { Link } from "$lib/types";
  import {
    Button,
    ButtonGroup,
    Helper,
    Input,
    InputAddon,
    Label,
    Select,
  } from "flowbite-svelte";
  import { createEventDispatcher, onMount } from "svelte";

  export let link: null | Link;

  let form = {
    image: null,
    icon: null,
    text: "",
    url: "",
    type:"other"
  };


  let types = [
    {value:"product", name: "Related Product"},
    {value:"learning", name: "Learning Resource"},
    {value:"other", name: "Other"},
  ]

  let dispatch = createEventDispatcher();

  onMount(() => {
    if (link) {
      form = { ...form, ...link };
    }
  });
  function emitLink() {
    dispatch("update", { ...link, ...form });
  }
</script>

<div>
  <div class="mb-6">
    <Label for="url" class="block mb-2">Url</Label>

    <ButtonGroup class="w-full">
      <InputAddon class=" bg-primary-100">
        <i class="fa fa-link" />
      </InputAddon>
      <Input id="url" type="text" size="lg" bind:value={form.url} />
    </ButtonGroup>
    <!-- <Helper class="mt-2" color="red"
      ><span class="font-medium">Invalid URL</span> - Url must be valid</Helper
    > -->
  </div>
  <div class="mb-6">
    <Label for="text" class="block mb-2">Text</Label>
    <ButtonGroup class="w-full">
      <Input id="text" type="text" size="lg" bind:value={form.text} />
    </ButtonGroup>
  </div>

  <div class="mb-6">
    <Label>
      Type
      <Select class="mt-2" size="lg" items={types} bind:value={form.type} />
    </Label>
  </div>
</div>

<div class="flex justify-end mt-4">
  <Button size="xs" class="bg-primary-400" on:click={emitLink}>
    {link?.id ? "Update" : "Create"} Link
  </Button>
</div>
