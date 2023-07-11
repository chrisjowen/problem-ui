<script lang="ts">
  import { auth } from "$lib/store";
  import { onMount } from "svelte";
  import api from "$lib/api";
  import { Button, Indicator, TabItem, Tabs } from "flowbite-svelte";
  import { goto } from "$app/navigation";
  import NotificationFeedList from "$lib/components/problem/NotificationFeedList.svelte";
  import _ from "lodash";
  import { imageUrl } from "$lib/util/imageutil";
  import UserProfileDisplay from "$lib/components/user/UserProfileDisplay.svelte";
  import type { PageData } from "./$types";
  import ProblemCard from "$lib/components/problem/new/ProblemCard.svelte";
  import MiniProblemCard from "$lib/components/problem/MiniProblemCard.svelte";

  let me = $auth.loggedInUser;
  let problems: any[] = [];

  $: myProblems = _.uniqBy(
    problems?.concat(
      me?.memberships
        ?.filter((m) => m.status == "active")
        .map((m: any) => {
          return { ...m.problem, membership: m };
        }) ?? []
    ),
    "id"
  );

  $: filteredProblems = myProblems;

  // TODO: Make preloads queriable too https://hexdocs.pm/ecto/Ecto.Query.html#preload/3-preload-functions
  onMount(async () => {
    loadProblems();
  });

  function loadProblems() {
    api.problem.list(`user_id=${me.id}`, 500, 1, ["user"]).then((res) => {
      problems = res.data.entries;
    });
  }
</script>

<div class="md:p-8 p-4 bg-white">
  {#if filteredProblems.length == 0}
    <div class="text-center">
      <h1 class="text-xl font-bold">You Have No Ideas</h1>

      <Button
        class="mt-4"
        color="primary"
        size="xl"
        on:click={() => goto("/idea/create")}
      >
        <i class="fas fa-lightbulb mr-2" /> Create One Now!
      </Button>
    </div>
  {:else}
    <h1 class="mb-4 text-xl font-bold">Jump Back In</h1>

    <div
      class="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-4"
    >
      {#each filteredProblems as problem}
        <a href="/idea/{problem.id}/manage">
          <MiniProblemCard {problem} />
        </a>
      {/each}
    </div>
  {/if}
</div>
