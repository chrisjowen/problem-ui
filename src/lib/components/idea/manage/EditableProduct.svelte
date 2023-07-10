<script lang="ts">
  import type { Product } from "$lib/types";
  import axios from "axios";
  import { Button, Input, Label, Textarea } from "flowbite-svelte";
  import { createEventDispatcher } from "svelte";

  var uriRegex = new RegExp(
    "^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?"
  );
  var noUriSchemeRegex = new RegExp(
    "^([0-9A-Za-z-\\.@:%_+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?"
  );

  export let product: Product = {
    url: "",
    name: "",
    img: "",
    description: "",
  };

  $: validUrl = uriRegex.test(product.url);

  let dispatch = createEventDispatcher();

  function onSave(): void {
    debugger;
    dispatch("save", product);
  }

  function onUrlBlur(e: any): void {
    if (noUriSchemeRegex.test(product.url)) {
      product.url = "http://" + product.url;
    }
    if (product.name == "" && uriRegex.test(product.url)) {
      let hostParts = new URL(product.url).hostname
        ?.replace("www.", "")
        .split(".");
      product.name = hostParts[0];
    }
  }
</script>

<div class="flex flex-col h-full">
  <section class="md:p-2 flex-1 overflow-auto md:space-y-2">
    <slot />
    <div class="border bg-white p-4 space-y-4">
      <h1 class="text-lg font-bold">Product</h1>

      {#if validUrl}
        <object
          title={product.name}
          data="https://image.thum.io/get/{product.url}"
          type="image/png"
          class="w-[300px] h-[300px] border"
        >
          <i class="fa text-8xl fa-external-link-alt text-primary-300" />
        </object>
      {/if}

      <Label class="block mb-2">Url</Label>
      <Input type="text" bind:value={product.url} on:blur={onUrlBlur}>
        <div slot="left">
          <i class="fas fa-link" />
        </div>
      </Input>
    </div>

    {#if validUrl}
      <div class="border bg-white p-4 space-y-4">
        <Label class="block mb-2">Name</Label>
        <Input type="text" bind:value={product.name} />

        <Label class="block mb-2">Description</Label>
        <Textarea bind:value={product.description} class="h-[200px]" />
      </div>
    {/if}
  </section>

  <div class="p-2 bg-gray-50 border-t-[1px] z-30 flex justify-end">
    <Button size="xs" on:click={onSave}>
      <i class="fas fa-save mr-2" />
      Save
    </Button>
  </div>
</div>
