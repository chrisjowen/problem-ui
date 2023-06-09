<script lang="ts">
  import { page } from "$app/stores";
  import api from "$lib/api";
  import ProblemLayout from "$lib/components/problem/ProblemLayout.svelte";
  import LinksList from "$lib/components/shared/links/LinksList.svelte";
  import { Input } from "flowbite-svelte";
  import { onMount } from "svelte";

  let problem: any = null;
  let problemId = $page.params.id;

  onMount(reload);

  let filters: string[] = [];

  function reload() {
    api.problem.get(problemId, ["products", "sector"]).then((res) => {
      problem = res.data;
    });
  }

  $: selected = (type: string) => {
    if (filters.includes(type)) {
      return "bg-primary-500 text-white hover:bg-primary-400 hover:text-white";
    }
    return "bg-white hover:bg-primary-400 hover:text-white";
  };

  let query = "";
  let q = "";
  let search = "";
  let timer;

  $: {
    console.log(filters.length);
    query = filters.length == 0 ? "" : `type[in]=${filters.join(",")}`;
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

  function onSearch() {
    console.log("SEARCH");
    debounce(() => {
      console.log("BOUNCE");
      search = q.toLowerCase();
    });
  }

  let toggleFilter = (type: string) => () => {
    if (filters.includes(type)) {
      filters = filters.filter((f) => f !== type);
    } else {
      filters = filters.concat([type]);
    }
  };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->

<ProblemLayout bind:problem>
  {#if problem}
    <div class="p-4 border bg-white">
      <Input
        type="search"
        placeholder="Search links"
        bind:value={q}
        on:keyup={onSearch}
      >
        <i slot="right" class="fa-solid fa-search" />
      </Input>
    </div>
    <div class="p-4">
      <div class="grid grid-cols-3 gap-2 mb-4">
        <div
          class="flex flex-col text-xs md:text-xl  p-4 border items-center justify-center {selected(
            'product'
          )}"
          on:click={toggleFilter("product")}
        >
          <i class="fa-brands fa-product-hunt mb-4" />
          Products
        </div>
        <div
          class="flex flex-col text-xs md:text-xl p-4 border items-center justify-center {selected(
            'learning'
          )}"
          on:click={toggleFilter("learning")}
        >
          <i class="fa-solid fa-book mb-4" />
          Learning
        </div>
        <div
          class="flex flex-col text-xs md:text-xl p-4 border items-center justify-center {selected(
            'other'
          )}"
          on:click={toggleFilter("other")}
        >
          <i class="fa-solid fa-ellipsis-h mb-4" />
          Other
        </div>
      </div>
      <LinksList
        api={api.problem.links(problemId)}
        pageSize={20}
        editable={true}
        bind:query
        bind:search
      />
    </div>
  {/if}
</ProblemLayout>
