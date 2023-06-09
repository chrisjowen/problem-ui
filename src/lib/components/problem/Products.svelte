<script lang="ts">
  import api from "$lib/api";
  import { Button } from "flowbite-svelte";

  export let products: Product[] = [];
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  let onDelete = (id: number) => () => {
    api.product.delete(id).then(() => {
      dispatch("delete", id);
    });
  };

  function icon(uri: string) {
    const url = new URL(uri);
    return `${url.protocol}//${url.host}/favicon.ico`;
  }
</script>

<!-- <div class="flex justify-end m-2">
  <Button color="light" size="xs" >
    <i class="fa fa-add mr-2" />
    Add Product
  </Button>
</div> -->

{#each products as product}
  <div class="border bg-white p-3 mb-2 relative w-full ">
    <div class="flex">
      <div class="mr-3 mt-1 ">
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
          class="underlined text-primary-800 mr-2 text-sm"
          target="_blank"
          href={product.url}>{product.name}</a
        >
        <p class="text-xs text-gray-500">{product.url}</p>
      </div>
    </div>
    <div class="ml-3 p-4 text-xs ">
      {product.description}
    </div>
    <div
      class="md:absolute flex md:right-[20px] md:top-[20px] justify-end space-x-2 mb-4 text-red-900 text-xs"
    >
      <!-- <Button color="light" size="xs">
        <i class="fa fa-edit cursor-pointer" />
        
      </Button>
      <Button
        color="red"
        size="xs"
        class="mr-2 "
        on:click={onDelete(product.id)}
      >
        <i class="fa fa-trash cursor-pointer" />
        
      </Button> -->
    </div>
  </div>
{/each}

{#if products.length == 0}
  <div class="text-center text-gray-500 p-4 bg-white border ">
    No products added yet.
  </div>
{/if}
