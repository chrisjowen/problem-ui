<script lang="ts">
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import api from "$lib/api";
  import { PUBLIC_IMG_CDN_BASE, PUBLIC_PROBLEM_API_PATH } from "$env/static/public";

  let sectors: any = [];
  let problems: any = [];

  onMount(() => {
    api.sector.list("", 20).then((res) => {
      sectors = res.data.entries;
    });

    api.problem.list("", 10, 1, ["sector"]).then((res) => {
      problems = res.data.entries;
    });
  });

  let showProblem = (problem: any) => () => {
    goto(`/problem/show/${problem.id}`);
  };

  let showSector = (sector: any) => () => {
    goto(`/sector/${sector.id}`);
  };
</script>

<!-- HERO -->
<div
  class=" hero bg-primary-600 flex flex justify-center m-h-[50%] xl:m-h-[50%]"
>
  <div class="lg:mt-[100px] mt-[50px] w-[80%] lg:w-[45%] md:w-[50%] z-20">
    <h1 class="text-white font-bold lg:text-7xl text-6xl bold">
      <span class="text-primary-200">1000's of Startup Problems </span> Just Dying
      To Be Solved
    </h1>
    <p class="mt-9 mb-[50px] text-red-50 text-2xl lg:text-3xl xl:text-4xl">
      Join a global community of innovators, creators and investors to resolve
      problems worth solving.
    </p>
    <div class="mt-9 mb-[50px] lg:mb-[150px] flex flex-row" />
  </div>
</div>

<!-- Features  -->

<div class="p-9 m-h-[500px]">
  <h1 class="mb-9 text-3xl text-primary-900 font-bold ">Trending Problems</h1>
  <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 w-full gap-4 ">
    {#each problems as problem}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div
        class="inline-block flex   mr-2 flex-shrink-0"
      >
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div
          class="rounded-lg bg-white border hover:drop-shadow-xl w-full md:flex flex-row"
          size="full"
          on:click={showProblem(problem)}
        >
          <div class="p-4">
            <img
              class="w-full md:w-auto object-cover object-center border"
              src="{PUBLIC_IMG_CDN_BASE}/{problem.img}"
              alt="content"
              style="height: 150px"
            />
          </div>
          <div class="flex-1 mb-4 m-4 flex flex-col">
            <h5 class="text-xl font-bold text-primary-900">
              {problem.title.slice(0, 25)}
            </h5>
            <p class="flex-1">
              {problem.blurb.slice(0, 90)}...
            </p>
            <div>
              <p
                class="text-primary-500 p-1 pl-2 pr-2 bg-gray-200 text-xs inline-block"
              >
                <i class="fas fa-tag mr-1" />
                {problem.sector.name}
              </p>
            </div>
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>

<div class="p-2 bg-primary-100 ">
  <h1 class="my-9 mx-4 text-2xl text-primary-900 font-bold">Sectors</h1>
  <div class="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 w-full gap-4 ">
    {#each sectors.slice(0, 50) as sector}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div
        class="rounded-lg hover:bd-blue-900 bg-white hover:drop-shadow-xl drop-shadow-sm  relative mb-9 flex-shrink-0  mr-4 border-primary-200 border"
        on:click={showSector(sector)}
      >
        <img
          class="w-full rounded-lg h-[200px] object-cover object-center"
          src="{PUBLIC_IMG_CDN_BASE}{sector.image}"
          alt="content"
        />
        <h5
          class="p-2 m-2 font-bold rounded text-xs bg-primary-700 text-white absolute top-0 right-0 drop-shadow-xl"
        >
          {sector.name}
        </h5>
      </div>
    {/each}
  </div>
</div>

<style lang="scss">
  .hero {
    width: 100%;
  }

  .hero {
    position: relative;
  }

  .hero::before {
    content: "";
    background-image: url("/img/hero.png");
    background-size: cover;
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    opacity: 0.1;
    z-index: 1;
  }
</style>
