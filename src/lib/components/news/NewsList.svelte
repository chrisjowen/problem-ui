<script lang="ts">
  import { auth } from "$lib/store";
  import type { PaginationResults } from "$lib/types";
  import api from "$lib/api";
  import TagList from "../shared/TagList.svelte";
  import { fromNow } from "$lib/util/datetimeUtil";
  let feed: PaginationResults<any>;
  export let tags: string[];

  $: {
    if (tags) {
      api.news.list(`tags[list]=${tags.join(",")}`, 100, 10).then((res) => {
        feed = res.data;
      });
    }
  }
</script>

{#if feed}
  {#each feed.entries as item}
    <a
      class="flex space-x-8 items-start p-4 m-4 border max-w-none rounded-lg bg-white block hover:border-primary-200"
      target="_blank"
      href={item.url}
    >
      <div
        class="w-[150px] h-[150px] rounded-lg border"
        style="background: url('{item.image}'); background-size:cover"
      />
      <div class="flex-1">
        <h3 class="text-xl mb-2">{@html item.title}</h3>
        <div class="text-xs text-gray-400 flex space-x-4">
          <p>
            <i class="fas fa-calendar-alt" />
            {fromNow(item.published_at)}
          </p>
          <p>
            <i class="fas fa-newspaper" />
            {item.source.provider}
          </p>
        
        </div>
        <div class="my-4">
          <TagList tags={item.tags} editable={false} />
        </div>

        <p class="prose my-4">{@html item.summary}</p>
      </div>
    </a>
  {/each}
{/if}
