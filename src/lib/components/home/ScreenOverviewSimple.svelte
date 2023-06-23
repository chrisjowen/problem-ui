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

<div class="md:flex flex-row bg-white p-4 md:p-9 ">
  <div class="lg:p-9 flex-1 flex items-center ">
    <div class="flex-1 text-center animate__animated animate__backInLeft">
      <h1
        class="text-primary-500 my-9  mb:my-0 text-3xl md:text-4xl lg:text-5xl font-bold"
      >
        Collaborative Problem Solving & Ideation
      </h1>
      <p class="text-xl md:text-xl mt-5 text-gray-500">
        Create or discover real world problems that actually have a real demand
        to be solved.
      </p>
      <p class="text-xl md:text-xl mt-5 text-gray-500">
        Invite collegues, friends or experts from the community to help you
        build a solution that delights customers
      </p>
    </div>
  </div>
  <div class=" flex-1 h-full my-9 animate__animated animate__backInRight">
    <div class="flex items-center justify-center mx-9">
      <img
        src={images[1]}
        class="rotate drop-shadow-lg rounded-xl xl:w-[550px] lg:w-[400px] md:w-[300px] w-[100%] z-10 md:block"
        alt="ideate"
      />
    </div>
  </div>
</div>

<div class="md:flex flex-row bg-gray-100 p-4 md:p-9">
  <div class=" flex-1 h-full my-9 hidden md:block">
    <div class="flex items-center justify-center mx-9 animate__animated animate__backInLeft">
      <img
        src="/img/home/idea.png"
        class="rotate drop-shadow-lg rounded-xl xl:w-[550px] lg:w-[400px] md:w-[300px] w-[100%] z-10 md:block"
        alt="ideate"
      />
    </div>
  </div>
  <div class="lg:p-9 flex-1 flex items-center mb-9 ">
    <div class="flex-1 text-center animate__animated animate__backInRight">
      <h1
        class="text-primary-500 my-9  mb:my-0 text-3xl md:text-4xl lg:text-5xl font-bold"
      >
        AI Assisted Problem Statement Generation
      </h1>
      <p class="text-xl mt-5 text-gray-500">
        Use our AI helper to guide you through the problem statement creation
        process. Feel like a creative genius with a few small prompts
      </p>
    </div>
  </div>
  <div class=" flex-1 h-full my-9 md:hidden">
    <div class="flex items-center justify-center mx-9 animate__animated animate__backInLeft">
      <img
        src="/img/home/idea.png"
        class="rotate drop-shadow-lg rounded-xl xl:w-[550px] lg:w-[400px] md:w-[300px] w-[100%] z-10 md:block"
        alt="ideate"
      />
    </div>
  </div>
</div>

<div class="md:flex flex-row bg-white p-4 md:p-9">
  <div class="lg:p-9 flex-1 flex items-center animate__animated animate__backInLeft">
    <div class="flex-1 text-center">
      <h1
        class="text-primary-500 my-9 mb:my-0 text-3xl md:text-4xl lg:text-5xl font-bold"
      >
       Latest Sectors News <br /> & Problems
      </h1>

      <p class="text-md text-xl mt-5 text-gray-500 ">
        Stay up to date with our AI aggregated sector news, never miss a beat
      </p>
     
    </div>
  </div>
  <div class=" flex-1 h-full my-4 my-9">
    <div class="flex items-center justify-center mx-9 animate__animated animate__backInRight">
      <img
        src= "/img/home/sectors.png"
        class="rotate drop-shadow-lg rounded-xl xl:w-[550px] lg:w-[400px] md:w-[300px] w-[100%] z-10 md:block"
        alt="ideate"
      />
    </div>
  </div>
</div>
