<script lang="ts">
  import api from "$lib/api";
  import axios from "axios";
  import {
    Button,
  } from "flowbite-svelte";
  import { onMount } from "svelte";

  export let problemId: null | number = null;
  let products: Product[] = [];

  onMount(async () => {
    reload();
  });

  export async function reload() {
    let response = await axios.get(`/api/problem/${problemId}/product`);
    products = response.data;
  }

  let onDelete = (id: number) => () => {
  api.product.delete(id).then(() => {
    reload();   
  });
  }

  function icon(uri: string) {
    const url = new URL(uri);
    return `${url.protocol}//${url.host}/favicon.ico`;
  }
</script>

<div class="flex justify-end">
  <Button color="light"  size="xs" class="mr-2 w-full md:w-auto  mb-4"  > 
    <i class="fa fa-add  mr-2" />
    Add Product
  </Button>
</div>

{#each products as product}
  <div class="border bg-white p-3 mb-2 relative w-full">
    <div class="flex">
      <div class="mr-3 mt-1">
        <object
          title={product.name}
          data={icon(product.url)}
          type="image/png"
          width="20"
        >
          <i class="fa fa-external-link-alt text-primary-900" />
        </object>
      </div>

      <div>
        <a
          class="underlined text-primary-600 mr-2 text-lg"
          target="_blank"
          href={product.url}>{product.name}</a
        >
        <p class="text-xs text-gray-500">{product.url}</p>
      </div>
    </div>
    <div class="ml-3 p-4">
      {product.description}
    </div>
    <div class="md:absolute flex md:right-[20px] md:top-[20px] justify-end space-x-2  mb-4 text-red-900 text-xs">
      <Button color="light" size="xs" >
        <i class="fa fa-edit cursor-pointer mr-2" />
        Edit
      </Button>
      <Button color="red" size="xs" class="mr-2 " on:click={onDelete(product.id)} > 
        <i class="fa fa-trash cursor-pointer mr-2"  />
        Delete
      </Button>
    </div>
  </div>
{/each}

{#if products.length == 0}
  <div class="text-center text-gray-500 p-4 bg-white border my-4">
    No products added yet.
  </div>
{/if}


