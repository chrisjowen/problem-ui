<script lang="ts">
  import type { Problem } from "$lib/types";
  import type { PageData } from "./$types";
  import IdeaShell from "$lib/components/idea/manage/IdeaShell.svelte";
  import IdeaStakeholders from "$lib/components/idea/view/IdeaStakeholders.svelte";
  import { imageUrl } from "$lib/util/imageutil";
  import { Button, Label } from "flowbite-svelte";

  export let data: PageData;
  let problem: Problem = data.problem;
</script>

<IdeaShell bind:problem>
  {#if problem}
    <div>
      <div class="border-b-[1px] p-4 bg-white relative">
        {#if problem.products?.length > 0}
          {#each problem.products as product}
            <a
              class="flex p-4 hover:bg-primary-100"
              href="./competition/{product.id}"
            >
              <div class="mr-4">
                <object
                  title={product.name}
                  data="https://image.thum.io/get/{product.url}"
                  type="image/png"
                  class="w-[60px] h-[60px] border"
                >
                  <i
                    class="fa text-8xl fa-external-link-alt text-primary-300"
                  />
                </object>
              </div>
              <div>
                <h1 class="text-md font-bold text-gray-500">{product.name}</h1>
                <h2 class="text-sm font-bold text-gray-400">{product.url}</h2>
                <p>{@html product.description}</p>
              </div>
            </a>
          {/each}
        {:else}
          No Competition Identified
        {/if}
      </div>
      <div class="flex justify-end mt-4 px-2">
        <Button href="./competition/create" size="xs">
          <i class="fas fa-plus mr-2" />
          Competition</Button
        >
      </div>
    </div>
  {/if}
</IdeaShell>
