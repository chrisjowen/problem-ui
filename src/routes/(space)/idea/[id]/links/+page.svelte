<script lang="ts">
  import { page } from "$app/stores";
  import api from "$lib/api";
  import LargeLinksList from "$lib/components/links/LargeLinksList.svelte";
  import { isMember } from "$lib/util/authUtil";
  import { Input } from "flowbite-svelte";
  import { onMount } from "svelte";
  import IdeaShell from "$lib/components/idea/manage/IdeaShell.svelte";
    import type { PageData } from "../$types";
  import type { Problem } from "$lib/types";

  export let data: PageData;
  let problem: Problem = data.problem;
  let reload: Function;
  let problemId = $page.params.id;

  let tags: string[] = [];

  let query = "";
  let q = "";
  let search = "";
  let timer;

  onMount(() => {
     tags  = $page.url.searchParams.get("tags")?.split(",") || [];
  })
  
  $: {
    query = tags.length == 0 ? "" : `tags[list]=${tags.join(",")}`;
    query =
      search == ""
        ? query
        : `${query}|OR(text[like]=${search}|url[like]=${search}))`;
  }

  function debounce(func, timeout = 300) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this);
    }, timeout);
  }

  function onSearch(event: KeyboardEvent) {
    if (event.key == "Enter" && q.startsWith("#")) {
      tags = [...tags, q.replace("#", "")];
      q = "";
    }

    if (!q.startsWith("#")) {
      debounce(() => {
        console.log("BOUNCE");
        search = q.toLowerCase();
      });
    }
  }

  let removeAtIdx = (idx: number) => () => {
    let tmp = [...tags];
    tmp.splice(idx, 1);
    tags = tmp;
  };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->

<IdeaShell bind:problem bind:reload>
  {#if problem}
    <div class="p-4 bg-gray-300">
      <Input
        type="search"
        placeholder="Search Resources..."
        bind:value={q}
        on:keyup={onSearch}
      >
        <i slot="right" class="fa-solid fa-search" />
      </Input>

      <div class="p-4 hidden">
        {#each tags as tag, idx}
          <div class="text-gray-600 text-xs mr-1 border inline-block mr-2">
            <div class="flex">
              <span class="py-2 mx-2">#{tag}</span>
              <button
                class="hover:bg-red-500 p-2 group rounded-r-lg"
                on:click={removeAtIdx(idx)}
              >
                <i class="fas fa-trash group-hover:text-white" />
              </button>
            </div>
          </div>
        {/each}
      </div>
    </div>
    <div class="p-4">
      <LargeLinksList
        api={api.problem.links(problemId)}
        pageSize={20}
        editable={isMember(problem)}
        on:tagClicked={(event) => {
          tags = tags.concat(event.detail);
        }}
        bind:query
        bind:search
      />
    </div>
  {/if}
</IdeaShell>
