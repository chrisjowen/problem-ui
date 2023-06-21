<script>
  import { Button } from "flowbite-svelte";
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";

  let position = 0;
  let show = true;
  let images = [
    "/img/home/idea.png",
    "/img/home/problem.png",
    "/img/home/sectors.png",
  ];

  function rotate() {
    position = (position + 1) % 3;
    let temp = [...images];
    temp.unshift(temp.pop());
    images = temp;
  }
</script>

<div class="flex flex-row bg-white p-4 md:p-9 relative">
  <div class="lg:p-9 flex-1">
    <div class="flex-1">
      {#if position == 0}
        <h1 class="text-primary-500 text-3xl md:text-4xl lg:text-5xl font-bold">
          Collaborative Problem Solving & Ideation
        </h1>
        <p class="text-md md:text-xl mt-5 text-gray-500">
          Create or discover real world problems that actually have a real
          demand to be solved.
        </p>
        <p class="text-md md:text-xl  mt-5 text-gray-500">
          Invite collegues, friends or experts from the community to help you
          build a solution that delights customers
        </p>
      {:else if position == 1}
        <h1 class="text-primary-500 text-3xl md:text-4xl lg:text-5xl font-bold">
          AI Assisted Problem Statement Curation
        </h1>
        <p class="text-xl mt-5 text-gray-500">
          Use our AI helper to guide you through the problem statement creation
          process. Feel like a creative genius with a few small prompts
        </p>
        <p class="text-xl mt-5 text-gray-500">
          Use our AI helper to guide you through the problem statement creation
          process. Feel like a creative genius with a few small prompts
        </p>
      {:else}
        <h1 class="text-primary-500 text-3xl md:text-4xl lg:text-5xl font-bold">
          Follow Sectors For The Latest News & Problems
        </h1>
        <p class="text-xl mt-5 text-gray-500">
          Use our AI sector tracker to follow the latest news and problems in
          your sector of interest.
        </p>
        <p class="text-xl mt-5 text-gray-500">
          Dont miss new products and problems curated and solved by our
          community
        </p>
      {/if}
    </div>
    <div class="justify-end items-end hidden md:block">
      <Button color="light" class="w-full mt-9" on:click={rotate}
        >Discover Features
        <i class="fas fa-arrow-right ml-2" />
      </Button>
    </div>
  </div>
  <div class=" flex-1 h-full my-9">
    <div class="flex items-center justify-center mx-9">
      <img
        src={images[1]}
        class="rotate drop-shadow-lg rounded-xl xl:w-[550px] lg:w-[400px] md:w-[300px] w-[100%] z-10 md:block"
        alt="ideate"
      />
    </div>
  </div>
</div>
