<script lang="ts">
  import { Input, Label, Helper, Button, Modal } from "flowbite-svelte";
  import * as Icon from "svelte-heros-v2";
  import { Card } from "flowbite-svelte";
  import axios from "axios";
  import type { Problem } from "$lib/types/problem.ts";
  import { onMount } from "svelte";
  import CreateProblemModal from "$lib/createproblem/CreateProblemModal.svelte";
  import { goto } from "$app/navigation";

  let ideas: any[] = [];
  let showModal = false;

  function show() {
    showModal = true;
  }

  onMount(() => {
    axios
      .get("/api/idea")
      .then((res) => {
        ideas = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  });
  let showIdea= (idea: any) => () => {
    goto(`/idea/${idea.id}`);
  };
</script>

<div class="bg-gray-50 p-9">
  <h2 class="mb-3 text-2xl font-bold tracking-tight text-primary-600">Ideas</h2>
  <div
    class="grid gap-4 grid-cols-1 md:grid-cols-2 md:grid-cols-5 overflow-x-auto"
  >
    {#each ideas as idea, idx}
      <div class="inline-block flex">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class=" bg-white border hover:bg-primary-100 w-full"
          on:click={showIdea(idea)}
        >
          <img
            class="w-full h-[140px] object-cover object-center"
            src="/api/image/{idea.img}"
            alt="content"
          />
          <h5 class="text-2xl p-6 font-bold tracking-tight text-primary-600">
            {idea.title}
          </h5>
        </div>
      </div>
    {/each}
  </div>
</div>

<Modal bind:open={showModal} class="w-full" size="xl">
  <CreateProblemModal />
</Modal>

<!-- Testemonial  -->

<!-- Signup  -->

<style lang="scss">
  .hero {
    background-image: url("/img/hero.png");
    background-color: black;

    background-repeat: no-repeat;
    width: 100%;
    background-size: cover;
  }
</style>
