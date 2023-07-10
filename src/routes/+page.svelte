<script lang="ts">
  import { beforeUpdate, onMount } from "svelte";
  import { goto } from "$app/navigation";
  import api from "$lib/api";
  import { PUBLIC_IMG_CDN_BASE } from "$env/static/public";
  import FeatureList from "$lib/components/home/FeatureList.svelte";
  import SolveSpaceOverview from "$lib/components/home/SolveSpaceOverview.svelte";
  import { Button } from "flowbite-svelte";
  import ProblemCard from "$lib/components/problem/new/ProblemCard.svelte";

  let sectors: any = [];
  let problems: any = [];

  onMount(() => {
    api.problem.list("status=ACTIVE", 8, 1, ["sectors", "user"]).then((res) => {
      problems = res.data.entries;
    });
  });
</script>

<div style="background:#245cd6">
  <!-- HERO -->
  <div
    class="max-w-[2000px] hero bg-primary-600 flex flex justify-center m-h-[50%] xl:m-h-[50%] m-auto"
  >
    <div class="lg:mt-[100px] mt-[50px] w-[80%] lg:w-[900px] md:w-[50%] z-20">
      <h1
        class="text-white font-bold lg:text-7xl text-6xl bold text-center mb-9"
      >
       So You've Got An Awesome Startup Idea?
      </h1>
      <h2
        class="text-primary-300 mb-9 font-bold lg:text-5xl text-4xl bold text-center"
      >
        Before building it, first validated it with the crowd!
      </h2>
      <div class="flex flex-row justify-center mb-9 md:my-[100px] ">
        <a
          href="/idea/create"
          class="bg-white
          flex items-center
            rounded-lg
            drop-shadow-lg
            text-primary-500
            text-lg md:text-xl
            lg:text-xl drop-shadow-lg
            group
            font-bold
            hover:bg-primary-900
            hover:text-white
            py-4
            px-8"
        >
          <i class="fas fa-lightbulb text-gray-200 group-hover:text-yellow-300 mr-2" />
          Validate Your Idea
        </a>
      </div>
    </div>
  </div>
</div>
<!-- Features  -->
<div class="max-w-[1200px] m-auto p-4">
  <div class="flex">
    <div class="flex-1">
      <h2 class="text-xl font-bold my-2">Trending Ideas</h2>
    </div>
    <a href="/idea/" color="light" class="hover:bg-gray-50 px-2 text-xs rounded-lg  flex items-center">
      <i class="fas fa-lightbulb text-yellow-300 mx-2" />
      Explore All Ideas
      <i class="fas fa-chevron-right text-gray-500 mx-2" />
    </a>
  </div>
  <div class="noscroll flex overflow-auto w-full flex-shrink-0 my-2">
    {#each problems as problem}
      <ProblemCard {problem} />
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
