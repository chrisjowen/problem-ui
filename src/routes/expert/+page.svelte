<script lang="ts">
  import api from "$lib/api";
  import type { Expert, PaginationResults } from "$lib/types";
  import type { Pagination } from "flowbite-svelte";
  import { entries } from "lodash";
  import { onMount } from "svelte";
  import { imageUrl } from "$lib/util/imageutil";
  import TagList from "$lib/components/shared/TagList.svelte";
  let experts: PaginationResults<Expert>;

  onMount(load);

  function load() {
    api.expert.list().then((res) => {
      experts = res.data;
    });
  }
</script>

{#if experts}
  <div class="grid grid-cols-2 gap-4 m-4">
    {#each experts.entries as expert}
      <div class="p-4 bg-white border  flex flex-shrink-0">
        <div class="text-center mr-4">
          <img
            class="rounded-md m-auto w-20 h-20 border"
            src={imageUrl(expert.img)}
            alt={expert.name}
          />
        </div>
        <div class="flex-1">
          <h1 class="text-2xl">{expert.name}</h1>
          <h1 class="mb-2 text-gray-600 text-sm">
            {expert.title} - {expert.institution}
          </h1>
          <div class="mb-2">
            <TagList tags={expert.expertise.slice(0,4)} editable={false} />
          </div>

          <p class=" py-4">
            {#if expert.bio}
              {expert?.bio?.slice(0, 300)}...
            {:else}
              No bio available
            {/if}
          </p>
        </div>
      </div>
    {/each}
  </div>
{/if}
