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

  let pageInnerWidth: number;
  let timer;
  let listView = true;

  $: problems = [];
  let q = "";

  onMount(() => {
    loadPublicProblems();
  });

  const debounce = (v) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      q = v;
      loadPublicProblems();
    }, 500);
  };

  $: {
    if(pageInnerWidth < 760) {
      listView = false;
    }
  }

  async function loadPublicProblems() {
    let response = await api.problem.list(
      `title[like]=${q.toLowerCase()}&public=true`,
      10,
      1,
      ["sectors", "user"]
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
<svelte:window bind:innerWidth={pageInnerWidth}/>
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
        <span class="hidden md:block ml-2">Create</span>
      </Button>
    </div>
  </div>
  <section
    class="px-9 py-3 mb-3 text-xs flex flex-row drop-shadow-sm  border-b-[1px]"
  >
    <div class="flex-1">
      <i class="fas fa-info-circle m-2" />
      {problems.length} Problem Spaces Found
    </div>
    <div class="hidden md:block">
      <Button color="light" size="xs" on:click={() => (listView = false)}
        ><i class="fas fa-th-large" /></Button
      >
      <Button color="light" size="xs" on:click={() => (listView = true)}
        ><i class="fas fa-th-list" /></Button
      >
    </div>
  </section>
  <div class="flex-1 overflow-auto">
    
  <div class="max-w-[2000px] w-full m-auto">
    <h1 class="p-4">Public Spaces</h1>
    
    <div
      transition:slide={{ duration: 250 }}
      class="grid gap-2 grid-cols-1 {listView
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
            class=" bg-white rounded-xl border hover:border-primary-400  w-full {listView
              ? 'flex'
              : 'md:flex'}  flex-row"
            on:click={showProblem(problem)}
            size="full"
          >
            <div class="p-4 relative">
              <img
                class=" {listView
                  ? 'w-auto h-[70px] md:h-[120px]  '
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
            <div class="flex-1 m-4 ">
              <h5 class="text-lg md:text-lg font-bold text-gray-500 ">
                {@html highlight(problem.title)}
              </h5>
              <p class="text-xs mb-3 font-bold text-gray-400">
                @{problem.user.username} 
              </p>
            
              <p class="prose max-w-none text-sm md:text-md mb-4">
                {#if listView}
                  {problem.blurb}
                {:else}
                  {problem.blurb.slice(0, 100)}...
                {/if}
              </p>
              <div>
                {#each problem.sectors as sector}
                <p
                  class="text-primary-500 p-1 px-2  mr-1 bg-gray-200 text-xs inline-block"
                >
                  <i class="fas fa-tag mr-2" />
                  {sector.name}
                </p>
                {/each}
              </div>
            </div>
          </div>
        </div>
      {/each}
    </div>
    </div>
  </div>
</div>
