<script lang="ts">
  import { page } from "$app/stores";
  import api from "$lib/api";
  import Gravitar from "$lib/components/shared/Gravitar.svelte";
  import type { Problem } from "$lib/types";
  import moment from "moment";
  export let problem: Problem;
  export let length = 200;

  let feed: any[] = [];
  api.problem
    .feed($page.params.id)
    .list()
    .then((res) => {
      feed = res.data.slice(0, length);
    });

  function fromNow(when: any) {
    return moment.utc(when).fromNow();
  }
</script>

{#each feed as feedItem}
  <div class="bg-white border-b-[1px] p-3 flex">
    <div class="m-2 mr-4">
      <Gravitar user={feedItem.who} />
    </div>

    <div class="m-2 text-xs flex items-center flex-1">
      <div>
        <p>
          <strong class="mr-1">
            {#if feedItem.who}
              {feedItem.who.name} {feedItem.who.last_name}
            {:else}
              System user
            {/if}
          </strong>
          <i class="fas fa-arrow-right mx-1" />
          {feedItem.mode}
          {feedItem.type}
        </p>

        <p class="bold mt-2">
          {#if feedItem.type == "discussion"}
            <a
              href="/problem/show/{problem.id}/discussion/{feedItem.item.id}"
              class="text-blue-800"
            >
              <i class="fa-solid fa-comment mr-1" />
              {feedItem.item.title}
            </a>
          {:else if feedItem.type == "link"}
            <a href={feedItem.item.url} target="_blank" class="text-blue-800">
              <i class="fas fa-link mr-1" />{feedItem.item.text}</a
            >
          {:else if feedItem.type == "page"}
            <a
              href="/problem/show/{problem.id}/page/{feedItem.item.id}"
              class="text-blue-800"
            >
              <i class="fas fa-file mr-1" /> {feedItem.item.title}</a
            >
          {:else if feedItem.type == "answer"}
          
            <div class="">
              On Disucssion:
              <a
                href="/problem/show/{problem.id}/discussion/{feedItem.item
                  .discussion_id}#answer-{feedItem.item.id}"
                class="text-blue-800"
              >
                <i class="fas fa-file mr-1 ml-2" />
                {feedItem.item.discussion.title}</a
              >
            </div>
          {/if}
        </p>
      </div>
    </div>
    <div class="m-2 flex items-center w-[120px] text-xs">
      <i class="fas fa-clock mr-2" />
      <p>{fromNow(feedItem.when)}</p>
    </div>
  </div>
{/each}
