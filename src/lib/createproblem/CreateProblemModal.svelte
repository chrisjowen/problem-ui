<script lang="ts">
    import { browser } from "$app/environment";
    import axios from "axios";
    import { Button, Textarea } from "flowbite-svelte";
    import { Socket } from "phoenix";
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { Spinner } from "flowbite-svelte";
    let content = "";
    let problem = "";
    let identifier = "123123123";
    let creating = false;
  
    function rewrite() {
      creating = true;
      axios
        .post("/api/problem/submit", { problem: problem, identifer: identifier })
        .then((res) => {
          content = res.data;
        });
    }
  
    onMount(() => {
      if (browser) {
        let socket = new Socket("ws://localhost:4000/socket");
        socket.connect();
        let channel = socket.channel(`problem:uid-${identifier}`, {});
        channel
          .join()
          .receive("ok", (resp) => {
            console.log("Joined successfully", resp);
          })
          .receive("error", (resp) => {
            console.log("Unable to join", resp);
          });
  
        channel.on("created:problem", (resp) => {
          goto(`/problem/show/${resp.problem_id}`);
        });
      }
    });
  </script>
  
  <div class="grid grid-cols-6 items-center justify-center ">
    <div class="flex-1 col-span-4 m-9 h-full">
      {#if !creating}
        <h1 class="text-primary-600 text-4xl bold text-center mb-2">
          Describe Your Problem
        </h1>
        <p class="text-center text-gray-400">
          Dont worry about been too detailed, we will help you create the perfect
          problem statement
        </p>
  
        <div class="m-5">
          <Textarea rows="12" class="mb-5" bind:value={problem} />
  
          <Button
            class="bg-primary-600 hover:bg-primary-600  w-full"
            on:click={rewrite}>Lets Go!</Button
          >
        </div>
      {:else}
        <h1 class="text-primary-600 text-4xl bold text-center mb-6">
          Analysing Problem
        </h1>
  
        <p class="text-center mb-5 text-gray-400">
          Let me see if I can make this problem statement more clear, this may take up to 30 seconds. 
        </p>
  
        <div class="text-center mt-9">
          <Spinner color="primary" size={24} />
        </div>
      {/if}
    </div>
    <div class="m-9 col-span-2">
      <img src="/img/think.png" alt="thinking robot" class=" h-[300px] flip-x" />
    </div>
  </div>
  
  <style lang="css">
    .flip-x {
      -webkit-transform: scaleX(-1);
      transform: scaleX(-1);
    }
  </style>
  