<script lang="ts">
  import type { Link } from "$lib/types";
  import {
    Button,
    ButtonGroup,
    Input,
    InputAddon,
    Label,
  } from "flowbite-svelte";
  import { createEventDispatcher, onMount } from "svelte";
  import TagList from "../TagList.svelte";

  export let link: null | Link;

  let form = {
    image: null,
    icon: null,
    text: "",
    url: "",
    type:"other",
    tags: []
  };


  let dispatch = createEventDispatcher();

  onMount(() => {
    if (link) {
      form = { ...form, ...link };
    }
  });
  let emitLink = (mode: string = "update") => () => {
    dispatch(mode, { ...link, ...form });
  }
</script>

<div>
  <div class="mb-6">
    <Label for="url" class="block mb-2">Url</Label>

    <ButtonGroup class="w-full">
      <InputAddon class=" bg-primary-100">
        <i class="fa fa-link" />
      </InputAddon>
      <Input id="url" type="text" size="sm" bind:value={form.url} />
    </ButtonGroup>
    <!-- <Helper class="mt-2" color="red"
      ><span class="font-medium">Invalid URL</span> - Url must be valid</Helper
    > -->
  </div>
  <div class="mb-6">
    <Label for="text" class="block mb-2">Text</Label>
    <ButtonGroup class="w-full">
      <Input id="text" size="sm" type="text"  bind:value={form.text} />
    </ButtonGroup>
  </div>

  <div class="mb-6">
    <Label>
      Tags
      <TagList bind:tags={form.tags} />
    </Label>
  </div>
</div>

<div class="flex justify-end mt-4 ">
  <Button size="xs" class="mr-2" color="red" on:click={emitLink("delete")}>
    <i class="fas fa-trash mr-2" />
    Link
  </Button>
  <Button size="xs" class="bg-primary-400" on:click={emitLink("update")}>
    
    {link?.id ? "Update" : "Create"} Link
  </Button>
 
</div>
