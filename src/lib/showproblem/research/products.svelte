<script lang="ts">
  import axios from "axios";
  import {
    Card,
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

<!-- <h1 class="text-2xl text-bold text-primary-600 mb-3">Similar Products</h1> -->

<Card size="full" >
  {#if products.length > 0}
    <Table>
      <TableHead>
        <TableHeadCell>Name</TableHeadCell>
        <TableHeadCell class="invisible md:visible">Description</TableHeadCell>
      </TableHead>
      <TableBody class="divide-y">
        {#each products as product}
          <TableBodyRow>
            <TableBodyCell>
              <div class="flex">
                <!-- <img src={icon(product.url)} width="20" class="mr-2" /> -->

                <object
                  title={product.name}
                  data={icon(product.url)}
                  type="image/png"
                  width="20"
                  class="mr-2"
                >
                  <i class="fa fa-external-link-alt text-primary-900" />
                </object>
                <a
                  class="underlined text-primary-600"
                  target="_blank"
                  href={product.url}>{product.name}</a
                >
              </div>
            </TableBodyCell>
            <TableBodyCell class="invisible md:visible">
              {product.description}
            </TableBodyCell>
          </TableBodyRow>
        {/each}
      </TableBody>
    </Table>
  {/if}
</Card>
