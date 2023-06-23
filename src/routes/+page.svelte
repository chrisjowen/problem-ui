<script lang="ts">
  import { beforeUpdate, onMount } from "svelte";
  import { goto } from "$app/navigation";
  import api from "$lib/api";
  import { PUBLIC_IMG_CDN_BASE } from "$env/static/public";
  import { auth } from "$lib/store";
  import ScreenOverview from "$lib/components/home/ScreenOverview.svelte";
  import ScreenOverviewSimple from "$lib/components/home/ScreenOverviewSimple.svelte";

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
      class="lg:mt-[100px] mt-[50px] w-[80%] lg:w-[700px] md:w-[50%] lg:min-h-[600px] z-20"
    >
      <h1 class="text-white font-bold lg:text-7xl text-6xl bold">
        <span class="text-primary-200">Join A Global Community</span> Of Problem
        Solvers
      </h1>
      <p class="mt-9 mb-[50px] text-red-50 text-2xl lg:text-3xl xl:text-3xl">
        A space where innovators, creators and investors come together to
        resolve problems worth solving.
      </p>
      <div class="mt-9 mb-[50px] lg:mb-[150px] flex flex-row" />
    </div>
  </div>
</div>
<!-- Features  -->
<div class="bg-white">
  <div class="max-w-[2000px] w-full m-auto">
    <ScreenOverviewSimple />
  </div>
</div>

<div class="p-2 pt-5 md:p-9 m-h-[500px] mb-4">
  <div class="max-w-[2000px] w-full m-auto">
    <h1 class=" mb-2 md:text-3xl text-2xl text-primary-900 font-bold">
      Trending Problems
    </h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 w-full gap-2">
      {#each problems as problem}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="inline-block flex flex-shrink-0">
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
            <div class="flex-1 m-4 flex flex-col">
              <h5 class="text-md font-bold text-primary-900">
                {problem.title.slice(0, 45)}
              </h5>
              <p class="text-sm text-gray-500 mb-4">
                @{problem.user.username}
              </p>
              <p class="flex-1 text-sm">
                {problem.blurb.slice(0, 90)}...
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
    <h1 class="my-4 md:mx-0 text-2xl text-primary-900 font-bold">
      Popular Sectors
    </h1>
    <div
      class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 xl:grid-cols-6 2xl:grid-cols-6 w-full gap-4"
    >
      {#each sectors.slice(0, 50) as sector}
        <button
          class=" bg-white relative flex-shrink-0 border-primary-200 border hover:drop-shadow-xl"
          on:click={showSector(sector)}
        >
          <img
            class="w-full rounded-lg h-[200px]"
            src="{PUBLIC_IMG_CDN_BASE}{sector.image}"
            alt="content"
          />
          <h5
            class="p-2 m-2 font-bold  text-xs bg-primary-700 text-white absolute top-0 right-0 "
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
