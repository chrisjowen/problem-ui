<script lang="ts">
  import { page } from "$app/stores";
  import { auth, selectedProblem, settings, state } from "$lib/store";
  import api from "$lib/api";
  import FollowButton from "./FollowButton.svelte";
  import ContributeButton from "./ContributeButton.svelte";
  import {
    invited,
    isLoggedIn,
    membership,
    isMember,
    requested,
  } from "$lib/util/authUtil";
  import LeftMenuLayout from "../shared/LeftMenuLayout.svelte";
  import { Button } from "flowbite-svelte";
  import { onMount } from "svelte";

  export let problem: any = null;
  export let menuItems: any[] = [
    {
      title: "Overview",
      icon: "fa-solid fa-atom ",
      href: `/problem/show/${$page.params.id}`,
    },
  ];

  onMount(() => reload(true));

  $: {
    $page.params.id && reload();
  }
  $: {
    if (
      problem &&
      $state?.soons?.entries?.length > 0
    ) {
      setTimeout(makeMenu, 0)
    }
  }

  export function reload(force: boolean = false) {
    if (
      $selectedProblem?.id?.toString() === $page.params.id &&
      $page.params.f == null &&
      !force
    ) {
      problem = $selectedProblem;
      setTimeout(makeMenu, 0)
    } else {
      api.problem
        .get($page.params.id, [
          "products",
          "sectors",
          "user",
          "followers",
          "problem_users",
          "problem_users.member",
          "users",
        ])
        .then((res) => {
          $selectedProblem = res.data;
          problem = res.data;
          setTimeout(makeMenu, 0)
        });
    }
  }


  function makeMenu() {
    let additional = ($state.soons?.entries || []).map((soon: any) => {
        return {
          title: soon.title,
          icon: soon.icon,
          href: `/problem/show/${problem.id}/comingsoon/${soon.id}`,
          comingSoon: true,
        };
      });

      menuItems = [
        {
          title: "Overview",
          icon: "fa-solid fa-atom ",
          href: `/problem/show/${problem.id}`,
        },
        {
          title: "News",
          icon: "fas fa-newspaper",
          href: `/problem/show/${problem.id}/news`,
        },

        {
          title: "Discussions",
          icon: "fa-solid fa-comment ",
          href: `/problem/show/${problem.id}/discussion`,
        },
        {
          title: "Notes",
          icon: "fas fa-file ",
          href: `/problem/show/${problem.id}/page`,
        },

        // {
        //   title: "Customer Insights",
        //   icon: "fa-solid fa-people-arrows",
        //   href: `/problem/show/${problem.id}/customers`,
        // },
        {
          title: "Resources",
          icon: "fa fa-link ",
          href: `/problem/show/${problem.id}/links`,
        },
        {
          title: "Contributors",
          icon: "fa fa-user-plus",
          href: `/problem/show/${problem.id}/users`,
        },
        ...additional,
        {
          title: "Activity",
          icon: "fas fa-rss ",
          href: `/problem/show/${problem.id}/feed`,
        },
      ];
  }


  let path = $page.url.pathname;

 

  function checkPath(item: any) {
    if (!problem) return false;
    let base = `/problem/show/${problem.id}`;

    if (path == base && item.href == path) {
      return true;
    }
    return item.href != base && path.indexOf(item.href) > -1;
  }

  function acceptRequest(): void {
    let member = membership(problem);
    api.problem
      .members(problem.id)
      .update(member.id, {
        status: "active",
      })
      .then(() => {
        reload(true);
      });
  }
</script>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<LeftMenuLayout {menuItems} showTopMenu={true}>
  {#if invited(problem)}
    <div class="border-b-[1px] p-4 bg-primary-200 text-center space-y-4">
      <p class="text-xl">
        <i class="fa fa-info-circle mr-2 text-5xl text-primary-700" />
        You have been invited to contribute to this idea
      </p>

      <div>
        <Button on:click={acceptRequest}>
          <i class="fa fa-user-plus mr-2" /> Join & Contribute
        </Button>
      </div>
    </div>
  {:else if requested(problem)}
    <div class="border-b-[1px] p-4 bg-blue-500 text-center space-y-4">
      <div class="text-xl flex items-center text-gray-200">
        <i class="fa fa-info-circle mr-2 text-3xl" />
        <p class="flex items-center">
          You have requested to contribute to this idea
        </p>
      </div>
    </div>
  {/if}
  <div class="md:flex" slot="topmenu">
    {#if problem}
      <div class="flex-1 p-4 text-xs text-gray-500 font-bold">
        <span class=" p-1 px-2 mr-2 bg-primary-500 text-gray-100 text-xs">
          {problem.public ? "Public" : "Private"}
        </span>
        <span>
          @<a href="/users/{problem.user.username}">{problem.user.username}</a>
        </span>
        <span>/</span>
        <span>{problem.title}</span>
      </div>
      {#if !$auth.loggedInUser || !isMember(problem)}
        <div class="lg:space-x-1 flex spacy-y-1chr p-2">
          <FollowButton on:change={() => reload(true)} {problem} />
          {#if isLoggedIn()}
            <ContributeButton on:requested={() => reload(true)} {problem} />
          {/if}
        </div>
      {/if}
    {/if}
  </div>

  {#if !problem}
    <div class="bg-gray-50 p-9">
      <h2 class="mb-3 text-2xl font-bold tracking-tight text-primary-600">
        Loading...
      </h2>
    </div>
  {:else}
    <slot />
  {/if}
</LeftMenuLayout>
