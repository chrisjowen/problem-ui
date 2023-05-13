<script lang="ts">
  import type { Problem } from "$lib/types/problem.ts";
  import type { Channel } from "phoenix";

  import socket from "$lib/channel/problemsocket";
  import { page } from "$app/stores";
  import Products from "$lib/showproblem/research/products.svelte";
  import Questionaire from "$lib/showproblem/research/questionaire.svelte";
  import { onDestroy, onMount } from "svelte";
  import { TabItem, Tabs } from "flowbite-svelte";
  import Stakeholders from "./stakeholders.svelte";

  export let problem: Problem = null;

  let channel: Channel;
  let reloadProducts: any;
  let reloadStakeholders: any;
  let reloadQuestionaire: any;

  onMount(async () => {
    channel = socket.channel(`problem:${$page.params.id}`, {});
    channel.join().receive("ok", (resp: any) => {
      console.log("Joined successfully", resp);
    });
    channel.on("reload:products", reloadProducts);
    channel.on("reload:products", reloadProducts);
    channel.on("reload:questionaire", reloadQuestionaire);
  });

  onDestroy(() => {
    if (channel) {
      console.log("leaving channel");
      channel.leave();
    }
  });
</script>

<Tabs
  contentClass="border-0 bg-gray-50 h-screen p-5 "
  activeClasses="p-4  m-0 border-[0px] border-b-[4px] border-primary-900 text-primary-900 text-xs"
  inactiveClasses="p-4 hover:border-b-[4px] border-primary-900 m-0 text-xs"
>
  <TabItem open title="Related Products">
    <div slot="title" class="flex items-center gap-2">
      <i class="fa-brands fa-product-hunt" />
      Related Products
    </div>
    <Products problemId={problem.id} bind:reload={reloadProducts} />
  </TabItem>
  <TabItem title="Questionaire">
    <div slot="title" class="flex items-center gap-2">
      <i class="fa-sharp fa-solid fa-clipboard-question"></i>
      Questionaire
    </div>
    <Questionaire problemId={problem.id}  bind:reload={reloadQuestionaire}  />
  </TabItem>
  <TabItem title="Personas">
    <div slot="title" class="flex items-center gap-2">
      <i class="fa-solid fa-person-through-window"></i>
      Personas
    </div>
    <Stakeholders problemId={problem.id} bind:reload={reloadStakeholders} />
  </TabItem>
</Tabs>
