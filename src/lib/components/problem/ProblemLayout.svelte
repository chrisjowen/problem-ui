<script lang="ts">
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import { Breadcrumb, BreadcrumbItem } from "flowbite-svelte";

  export let problem: any = null;
  export let menuItems: any[] = [];
  export let small = false;

  let path = $page.url.pathname;

  $: {
    if (problem && menuItems.length === 0) {
      menuItems = [
        {
          title: "Problem",
          icon: "fas fa-info-circle text-primary-400",
          href: `/problem/show/${problem.id}`,
        },
        {
          title: "Discussion",
          icon: "fa-solid fa-comment text-green-400",
          href: `/problem/show/${problem.id}/discussion`,
        },
        {
          title: "Solutions",
          icon: "fa fa-lightbulb text-yellow-400",
          href: `/problem/show/${problem.id}/solutions`,
        },
        {
          title: "Followers",
          icon: "fa fa-user text-blue-400",
          href: `/problem/show/${problem.id}/followers`,
        },
        {
          title: "Products",
          icon: "fa-brands fa-product-hunt text-orange-400",
          href: `/problem/show/${problem.id}/products`,
        },
     
      ];
    }
  }

  function toggleWidth() {
    small = !small;
  }
</script>

{#if !problem}
  <div class="bg-gray-50 p-9">
    <h2 class="mb-3 text-2xl font-bold tracking-tight text-primary-600">
      Loading...
    </h2>
  </div>
{:else}
  <div class="flex flex-col h-full bg-gray-100 drop-shadow-xl z-40">
    <div class="bg-primary-500 p-4 hidden md:block">
      <slot name="topmenu">
        <div >
          <Breadcrumb >
            <BreadcrumbItem href="/sector" linkClass="text-white text-xs"
              >Sectors</BreadcrumbItem
            >
            <BreadcrumbItem
              href="/sector/{problem.sector.id}"
              linkClass="text-white text-xs"
            >
              {problem.sector.name}
            </BreadcrumbItem>
            <BreadcrumbItem spanClass="text-white text-xs"
              >{problem.title}</BreadcrumbItem
            >
          </Breadcrumb>
        </div>
      </slot>
    </div>
    <div class="flex flex-1 flex-row overflow-hidden slide ">
        <div class="bg-gray-200 text-xs md:w-[200px]">
            <!-- svelte-ignore a11y-mouse-events-have-key-events -->
            <ul class="flex flex-col h-full">
              {#each menuItems as item}
                <li>
                  <a
                    href="#stay"
                    on:click={() => goto(item.href)}
                    class="block p-2 md:text-sm md:p-3 m-2 text-gray-500 text-xs md:text-md rounded-sm
                    {path == item.href
                      ? '!text-gray-600 bg-gray-100'
                      : ' hover:text-gray-600  hover:bg-gray-100 '}"
                  >
                    {#if item.icon}
                      <i class="{item.icon}  md:mr-2" />
                    {/if}
                    <div class="hidden md:inline">{item.title}</div>
                  </a>
                </li>
              {/each}
            </ul>
          </div>
      <div class="overflow-auto flex-1 md:p-4">
        <slot />
      </div>
   
    </div>
  </div>
{/if}

<style lang="scss">
  .slide {
    transition: width 2s;
    overflow: hidden;
  }
</style>
