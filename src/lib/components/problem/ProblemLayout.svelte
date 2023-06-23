<script lang="ts">
  import { page } from "$app/stores";
  import { auth, selectedProblem, settings } from "$lib/store";
  import api from "$lib/api";
  import FollowButton from "./FollowButton.svelte";
  import ContributeButton from "./ContributeButton.svelte";
  import { isMember } from "$lib/util/authUtil";
  import LeftMenuLayout from "../shared/LeftMenuLayout.svelte";

  export let problem: any = null;
  export let menuItems: any[] = [];

  $: {
    $page.params.id  && reload();
  }

  export function reload(force: boolean = false) {
    if ($selectedProblem?.id?.toString() === $page.params.id && $page.params.f == null && !force) {
      problem = $selectedProblem;
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
        });
    }
  }

  let path = $page.url.pathname;

  $: {
    if (problem && menuItems.length === 0) {
      menuItems = [
        {
          title: "Overview",
          icon: "fa-solid fa-atom ",
          href: `/problem/show/${problem.id}`,
        },
        {
          title: "Contributors",
          icon: "fa fa-user-plus",
          href: `/problem/show/${problem.id}/users`,
        },
        {
          title: "Discussions",
          icon: "fa-solid fa-comment ",
          href: `/problem/show/${problem.id}/discussion`,
        },
        {
          title: "Pages",
          icon: "fas fa-file ",
          href: `/problem/show/${problem.id}/page`,
        },
        {
          title: "Resources",
          icon: "fa fa-link ",
          href: `/problem/show/${problem.id}/links`,
        },
        // {
        //   title: "Risks",
        //   icon: "fa fa-exclamation-triangle ",
        //   href: `/problem/show/${problem.id}/obstacles`,
        // },
        {
          title: "Activity",
          icon: "fas fa-rss ",
          href: `/problem/show/${problem.id}/feed`,
        },
        // {
        //   title: "Research",
        //   icon: "fas fa-book",
        //   href: `/problem/show/${problem.id}`,
        // },
        // {
        //   title: "Ideas",
        //   icon: "fa fa-lightbulb ",
        //   href: `/problem/show/${problem.id}`,
        // },

        // {
        //   title: "Solutions",
        //   icon: "fa fa-lightbulb ",
        //   href: `/problem/show/${problem.id}/solutions`,
        // },
      ];
    }
  }

  function chekPath(item: any) {
    if (!problem) return false;
    let base = `/problem/show/${problem.id}`;

    if (path == base && item.href == path) {
      return true;
    }
    return item.href != base && path.indexOf(item.href) > -1;
  }
</script>


<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<LeftMenuLayout inPath={chekPath} {menuItems} showTopMenu={true}>
  <div class="md:flex" slot="topmenu">
    {#if problem}
      <div class="flex-1 p-4  text-xs text-gray-500 font-bold">
        <span
        class=" p-1 px-2  mr-2 bg-gray-300 text-gray-600 text-xs"
        >{problem.public ? "Public" : "Private"}</span
      >
        <span
          >@<a href="/users/{problem.user.username}">{problem.user.username}</a
          ></span
        >
        <span>/</span>
        <span>{problem.title}</span>
       
      </div>
      {#if !$auth.loggedInUser || !isMember(problem)}
        <div class="lg:space-x-1 flex spacy-y-1chr p-2 ">
          <FollowButton on:change={() => reload(true)} {problem} />
          <ContributeButton on:requested={() => reload(true)} {problem} />
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
