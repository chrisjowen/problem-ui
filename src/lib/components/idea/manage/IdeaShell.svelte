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
  import { connect } from "$lib/channel/socket";
  import type { Channel } from "phoenix";

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
    watch();
    loadPages();
    buildMenu()
  });
  export let menuItems : MenuItem[] = [];


  async function watch() {
    if ($auth.loggedInUser) {
      let channel: Channel = await connect(
        `user:${$auth.loggedInUser.id}`,
        $auth.token
      );

      ["problem:overview:creating", "problem:stakeholders:creating", "problem:image:complete"].map(
        (event) =>
          channel.on(event, () => {
            console.log(event)
          })
      );


      ["problem:overview:complete", "problem:stakeholders:complete", "problem:image:complete"].map(
        (event) =>
          channel.on(event, () => {
            console.log(event)
            reload(true, "Problem updated by AI helper");
          })
      );
    }
  }

 


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
        icon: "fa-solid fa-lightbulb text-yellow-300",
        virtual: true,
        children: [
          {
            title: "Preview",
            icon: "fa-solid fa-eye text-gray-400",
            href: `/idea/${id}`,
          },

          {
            title: "Basic Details ",
            icon: "fa-solid fa-info-circle text-blue-400",
            href: `/idea/${id}/manage/details`,
          },
          {
            title: "Problem Statement",
            icon: "fa-solid fa-triangle-exclamation text-red-400",
            href: `/idea/${id}/manage/statement`,
          },
          {
            title: "Stakeholders",
            icon: "fa-solid fa-people-arrows  text-green-400",
            href: `/idea/${id}/manage/stakeholders`,
          },
          {
            title: "Similar Products",
            icon: "fa-brands fa-product-hunt text-orange-400",
            href: `/idea/${id}/manage/competition`,
          },
        ],
      },
      {
        title: "Research",
        icon: "fa-solid fa-flask text-yellow-400" ,
        virtual: true,
        children: [
          {
            title: "Crowd Validatation",
            icon: "fa-solid fa-vial-circle-check text-blue-600",
            href: `/idea/${id}/manage`,
          },
        ],
      },
      {
        title: "Collaborate",
        icon: "fa-solid  fa-user-group text-pink-400",
        href: `/idea/${id}/tools`,
        virtual: true,
        children: [
          {
            title: "Members",
            icon: "fa-solid fa-users text-gray-700",
            href: `/idea/${id}/users`,
          },
          {
            title: "Resources",
            icon: "fa fa-link text-blue-700",
            href: `/idea/${id}/links`,
          },
          {
            title: "Discussions",
            icon: "fa fa-comment  text-green-700",
            href: `/idea/${id}/discussion`,
          },
          {
            title: "Notes",
            icon: "fa fa-file text-red-400",
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
    
    <div class="w-[250px] bg-white border-r-[1px]">
      <a class="border-b-[1px] p-5  text-xs w-full block font-bold text-gray-600 hidden md:block hover:bg-primary-600 hover:text-gray-50" href="/idea/me">
        <i class="fa-solid fa-arrow-left mr-2" />
         Back To Your Ideas
      </a>
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
