<script lang="ts">
  import axios from "axios";
  import {
    Spinner,
    Table,
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell,
  } from "flowbite-svelte";
  import { onMount } from "svelte";

  export let problemId: null | number = null;

  interface Product {
    id: number;
    name: string;
    description: string;
    url: string;
    screenshot: string;
    match_percent: number;
    problem_id: number;
    problem: null;
    productHuntUrl: string;
    crunchbaseURL: string;
    inserted_at: string;
    updated_at: string;
  }

  let products: Product[] = [];

  onMount(async () => {
    reload();
  });

  export async function reload() {
    let response = await axios.get(`/api/problem/${problemId}/product`);
    products = response.data;
  }

  function icon(uri: string) {
    const url = new URL(uri);
    return `${url.protocol}//${url.host}/favicon.ico`;
  }
</script>

<!-- <h1 class="text-2xl text-bold text-primary-900 mb-3">Similar Products</h1> -->

<div class="bg-white border">
  {#if products.length > 0}
    <Table >
      <TableHead>
        <TableHeadCell>Name</TableHeadCell>
        <TableHeadCell>Description</TableHeadCell>
      </TableHead>
      <TableBody class="divide-y">
        {#each products as product}
          <TableBodyRow>
            <TableBodyCell>
              <div class="flex">
                <img src={icon(product.url)} width="20" class="mr-2" />
                <a
                  class="underlined text-primary-900"
                  target="_blank"
                  href={product.url}>{product.name}</a
                >
              </div>
            </TableBodyCell>
            <TableBodyCell>
              {product.description}
            </TableBodyCell>
          </TableBodyRow>
        {/each}
      </TableBody>
    </Table>
  {:else}
    <Spinner color="yellow" size={10} />
  {/if}
</div>
