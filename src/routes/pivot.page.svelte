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

<div  class="h-full">
  <!-- HERO -->
  <div
    class="max-w-[2000px] bg-white  old:bg-primary-600 h-full flex flex justify-center  m-auto"
  >
    <div
      class="lg:mt-[100px] mt-[50px] w-[80%] lg:w-[900px] md:w-[50%]  z-20"
    >
      <h1
        class="font-bold lg:text-7xl text-6xl bold  mb-9"
      >
        <span class="text-primary-600">
          CrowdSolve Is Pivoting!!
        </span> <br /> Come Back Soon
      </h1>

      <div class="prose">
        <h1>Whats The Story?</h1>
        <p class=" text-xl l  mb-9 ">
          When I first setout to build CrowdSolve I envisioned something, and then went full steam ahead building. 
          Obviously, this was an aweful approach and one that the next version of CrowdSolve will actively help people to avoid. 
        </p>

        <p class=" text-xl mb-9 ">
          Right now I am regathering my thoughts and will be back soon with a new version of CrowdSolve that will help people validate their ideas before they build them. 
          Exactly what I should have done intially 🤦‍♂️
        </p>

        <p class="text-xl mb-9 ">
          Thanks, Chris
        </p>

      </div>
    

      <!-- <div class="flex flex-row justify-center mb-9 md:my-[100px] ">
        <a
          href="/idea/create"
          class="bg-white 
            rounded-lg
            drop-shadow-lg
            text-primary-600 
            text-lg md:text-2xl
            lg:text-2xl drop-shadow-lg
            hover:bg-primary-900
            hover:text-white
            font-bold
            py-4
            px-8"
        >
          <i class="fas fa-lightbulb mr-2" />
          Validate Your Idea
        </a>
      </div> -->
    </div>
  </div>
</div>
<!-- Features  -->



<style lang="scss">
  .hero {
    width: 100%;
    position: relative;
  }

  .hero::before {
    content: "";
    // background-image: url("/img/hero.png");
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
