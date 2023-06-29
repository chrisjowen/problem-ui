<script lang="ts">
	import { bind } from 'svelte/internal';
  import { classNames } from "classnames";
  import { auth } from "$lib/store";
  import type { PaginationResults } from "$lib/types";
  import api from "$lib/api";
  import TagList from "../shared/TagList.svelte";
  import { fromNow } from "$lib/util/datetimeUtil";
  import _ from "lodash";
  import { Button } from "flowbite-svelte";

  let feed: PaginationResults<any>;
  export let tags: string[];
  let selected: string[] = [];

  $: {
    if (tags) {
      let q = `tags[list]=${tags.join(",")}`;
      let query =
        selected.length > 0 ? `${q}|tags[list]=${selected.join(",")}` : q;

      api.news.list(query, 100, 10).then((res) => {
        feed = res.data;
      });
    }
  }

  export let allTags: string[] = [];

  $: {
    if (allTags.length == 0 && feed?.entries) {
      allTags = _.uniq(
        feed?.entries?.reduce((acc, item) => {
          return [...acc, ...item.tags];
        }, [])
      );
    }
  }

  let selectTag = (e: CustomEvent<any>) => {
    let tag = e.detail;
    if (selected.includes(tag)) {
      selected = selected.filter((t) => t != tag);
    } else {
      selected = [...selected, tag];
    }
  };
</script>

{#if feed}
  <div class="flex">
    <section id="feed" class="max-w-[800px]">
      <div class="p-4 text-center lg:hidden">
        <TagList
          tags={allTags}
          editable={false}
          clickable={true}
          bind:selected
          on:click={selectTag}
        />
      </div>

      {#each feed.entries as item}
        <div
          class="space-x-4 items-start p-4 m-4 border rounded-lg bg-white block hover:border-primary-200"
        >
          <a target="_blank" href={item.url}>
            <div
              class="hidden md:w-[150px] mb-4 md:h-[150px] rounded-lg border"
              style="background: url('{item.image}'); background-size:cover"
            />
            <div>
              <img
                src={item.image}
                class="  rounded-lg border mb-4"
                alt={item.title}
              />
            </div>

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
          </a>

          <div class="my-4">
            <TagList
              tags={item.tags}
              editable={false}
              bind:selected
              clickable={true}
              on:click={selectTag}
            />
          </div>

          <p class="prose my-4">{@html item.summary}</p>

          <slot name="actions" item={item} />

        </div>
      {/each}
    </section>
    <section
      id="tags"
      class="hidden xl:block w-[100px] relative p-4 overflow-auto"
    >
      <div class="fixed p-4">
        <h1 class="flex-1 items-end mb-4 flex text-lg text-primary-600">
          Tags
        </h1>
        <TagList
          tags={allTags}
          editable={false}
          clickable={true}
          bind:selected
          on:click={selectTag}
        />

        {#if selected.length > 0}
          <div class="flex justify-end">
            <Button size="xs" color="red" on:click={() => (selected = [])}>
              <i class="fas fa-times mr-2" />
              Clear All Tags</Button
            >
          </div>
        {/if}
      </div>
    </section>
  </div>
{/if}
