<script lang="ts">
  import { Button, Input, Modal } from "flowbite-svelte";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { slide } from "svelte/transition";
  import api from "$lib/api";
  import { PUBLIC_IMG_CDN_BASE, PUBLIC_PROBLEM_API_PATH } from "$env/static/public";
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
    let response = await api.problem.list(`title[like]=${q.toLowerCase()}`, 50, 0, ["sector"]);
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
  <div class="bg-primary-100 p-3  flex  z-40">
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
    <div>
      <Button class="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600"  on:click={() => goto("/problem/create") }>
        <i class="fas fa-plus mr-2" /> Create Problem
      </Button>
    </div>
    <!-- <div class="my-4">
      <div class="bg-primary-400 text-white text-xs inline-block rounded">
        <div class="flex flex-row ">
          <span class="flex-1 p-2 ">Virtual Reality (VR)</span>
          <div class="p-2  hover:bg-primary-800 rounded">
            <i class="fas fa-times "></i>
          </div>
        </div>
      </div>
      <div class="bg-primary-400 text-white text-xs inline-block rounded">
        <div class="flex flex-row ">
          <span class="flex-1 p-2 ">Virtual Reality (VR)</span>
          <div class="p-2  hover:bg-primary-800 rounded">
            <i class="fas fa-times "></i>
          </div>
        </div>
      </div>
    </div> -->
  </div>
  <section class="px-9 py-3 mb-3 text-xs flex flex-row drop-shadow-sm z-40 border-b-[1px]">
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
  <div class="flex-1 overflow-auto">
    <div
      transition:slide="{{  duration: 250 }}"
      class="grid gap-4 grid-cols-1 {listView
        ? 'md:grid-cols-1'
        : 'xl:grid-cols-3'}  sm:grid-cols-1 px-4"
    >
      {#each problems as problem}
        <div class="inline-block flex w-full" >
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <div
            class=" bg-white border hover:border-primary-500 hover:drop-shadow-lg drop-shadow-sm w-full md:flex flex-row"
            on:click={showProblem(problem)}
            size="full"
          >
            <div class="p-4">
              <img
                class="w-full md:w-auto object-cover object-center border"
                src="{PUBLIC_IMG_CDN_BASE}/{problem.img}"
                alt="content"
                style="height: {listView ? '120px' : '200px'};"
              />
            </div>
            <div class="flex-1 mb-4 m-4 space-y-4">
              <h5 class="text-2xl font-bold text-gray-500">
                {@html highlight(problem.title)}
              </h5>
              <!-- {#if !listView} -->
              <p class="">
                {problem.blurb.slice(0, 100)}...
              </p>
              <!-- {/if} -->
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



<style lang="scss">
  .hero {
    background-image: url("/img/hero.png");
    background-color: black;

    background-repeat: no-repeat;
    width: 100%;
    background-size: cover;
  }
</style>
