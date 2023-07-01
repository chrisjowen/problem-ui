<script lang="ts">
  import { beforeUpdate, onMount } from "svelte";
  import { goto } from "$app/navigation";
  import api from "$lib/api";
  import { PUBLIC_IMG_CDN_BASE } from "$env/static/public";
  import FeatureList from "$lib/components/home/FeatureList.svelte";
  import SolveSpaceOverview from "$lib/components/home/SolveSpaceOverview.svelte";
  import { Button } from "flowbite-svelte";

  let sectors: any = [];
  let problems: any = [];

  onMount(() => {
    api.sector.list("", 6).then((res) => {
      sectors = res.data.entries;
    });

    api.problem.list("", 6, 1, ["sectors", "user"]).then((res) => {
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

<div style="background:#245cd6">
  <!-- HERO -->
  <div
    class="max-w-[2000px] hero bg-primary-600 flex flex justify-center m-h-[50%] xl:m-h-[50%] m-auto"
  >
    <div
      class="lg:mt-[100px] mt-[50px] w-[80%] lg:w-[900px] md:w-[50%]  z-20"
    >
      <h1
        class="text-white font-bold lg:text-7xl text-6xl bold text-center mb-9"
      >
        <span class="text-primary-300">
          Turn your  Ideas Into Reality
        </span>
        With The Power of the Crowd
      </h1>

      <p class="text-red-50 text-xl lg:text-2xl xl:text-3xl text-center mb-9">
        From brainstorm to breakthrough, the crowd is here to help
      </p>

      <div class="flex flex-row justify-center mb-9 md:my-[100px]">
        <a
          href="/problem/create"
          class="bg-white 
            rounded-lg
            drop-shadow-lg
            text-primary-600 
            text-xl md:text-2xl
            lg:text-4xl drop-shadow-lg
            hover:bg-primary-900
            hover:text-white
            font-bold
            py-4
            px-8"
        >
          <i class="fas fa-rocket mr-2" />
          Create Your SolveSpace
        </a>
      </div>
    </div>
  </div>
</div>
<!-- Features  -->

<div class="max-w-[1000px] m-auto py-9 md:px-0 px-4">
  <h2 class="text-2xl mb-9">What's a SolveSpace Anyway?</h2>
  <SolveSpaceOverview />
</div>
<div class="bg-gray-200 max-w-[2000px] w-full m-auto px-4 md:p-8">
  <FeatureList />
</div>

<div class="p-2 pt-5 p-4 md:p-9 m-h-[500px] bg-white">
  <div class="max-w-[2000px] w-full m-auto">
    <h1 class=" mb-6 md:text-3xl text-2xl text-primary-900 font-bold">
      Active Public SolveSpaces
    </h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 w-full gap-2">
      {#each problems as problem}
        <div class="inline-block flex flex-shrink-0">
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <div
            class="rounded-lg bg-white border border-gray-300 hover:drop-shadow-xl w-full md:flex flex-row"
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
            <div class="flex-1 m-4 flex flex-col">
              <h5 class="text-md font-bold text-primary-900">
                {(problem.title || "").slice(0, 45)}
              </h5>
              <p class="text-sm text-gray-500 mb-4">
                @{problem.user.username}
              </p>
              <p class="flex-1 text-sm">
                {(problem.blurb || "").slice(0, 90)}...
              </p>
              <div>
                {#each problem.sectors as sector}
                  <p
                    class="text-primary-500 p-1 px-2 mr-1 bg-gray-200 text-xs inline-block"
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

<div class="md:px-9 py-2 px-4 bg-white">
  <div class="max-w-[2000px] w-full m-auto">
    <h1 class="my-4 md:mx-0 text-2xl text-gray-800 font-bold">
      Popular Sectors
    </h1>
    <div
      class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 xl:grid-cols-6 2xl:grid-cols-6 w-full gap-4"
    >
      {#each sectors.slice(0, 50) as sector}
        <button
          class=" bg-white relative flex-shrink-0 rounded-lg border border-gray-300 hover:drop-shadow-xl"
          on:click={showSector(sector)}
        >
          <img
            class="w-full rounded-lg h-[350px] md:h-[250px]"
            src="{PUBLIC_IMG_CDN_BASE}{sector.image}"
            alt="content"
          />
          <h5
            class="p-2 m-2 font-bold text-xs bg-primary-700 text-white absolute top-0 right-0"
          >
            {sector.name}
          </h5>
        </button>
      {/each}
    </div>
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
