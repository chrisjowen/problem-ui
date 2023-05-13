<script lang="ts">
  import axios from "axios";
  import Overview from "$lib/showproblem/overview/overview.svelte";
  import { page } from "$app/stores";
  import { Tabs, TabItem, Card, Button } from "flowbite-svelte";
  import { onDestroy, onMount } from "svelte";
  import Makers from "$lib/showproblem/makers.svelte";
  import Research from "$lib/showproblem/research/research.svelte";
  import type { Problem } from "$lib/types/problem";
  import type { Channel } from "$lib/types/channel";
  import socket from "$lib/channel/problemsocket";
  import Plan from "$lib/showproblem/plan/plan.svelte";

  import { browser } from "$app/environment";

  let problem: Problem = null;
  let channel: Channel = null;
  let reloadSolution: any;

  onMount(async () => {
    let response = await axios.get(`/api/problem/${$page.params.id}`);
    problem = response.data;
    channel = socket.channel(`problem:${$page.params.id}`, {});
    channel.join().receive("ok", (resp: any) => {
      console.log("Joined successfully", resp);
    });
    channel.on("reload:solution", () => {
      reloadSolution();
    });
  });

  onDestroy(() => {
    if (channel) {
      console.log("leaving channel");
      channel.leave();
    }
  });

  let sections: string[] = [];
  $: {
    if (browser && problem) {
      let el = document.createElement("div");
      el.innerHTML = problem.overview;
      sections = [...el.querySelectorAll("h1,h2,h3")].map((node) => {
        var classes = "pl-2";
        if (node.nodeName == "H2") {
          classes = "pl-6";
        }
        if (node.nodeName == "H3") {
          classes = "pl-9";
        }
        return {
          classes: classes,
          text: node.innerText,
        };
      });
    }
  }
</script>

{#if problem}
  <div
    class="flex items-center justify-center text-white banner border-b-[1px] drop-shadow-lg h-full"
  >
    <h1 class="text-2xl lg:text-5xl drop-shadow-lg bg-primary-900 tx-white p-4">
      {problem.title}
    </h1>
  </div>

  <Tabs
    contentClass="border-0 bg-gray-50 h-screen"
    activeClasses="p-4  m-0 border-[0px] border-b-[4px] border-primary-900 text-primary-900"
    inactiveClasses="p-4 hover:border-b-[4px] border-primary-900 m-0"
  >
    <TabItem open>
      <div slot="title" class="flex items-center gap-2">
        <i class="fas fa-info-circle" />
        Problem
      </div>
      <div class="m-4 mb-0 grid grid-cols-4 gap-4">
        <Card
          padding="sm"
          class="flex justify-center items-center text-primary-700"
          size="2xl"
          color="primary"
        >
          <i class="fas fa-info-circle text-7xl mb-2" />
          <h2 class="text-primary-900 text-2xl bold">
            Develop Problem Statement
          </h2>
          <p class="text-gray-500 mt-5 text-md bold text-center">
            Refine & develop your problem statement and gain feedback
          </p>
        </Card>

        <Card
          padding="sm"
          class="flex justify-center items-center text-primary-700 "
          size="2xl"
        >
          <i class="fa fa-book-open text-7xl mb-2" />
          <h2 class="text-primary-900 text-2xl bold">Gather Market Research</h2>
          <p class="text-gray-500 mt-5 text-md bold text-center">
            Checkout compertition & gather customer feedback
          </p>
        </Card>
        <Card
          padding="sm"
          class="flex justify-center items-center text-primary-700"
          size="2xl"
        >
          <i class="fas fa-list-check text-7xl mb-2" />
          <h2 class="text-primary-900 text-2xl bold">Ideate & Plan</h2>
          <p class="text-gray-500 mt-5 text-md bold text-center">
            Outline and discuss the ideal solutions to this problem
          </p>
        </Card>
        <Card
          padding="sm"
          class="flex justify-center items-center text-primary-700 "
          size="2xl"
        >
          <i class="fa-solid fa-people-group text-7xl mb-2" />
          <h2 class="text-primary-900 text-2xl bold">Find Founders/Team</h2>
          <p class="text-gray-500 mt-5 text-md bold text-center">
            Find potential founders or team mates to build out the solution
          </p>
        </Card>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-5 mt-4">
        <section class="col-span-4">
          <div class=" pr-4 pl-4 mb-6">
            <Overview bind:problem />
          </div>
        </section>

        <div class="col-span-1 p-4 bg-gray-100 border mr-4 rounded-md mb-6">
          <h1 class="mb-4 text-xl text-primary-900">Sections</h1>
          {#each sections as section}
            <p
              class="flex items-center gap-2 text-sm p-4 bg-white m-2 border {section.classes}"
            >
              <i class="fas fa-link" />
              {section.text}
            </p>
          {/each}
        </div>
      </div>
    </TabItem>
    <TabItem>
      <div slot="title" class="flex items-center gap-2">
        <i class="fa fa-book-open" />
        Market Research
      </div>
      <Research {problem} />
    </TabItem>
    <TabItem title="Plan">
      <div slot="title" class="flex items-center gap-2">
        <i class="fas fa-list-check" />
        Ideate & Plan
      </div>
      <Plan problemId={problem.id} bind:reload={reloadSolution} />
    </TabItem>

    <TabItem title="Team">
      <div slot="title" class="flex items-center gap-2">
        <i class="fa-solid fa-people-group" />
        Project Team
      </div>
      <div class="m-4">
        <Makers />
      </div>
    </TabItem>
    <!-- <TabItem title="Experiments">
      <div class="m-4">
        TODO
      </div>
    </TabItem>
    <TabItem title="Announcements">
      <div class="m-4">
       TODO
      </div>
    </TabItem> -->
  </Tabs>
{/if}

<style lang="scss">
  .banner {
    position: relative;

    height: 280px;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: url("https://picsum.photos/1200/200");
      filter: sepia(100%) hue-rotate(190deg) saturate(500%);
      opacity: 0.8;
      background-size: cover;
    }
  }
</style>
