<script>
  import { Input, Label, Helper, Button } from "flowbite-svelte";
  import * as Icon from "svelte-heros-v2";

</script>

<!-- HERO -->
<div class="hero flex flex justify-center">
  <div class="lg:mt-[100px] mt-[50px] w-1/2 lg:w-1/3 sm:w-1/2 ">
    <h1 class="text-primary-500 lg:text-7xl md:text-5xl text-2xl bold">
      Dream, Create &  Collabortate
    </h1>
    <p class="mt-9 mb-[50px] text-red-50 lg:text-2xl">
      Join a global community of innovators, creators and investors on problems
      worth solving.
    </p>
    <div class="mt-9 mb-[50px] lg:mb-[150px] flex flex-row">
      <div class="flex-1 mr-5">
        <Input type="text" id="first_name" placeholder="John" required />
      </div>
      <div>
        <Button class="bg-primary-500 hover:bg-primary-900">Join Us</Button>
      </div>
    </div>
  </div>
</div>

<!-- Features  -->

<div class="grid gap-2 md:grid-cols-4 m-9">
  <div class="border col-span-3">
    
  </div>
  <div class="col-span-1">
    <div class="grid gap-2 grid-cols-2">
      <div class="col-span-1 hover:bg-primary-100  p-4 flex items-center justify-center flex-col ">
        <div>
          <div class="rounded-full  p-4 bg-primary-500"> 
            <Icon.User size={40} color="white" /> 
          </div>
        </div>
        <p class="text-center text-primary-500 mt-3 bold">Simple Competitor Analisys</p>
      </div>

      <div class="col-span-1 hover:bg-primary-100  p-4 flex items-center justify-center flex-col ">
        <div>
          <div class="rounded-full  p-4 bg-primary-500"> 
            <Icon.Map size={40} color="white" /> 
          </div>
        </div>
        <p class="text-center text-primary-500 mt-3 bold">Estimate Market Size</p>
      </div>

      <div class="col-span-1 hover:bg-primary-100  p-4 flex items-center justify-center flex-col ">
        <div>
          <div class="rounded-full  p-4 bg-primary-500"> 
            <Icon.User size={40} color="white" /> 
          </div>
        </div>
        <p class="text-center text-primary-500 mt-3 bold">Simple Competitor Analisys</p>
      </div>

      <div class="col-span-1 hover:bg-primary-100  p-4 flex items-center justify-center flex-col ">
        <div>
          <div class="rounded-full  p-4 bg-primary-500"> 
            <Icon.Map size={40} color="white" /> 
          </div>
        </div>
        <p class="text-center text-primary-500 mt-3 bold">Estimate Market Size</p>
      </div>

      <div class="col-span-1 hover:bg-primary-100  p-4 flex items-center justify-center flex-col ">
        <div>
          <div class="rounded-full  p-4 bg-primary-500"> 
            <Icon.User size={40} color="white" /> 
          </div>
        </div>
        <p class="text-center text-primary-500 mt-3 bold">Simple Competitor Analisys</p>
      </div>

      <div class="col-span-1 hover:bg-primary-100  p-4 flex items-center justify-center flex-col ">
        <div>
          <div class="rounded-full  p-4 bg-primary-500"> 
            <Icon.Map size={40} color="white" /> 
          </div>
        </div>
        <p class="text-center text-primary-500 mt-3 bold">Estimate Market Size</p>
      </div>
    </div>
  </div>
</div>

<!-- Testemonial  -->

<div class="bg-primary-100 p-9 h-[500px]">
adasasdasd
</div>

<!-- Signup  -->

<div class="bg-black p-9 h-[500px]">
  adasasdasd
  
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
