<script lang="ts">
  import { Button } from "flowbite-svelte";

  import problemApi from "$lib/api/problemApi";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";

  let sectors: any = [];
  let problems: any = [];

  onMount(() => {
    problemApi.sectors("", 10).then((res) => {
      sectors = res.data;
    });

    problemApi.problems("", 5).then((res) => {
      problems = res.data;
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
      <span class="text-primary-200">1000's of  Statup  Problems </span> Just Dying To Be Solved
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
  <h1 class="mb-9 text-3xl text-primary-900 font-bold">Trending Problems</h1>
  <div class="flex overflow-auto w-full pb-9">
    {#each problems.slice(0, 6) as problem}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div
        class="inline-block flex !w-[300px] md:!w-[500px] mr-2 flex-shrink-0"
      >
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div
          class=" bg-white border hover:border-primary-500 w-full md:flex flex-row"
          size="full"
          on:click={showProblem(problem)}
        >
          <div class="p-4">
            <img
              class="w-full md:w-auto object-cover object-center border"
              src="/api/image/{problem.img}"
              alt="content"
              style="height: 150px"
              
            />
          </div>
          <div class="flex-1 mb-4 m-4 space-y-4">
            <h5 class="text-2xl font-bold text-primary-900">
              {problem.title}
            </h5>
            <p class="">
              {problem.blurb.slice(0, 90)}...
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

<div class=" p-2 bg-primary-100">
  <h1 class="my-9 mx-4 text-3xl text-primary-900 font-bold">Problems By Sector</h1>
  <div class="flex mx-4 overflow-x-auto w-full">
    {#each sectors.slice(0, 50) as sector}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div
        class="border hover:border-primary-600 bg-white drop-shadow-lg mb-9 flex-shrink-0 !w-[300px] mr-2"
        on:click={showSector(sector)}
      >
        <img
          class="w-full h-[100px] object-cover object-center p-2"
          src="/api/image{sector.image}"
          alt="content"
        />

        <h5 class="mb-2 text-xl font-bold tracking-tight m-4 pb-4">
          {sector.name}
        </h5>
      </div>
    {/each}
  </div>
</div>

<!-- Signup  -->

<!-- <div class="bg-black p-9 h-[100px]">adasasdasd</div> -->

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
