<script lang="ts">
  import {
    Button,
    Input,
  } from "flowbite-svelte";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { slide } from "svelte/transition";
  import api from "$lib/api";
  import {
    PUBLIC_IMG_CDN_BASE,
  } from "$env/static/public";
  import Gravitar from "$lib/components/shared/Gravitar.svelte";

  let timer;
  let listView = false;

  $: problems = [];
  let q = "";

  onMount(() => {
    loadProblems();
  });

  const debounce = (v) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      q = v;
      loadProblems();
    }, 500);
  };

  async function loadProblems() {
    let response = await api.problem.list(
      `title[like]=${q.toLowerCase()}`,
      50,
      0,
      ["sector", "user"]
    );
    problems = response.data.entries;
  }
  let showProblem = (problem: any) => () => {
    goto(`/problem/show/${problem.id}`);
  };

  function highlight(input: any) {
    if (q) {
      return input.replace(
        new RegExp(q, "gi"),
        (match) => `<span class="bg-yellow-200">${match}</span>`
      );
    }

    return input;
  }
</script>

<div class="bg-gray-50 flex flex-col h-full">

  <div class="bg-gray-200 border-b-[1px] p-3 flex z-30">
    <div class="flex-1 mr-4">
      <Input
        bind:value={q}
        type="text"
        placeholder="Search"
        on:keyup={({ target: { value } }) => debounce(value)}
      >
        <i class="fas fa-search" slot="left" />
      </Input>
    </div>
    <div class="flex items-center">
      <Button
        class="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600"
        on:click={() => goto("/problem/create")}
      >
        <i class="fas fa-plus" />
        <span class="hidden md:block ml-2">Create Problem</span>
      </Button>
    </div>
  </div>
  <section
    class="px-9 py-3 mb-3 text-xs flex flex-row drop-shadow-sm  border-b-[1px]"
  >
    <div class="flex-1">
      <i class="fas fa-info-circle m-2" />
      {problems.length} Problems Found
    </div>
    <div>
      <Button color="light" size="xs" on:click={() => (listView = false)}
        ><i class="fas fa-th-large" /></Button
      >
      <Button color="light" size="xs" on:click={() => (listView = true)}
        ><i class="fas fa-th-list" /></Button
      >
    </div>
  </section>
  <!-- <section class="mx-4 mb-4">
    <div class="bg-gray-400 text-white text-xs inline-block rounded">
      <div class="flex flex-row">
        <span class="flex-1 p-2">Virtual Reality (VR)</span>
        <div class="p-2 hover:bg-primary-800 rounded">
          <i class="fas fa-times" />
        </div>
      </div>
    </div>
  </section> -->
  <div class="flex-1 overflow-auto">
    <div
      transition:slide={{ duration: 250 }}
      class="grid gap-4 grid-cols-1 {listView
        ? 'lg:grid-cols-1'
        : 'lg:grid-cols-2 xl:grid-cols-3'}  sm:grid-cols-1 px-4"
    >
      {#if !problems || problems.length == 0}
        <p>Loading...</p>
      {/if}

      {#each problems as problem}
        <div class="inline-block flex w-full">
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <div
            class=" bg-white rounded-xl border hover:drop-shadow-lg drop-shadow-sm w-full {listView
              ? 'flex'
              : 'md:flex'}  flex-row"
            on:click={showProblem(problem)}
            size="full"
          >
            <div class="p-4 relative">
              <img
                class=" {listView
                  ? 'w-auto h-[70px] md:h-[80px]  '
                  : 'w-full h-[200px]'} md:w-auto object-cover object-center border"
                src="{PUBLIC_IMG_CDN_BASE}/{problem.img}"
                alt="content"
              />
              {#if !listView}
              <div class="absolute top-[25px] left-[25px] bg-white flex border rounded-xl drop-shadow-lg">
                <Gravitar user={problem.user} size="sm" className="drop-shadow-lg"  />
                <p class="flex items-center mx-2 text-xs">{problem.user.name} {problem.user.last_name}</p>
              </div>
              {/if}
            </div>
            <div class="flex-1 m-4 space-y-4">
              <h5 class="text-lg md:text-2xl font-bold text-gray-500">
                {@html highlight(problem.title)}
              </h5>

              {#if listView}
              <div class=" flex  rounded-xl ">
                <Gravitar user={problem.user} size="xs" className="rounded-sm"  />
                <p class="flex items-center mx-2 text-xs">{problem.user.name} {problem.user.last_name}</p>
              </div>
              {/if}
              <p class="text-xs md:text-md">
                {problem.blurb.slice(0, 100)}...
              </p>
              <p
                class=" text-primary-500 p-1 pl-2 pr-2 bg-gray-200 text-xs inline-block"
              >
                <i class="fas fa-tag mr-1" />
                {problem.sector.name}
              </p>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>
