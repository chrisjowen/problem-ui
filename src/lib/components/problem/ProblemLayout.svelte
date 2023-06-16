<script lang="ts">
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import {
    Breadcrumb,
    BreadcrumbItem,
  } from "flowbite-svelte";
  import { selectedProblem, settings } from "$lib/store";
  import api from "$lib/api";
  import { onMount } from "svelte";

  export let problem: any = null;
  export let menuItems: any[] = [];
  let showMobileMenu = false;

  $: small = $settings.expandProductMenu;

  onMount(reload);

  export function reload(force: boolean = false) {
    if ($selectedProblem?.id?.toString() === $page.params.id && !force) {
      problem = $selectedProblem;
    } else {
      api.problem
        .get($page.params.id, [
          "products",
          "sector",
          "user",
          "followers",
          "problem_users",
          "problem_users.member",
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
          icon: "fas fa-info-circle ",
          href: `/problem/show/${problem.id}`,
        },
        {
          title: "Notes",
          icon: "fas fa-file ",
          href: `/problem/show/${problem.id}/page`,
        },
        // {
        //   title: "Research",
        //   icon: "fas fa-book",
        //   href: `/problem/show/${problem.id}`,
        // },
        // {
        //   title: "Todos",
        //   icon: "fas fa-check ",
        //   href: `/problem/show/${problem.id}`,
        // },
        // {
        //   title: "Ideas",
        //   icon: "fa fa-lightbulb ",
        //   href: `/problem/show/${problem.id}`,
        // },
        {
          title: "Risks",
          icon: "fa fa-exclamation-triangle ",
          href: `/problem/show/${problem.id}/obstacles`,
        },
        {
          title: "Discussions",
          icon: "fa-solid fa-comment ",
          href: `/problem/show/${problem.id}/discussion`,
        },

        // TODO: Learn is $$$$
        {
          title: "Users",
          icon: "fa fa-user-plus",
          href: `/problem/show/${problem.id}/users`,
        },
        {
          title: "Resources",
          icon: "fa fa-link ",
          href: `/problem/show/${problem.id}/links`,
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
  $: unselected = menuItems.filter(i => i!=selected);


  function inPath(item: any) {
    let base = `/problem/show/${problem.id}`;

    if (path == base && item.href == path) {
      return true;
    }
    return item.href != base && path.indexOf(item.href) > -1;
  }

  function toggleWidth() {
    $settings.expandProductMenu = !$settings.expandProductMenu;
  }


  function toggleMobileMenu(event: MouseEvent & { currentTarget: EventTarget & HTMLDivElement; }) {
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
    <div class="bg-gray-800 drop-shadow-sm p-4 ">
      <div class="hidden md:block">
        <Breadcrumb>
          <BreadcrumbItem href="/sector" linkClass="text-white text-xs ">
            Sectors
          </BreadcrumbItem>
          <BreadcrumbItem
            href="/sector/{problem.sector.id}"
            linkClass="text-white text-xs"
          >
            {problem.sector.name}
          </BreadcrumbItem>
          <BreadcrumbItem spanClass="text-white text-xs">
            {problem.title}
          </BreadcrumbItem>
        </Breadcrumb>
      </div>

      <div class="block md:hidden relative ">
        <div class="bg-white border p-2 border flex flex-row " on:click={toggleMobileMenu} on:keypress={toggleMobileMenu}>
        <i class="{selected.icon} text-primary-400  flex items-center mr-2"/>
        <p class="flex-1 flex items-center ">{selected.title}</p>
        <i class="fas fa-chevron-down text-gray-400 mr-2 flex items-center" />
        </div>
        <div class="border bg-white p-2  w-full  {showMobileMenu ? "" : "hidden"}">
          {#each unselected as item}
              <a href={item.href} class="flex flex-row w-full p-2 hover:bg-gray-50 text-gray-400 hover:text-primary-400">
                {#if item.icon}
                  <i class="{item.icon} flex items-center mr-2 " />
                {/if}
                <p class="flex items-center ">
                  {item.title}
                </p>
              </a>
          {/each}
        </div>
      </div>
    </div>
    <div class="flex flex-1 flex-row overflow-hidden slide h-full">
      <div
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
                <div class=" {small ? 'hidden' : 'lg:inline'} 
                {inPath(item)
                  ? 'text-gray-800'
                  : 'text-gray-400'}
                ">
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
      </div>
      <div class="overflow-auto flex-1 h-full flex flex-col">
        <div
          class="border-v-[1px] flex justify-end bg-primary-50 border-b-[1px]"
        >
          <slot name="innerMenu" />
        </div>

        <div class="flex-1 overflow-auto h-full">
          <div class="max-w-[2000px] h-full">
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
