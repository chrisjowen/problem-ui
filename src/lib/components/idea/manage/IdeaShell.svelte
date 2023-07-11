<script lang="ts">
  import { page } from "$app/stores";
  import { auth, selectedProblem } from "$lib/store";
  import type { Problem, User } from "$lib/types";
  import api from "$lib/api";
  import { Toast } from "flowbite-svelte";
  import CollapseMenu, {
    type MenuItem,
  } from "$lib/components/shared/leftmenu/CollapseMenu.svelte";
  import { onMount } from "svelte";

  export let problem: Problem;
  let reloadStakeholders: () => void;
  let me: User = $auth.loggedInUser;
  let id = $page.params.id;

  //   onMount(() => {
  //     reload();
  //   })

  let toast: null | string = null;
  function setToast(message: string) {
    toast = message;
    setTimeout(() => {
      toast = null;
    }, 3000);
  }

  export const save =
    (message: null | string = null) =>
    async () => {
      const res = await api.problem.update(problem.id, problem);
      reload(true, message);
    };

  onMount(() => {
    loadPages();
    buildMenu()
  });
  export let menuItems : MenuItem[] = [];


  function loadPages() {
    api.problem
      .pages($page.params.id)
      .list("", 50, 1, ["user"])
      .then((res) => {
        notes = res.data?.entries?.map((note) => {
          return {
            title: note.title,
            icon: "fa fa-file",
            href: `/idea/${id}/note/${note.id}`,
          };
        });
        // buildMenu();
      });
  }

  export function reload(
    force: boolean = false,
    successMessage: null | string = null
  ) {
    // debugger
    // if ($selectedProblem  && !force) return;
    api.problem
      .get($page.params.id, [
        "user",
        "user.profile",
        "problem_users",
        "problem_users.member",
        "sectors",
        "stakeholders",
        "votes",
        "votes.user",
        "comments",
        "comments.user",
        "contribution_requests",
        "contribution_requests.user",
        "products",
      ])
      .then((res) => {
        $selectedProblem = res.data;
        if (force) {
          setToast(successMessage || "Idea updated");
        }
        problem = res.data;
      });
  }
  let hideMenu = true;

  export let notes: MenuItem[] = [];

  function buildMenu() {
    menuItems = [
      {
        title: "Idea",
        icon: "fa-solid fa-lightbulb",
        virtual: true,
        children: [
          {
            title: "Preview",
            icon: "fa-solid fa-eye",
            href: `/idea/${id}`,
          },

          {
            title: "Basic Details",
            icon: "fa-solid fa-info-circle",
            href: `/idea/${id}/manage/details`,
          },
          {
            title: "Problem Statement",
            icon: "fa-solid fa-triangle-exclamation",
            href: `/idea/${id}/manage/statement`,
          },
          {
            title: "Stakeholders",
            icon: "fa-solid fa-people-arrows",
            href: `/idea/${id}/manage/stakeholders`,
          },
          {
            title: "Similar Products",
            icon: "fa-brands fa-product-hunt",
            href: `/idea/${id}/manage/competition`,
          },
        ],
      },
      {
        title: "Research",
        icon: "fa-solid fa-flask",
        virtual: true,
        children: [
          {
            title: "Crowd Validatation",
            icon: "fa-solid fa-vial-circle-check",
            href: `/idea/${id}/manage`,
          },
        ],
      },
      {
        title: "Collaborate",
        icon: "fa-solid  fa-user-group",
        href: `/idea/${id}/tools`,
        virtual: true,
        children: [
          {
            title: "Members",
            icon: "fa-solid fa-users",
            href: `/idea/${id}/users`,
          },
          {
            title: "Resources",
            icon: "fa fa-link ",
            href: `/idea/${id}/links`,
          },
          {
            title: "Discussions",
            icon: "fa fa-comment ",
            href: `/idea/${id}/discussion`,
          },
          {
            title: "Notes",
            icon: "fa fa-file ",
            href: `/idea/${id}/note`,
            children: notes,
          },
        ],
      },

      // {
      //   title: "Solution",
      //   icon: "fa-brands fa-lab",
      //   href: `/idea/${id}/manage/solution`,
      //   children: [
      //     {
      //       title: "Competition",
      //       icon: "fa-brands fa-product-hunt",
      //       href: `/idea/${id}/manage/competition`,
      //     },
      //   ],
      // },
    ];
  }


 


</script>

{#if toast}
  <div class="relative w-full">
    <Toast
      color="blue"
      class="absolute
      flex
    z-50
    right-10
    left-20
    top-10 
    p-4
    w-full
  "
    >
      <div class="flex items-center">
        <div>
          <i class="fa-solid text-xl fa-info-circle mr-2" />
        </div>
        <div>
          <h1 class="text-xl font-bold text center">
            {toast}
          </h1>
        </div>
      </div>
    </Toast>
  </div>
{/if}

{#if problem}
  <div class="md:flex h-full">
    <div class="w-[250px] bg-gray-200">
      <CollapseMenu {menuItems} bind:hidden={hideMenu} />
    </div>
    <div class="flex-1 h-full flex flex-col">
      <div
        class="p-4 text-xs text-gray-800 bg-white font-bold border-b-[1px] flex items-center"
      >
        <button on:click={() => (hideMenu = false)} class="md:hidden">
          <i class="fas fa-bars text-lg mr-2" />
        </button>
        <span class=" p-1 px-2 mr-2 bg-primary-800 text-white text-xs">
          {problem.status}
        </span>

        <span>{problem.title}</span>
      </div>
      <div class="flex-1 overflow-auto">
        <slot />
      </div>
    </div>
  </div>
{/if}
