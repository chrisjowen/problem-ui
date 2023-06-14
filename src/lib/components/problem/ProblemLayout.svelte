<script lang="ts">
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import {
    BottomNav,
    BottomNavItem,
    Breadcrumb,
    BreadcrumbItem,
  } from "flowbite-svelte";
  import { selectedProblem } from "$lib/store";
  import api from "$lib/api";
  import { onMount } from "svelte";

  export let problem: any = null;
  export let menuItems: any[] = [];
  export let small = true;


  onMount(reload);
  
  export function reload(force: boolean = false) {
    if ($selectedProblem?.id?.toString() === $page.params.id  && !force) {
      problem = $selectedProblem;
    } else {
      api.problem.get($page.params.id, ["products", "sector", "user", "followers"]).then((res) => {
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
          icon: "fas fa-info-circle text-primary-400",
          href: `/problem/show/${problem.id}`,
        },

        {
          title: "Discuss",
          icon: "fa-solid fa-comment text-green-400",
          href: `/problem/show/${problem.id}/discussion`,
        },

        // TODO: Learn is $$$$
        {
          title: "Followers",
          icon: "fa fa-user-plus text-yellow-400",
          href: `/problem/show/${problem.id}/followers`,
        },
        {
          title: "Resources",
          icon: "fa fa-link text-blue-400",
          href: `/problem/show/${problem.id}/links`,
        },

        {
          title: "Risks",
          icon: "fa fa-exclamation-triangle text-red-400",
          href: `/problem/show/${problem.id}/obstacles`,
        },
        // {
        //   title: "Solutions",
        //   icon: "fa fa-lightbulb text-yellow-400",
        //   href: `/problem/show/${problem.id}/solutions`,
        // },
      ];
    }
  }

function inPath(item: any) {
  let base = `/problem/show/${problem.id}`;

  if(path == base && item.href == path) {
    return true;
  }
  return item.href!=base && path.indexOf(item.href) > -1
}

  function toggleWidth() {
    small = !small;
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
  <div class="flex flex-col h-full bg-gray-100 drop-shadow-xl z-40">
    <div class="bg-primary-500 drop-shadow-sm p-4">
      <slot name="topmenu">
        <div>
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
      </slot>
    </div>
    <div class="flex flex-1 flex-row overflow-hidden slide">
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
                  ? '!text-gray-600 bg-gray-100'
                  : ' hover:text-gray-600  hover:bg-gray-100 '}"
              >
                {#if item.icon}
                  <i class="{item.icon}  {small ? '' : 'lg:mr-2'} " />
                {/if}
                <div class=" {small ? 'text-xs' : 'lg:inline'} ">
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
      <div />

      <div class="overflow-auto flex-1 h-full flex flex-col">
        <div
          class="border-v-[1px] flex justify-end bg-primary-50 border-b-[1px]"
        >
          <slot name="innerMenu" />
        </div>

        <div class="flex-1 overflow-auto ">
          <div class="max-w-[2000px]">
          <slot />
          <div class=" mb-[100px]" />
        </div>
        </div>
      </div>
    </div>
  </div>

  <div class="block md:hidden">
    <BottomNav
      navType="group"
      position="absolute"
      innerDiv="grid-cols-5 text-lg  drop-shadow-t-xl"
    >
      {#each menuItems as item}
        <BottomNavItem
          on:click={() => goto(item.href)}
          btnDefault={path == item.href
            ? "!text-gray-600 bg-gray-100"
            : " hover:text-gray-600  hover:bg-gray-100 "}
        >
          <i class={item.icon} />
        </BottomNavItem>
      {/each}
    </BottomNav>
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
