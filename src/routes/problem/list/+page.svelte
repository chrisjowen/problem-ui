<script lang="ts">
  import { Input, Label, Helper, Button, Modal } from "flowbite-svelte";
  import * as Icon from "svelte-heros-v2";
  import { Card } from "flowbite-svelte";
  import axios from "axios";
  import type { Problem } from "$lib/types/problem.ts";
  import { onMount } from "svelte";
  import CreateProblemModal from "$lib/createproblem/CreateProblemModal.svelte";

  let problems: Problem[] = [];
  let showModal = false;

  function show() {
    showModal = true;
  }

  onMount(() => {
    axios
      .get("/api/problem")
      .then((res) => {
        problems = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  });
</script>

<div class="bg-gray-50 p-9">
  <h2 class="mb-3 text-2xl font-bold tracking-tight text-primary-900">
    Active Problems
  </h2>
  <!-- HERO -->
  <div
    class="grid gap-4 md:grid-cols-2 md:grid-cols-4 overflow-x-auto "
  >
    <div on:click={show} class="flex">
        <Card href="#click" class="flex-1">
          <div class="mr-4 flex items-center justify-center h-full">
            <i class="fa fa-add text-7xl text-primary-900" />
          </div>
        </Card>
      </div>
    {#each problems as problem, idx}
      <div class="inline-block flex">
        <Card
          img="https://picsum.photos/282/{150 + idx}"
          href="/problem/show/{problem.id}"
        >
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-primary-900">
            {problem.title}
          </h5>
          <p
            class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight"
          >
            {problem.blurb}
          </p>
        </Card>
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
