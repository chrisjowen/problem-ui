<script lang="ts">
  import { auth } from "$lib/store";
  import { onMount } from "svelte";
  import { slide } from "svelte/transition";
  import api from "$lib/api";
  import ProblemDisplayLarge from "$lib/components/problem/ProblemDisplayLarge.svelte";
  import ProblemDisplayList from "$lib/components/problem/ProblemDisplayList.svelte";
  import type { Problem } from "$lib/types";
  import ProblemDisplayListSmall from "$lib/components/problem/ProblemDisplayListSmall.svelte";
  import { Button } from "flowbite-svelte";
  import { goto } from "$app/navigation";

  $: publicSpaces = [];
  let pageInnerWidth: number;
  let listView = false;
  let me = $auth.loggedInUser;
  let myProblems: Problem[] = [];

  onMount(() => {
    loadPublicSpaces();
    if ($auth.loggedInUser) {
      loadYourSpaces();
    }
  });

  $: {
    if (pageInnerWidth < 760) {
      listView = false;
    }
  }

  async function loadPublicSpaces() {
    let response = await api.problem.list(`public=true`, 9, 1, [
      "sectors",
      "user",
    ]);
    publicSpaces = response.data.entries;
  }

  async function loadYourSpaces() {
    api.user.get(me.id, ["memberships"]).then(async (r) => {
      me = r.data;

      let activeProblemIds = me.memberships
        .filter((m: any) => m.status == "active")
        .map((m: any) => m.problem_id)
        .join(",");

      let query = activeProblemIds
        ? `OR(id[in]=${activeProblemIds}|user_id=${me.id})`
        : `user_id=${me.id}`;

      let response = await api.problem.list(query, 50, 1, ["sectors", "user"]);
      myProblems = response.data.entries;
    });
  }
</script>

<svelte:window bind:innerWidth={pageInnerWidth} />
<div class="bg-gray-50 flex flex-col h-full">
  <div class="flex-1 overflow-auto">
    <div class="bg-gray-100 border-b-[1px]">
      <div class="md:flex border-b-[1px] p-2 justify-end">
        <Button
          size="xs"
          class="w-full md:w-auto"
          on:click={() => goto("/problem/create")}
        >
          <i class="fa-solid fa-rocket mr-1" />
          Create SolveSpace
        </Button>
      </div>

      <div class="max-w-[2000px] w-full p-4">
        <h1 class="text-xl text-gray-600 flex-1">
          <i class="fa-solid fa-rocket mr-1" />
          Your Spaces
        </h1>
        {#if me && myProblems.length > 0}
          <div
            class="grid gap-2 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 sm:grid-cols-1 my-4"
          >
            {#each myProblems as problem}
              <div class="inline-block flex w-full">
                <ProblemDisplayLarge {problem} />
              </div>
            {/each}
          </div>
        {:else}
          <div class="bg-white p-4 mt-2 flex border">
            <div class="mr-4">
              <img src="/img/ai.png" alt="Helper AI" class="w-32" />
            </div>
            <div >
              <h1 class="text-xl">No Space
                 Created</h1>
              <p class="text-gray-500 prose max-w-none">
                You have not created any spaces yet. Spaces are a place where
                you can collaborate with others to solve problems, build
                solutions, and share knowledge.
              </p>
              <div class="mt-4 ">
                <Button
                  class="w-full md:w-auto"
                  on:click={() => goto("/problem/create")}
                >
                  <i class="fa-solid fa-rocket mr-1" />
                  Create New Space
                </Button>
              </div>
            </div>
          </div>
        {/if}
      </div>
    </div>
    <div class="px-4">
      <h1 class="text-lg my-4 text-gray-600 mb-4">
        <i class="fa-solid fa-rocket mr-1" />
        Public SolveSpaces
      </h1>
      <div class="grid gap-2 grid-cols-1 lg:grid-cols-3 sm:grid-cols-1 f">
        {#if !publicSpaces || publicSpaces.length == 0}
          <p>Loading...</p>
        {/if}

        {#each publicSpaces as problem}
          <ProblemDisplayListSmall {problem} />
        {/each}
      </div>
    </div>
  </div>
</div>
