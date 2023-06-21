<script lang="ts">
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import { auth, selectedProblem, settings } from "$lib/store";
  import api from "$lib/api";
  import FollowButton from "./FollowButton.svelte";
  import ContributeButton from "./ContributeButton.svelte";
  import { isMember } from "$lib/util/authUtil";

  export let problem: any = null;
  export let menuItems: any[] = [];
  let showMobileMenu = false;

  $: small = $settings.expandProductMenu;

  $: {
    $page.params.id && reload();
  }

  export function reload(force: boolean = false) {
    if ($selectedProblem?.id?.toString() === $page.params.id && !force) {
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

        {
          title: "Resources",
          icon: "fa fa-link ",
          href: `/problem/show/${problem.id}/links`,
        },

        {
          title: "Risks",
          icon: "fa fa-exclamation-triangle ",
          href: `/problem/show/${problem.id}/obstacles`,
        },

        {
          title: "Activity",
          icon: "fas fa-rss ",
          href: `/problem/show/${problem.id}/feed`,
        },
        // {
        //   title: "Solutions",
        //   icon: "fa fa-lightbulb ",
        //   href: `/problem/show/${problem.id}/solutions`,
        // },
      ];
    }
  }

  $: selected = menuItems.find(inPath);
  $: unselected = menuItems.filter((i) => i != selected);

  function inPath(item: any) {
    if (!problem) return false;
    let base = `/problem/show/${problem.id}`;

    if (path == base && item.href == path) {
      return true;
    }
    return item.href != base && path.indexOf(item.href) > -1;
  }

  function toggleWidth() {
    $settings.expandProductMenu = !$settings.expandProductMenu;
  }

  function toggleMobileMenu(
    event: MouseEvent & { currentTarget: EventTarget & HTMLDivElement }
  ) {
    showMobileMenu = !showMobileMenu;
  }
</script>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->

{#if !problem}
  <div class="bg-gray-50 p-9">
    <h2 class="mb-3 text-2xl font-bold tracking-tight text-primary-600">
      Loading...
    </h2>
  </div>
{:else}
  <div class="flex flex-col h-full bg-gray-100 drop-shadow-xl z-40 h-full">
    <section id="MobileMenu" class="bg-primary-700 drop-shadow-sm">
      <div class="block md:hidden text-xs p-2">
        <div
          class="bg-white border p-2 border rounded-lg flex flex-row"
          on:click={toggleMobileMenu}
          on:keypress={toggleMobileMenu}
        >
          <i class="{selected.icon} text-primary-400 flex items-center mr-2" />
          <p class="flex-1 flex items-center">{selected.title}</p>
          <i class="fas fa-chevron-down text-gray-400 mr-2 flex items-center" />
        </div>
        <div
          class="border bg-white p-2 rounded-xl mt-2 w-full {showMobileMenu
            ? ''
            : 'hidden'}"
        >
          {#each unselected as item}
            <a
              href={item.href}
              class="flex flex-row w-full p-2 hover:bg-gray-50 text-gray-600 hover:text-primary-400"
            >
              {#if item.icon}
                <i class="{item.icon} flex items-center mr-2" />
              {/if}
              <p class="flex items-center">
                {item.title}
              </p>
            </a>
          {/each}
        </div>
      </div>
    </section>
    <div class="flex flex-1 flex-row overflow-hidden slide h-full">
      <section id="LeftMenu"
        class="bg-gray-200 text-xs {small
          ? ''
          : 'lg:w-[200px]'}  hidden md:block"
      >
        <ul class={small ? "" : "flex flex-col"}>
          {#each menuItems as item}
            <li>
              <a
                href="#stay"
                on:click={() => goto(item.href)}
                class="block p-2 md:text-sm md:p-3 m-2 text-gray-500 text-xs md:text-md rounded-sm
                  {small ? 'text-center' : ''} 
                      {inPath(item)
                  ? '!text-gray-600 bg-gray-50'
                  : ' hover:text-gray-600  hover:bg-gray-100 '}"
              >
                {#if item.icon}
                  <i
                    class="{item.icon} {small ? 'text-xl' : ''} {inPath(item)
                      ? 'text-gray-800'
                      : 'text-gray-400'}  {small ? '' : 'lg:mr-2'} "
                  />
                {/if}
                <div
                  class=" {small ? 'hidden' : 'lg:inline'} 
                {inPath(item) ? 'text-gray-800' : 'text-gray-400'}
                "
                >
                  {item.title}
                </div>
              </a>
            </li>
          {/each}
          <li>
            <a
              href="#stay"
              on:click={toggleWidth}
              class="{small
                ? 'text-center'
                : ''} block p-2 md:text-sm md:p-3 m-2 text-gray-500 text-xs md:text-md rounded-sm hover:text-gray-600 hover:bg-gray-100"
            >
              <i
                class="fas {small
                  ? 'fa-chevron-right'
                  : 'fa-chevron-left lg:mr-2'} "
              />

              {#if !small}
                Hide
              {/if}
            </a>
          </li>
        </ul>
      </section>
      <div class="overflow-auto flex-1 h-full flex flex-col">
        <div class="lg:flex border-b-[1px]">
          <div
            class="flex-1 p-4 text-sm text-gray-500  font-bold"
          >
            <span
              ><a href="/users/{problem.user.username}"
                >{problem.user.username}</a
              ></span
            >
            <span>/</span>
            <span>{problem.title}</span>
            <span
              class=" p-1 px-2 rounded-2xl ml-2 bg-gray-300 text-gray-600 text-xs"
              >{problem.public ? "Public" : "Private"}</span
            >
          </div>
          {#if !$auth.loggedInUser || !isMember(problem)} 
          <div class="lg:space-x-1 spacy-y-1chr p-2">
            
            <FollowButton on:change={() => reload(true)} {problem} />
            <ContributeButton on:requested={() => reload(true)} {problem} />
          </div>
          {/if}
        </div>

        <div class="flex-1 overflow-auto h-full">
          <div class="max-w-[2000px] m-auto h-full">
            <slot />
            <div class=" mb-[100px]" />
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}

<style lang="scss">
  .slide {
    transition: width 2s;
    overflow: hidden;
  }
  ::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 7px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: rgba(0, 0, 0, 0.5);
    box-shadow: 0 0 1px rgba(255, 255, 255, 0.5);
  }
</style>
