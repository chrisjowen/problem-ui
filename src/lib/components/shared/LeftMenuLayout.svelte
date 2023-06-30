<script lang="ts">
  import { page } from "$app/stores";
  import { settings } from "$lib/store";

  export let menuItems: any[] = [];

  $: selected = menuItems.find(inPath) || menuItems[0];
  $: unselected = menuItems.filter((i) => i != selected);
  $: small = $settings.expandProductMenu;

  export let showTopMenu = false;
  function defaultInPath(item: any) {
    let exactMatch = menuItems.find((i) => i.href === $page.url.pathname);
    let isExactMatch = exactMatch != null && item.href == exactMatch.href;
    let isSubMatch = $page.url.pathname.includes(item.href);

    let exactMatchExistsNotMe =
      exactMatch != null && item.href != exactMatch.href;

    if (exactMatchExistsNotMe) {
      return false;
    }
    return isExactMatch || isSubMatch;
  }

  $: highlighted = $page.url.pathname && menuItems.find(defaultInPath);

  export let inPath: (item: any) => boolean = defaultInPath;

  let showMobileMenu = false;

  function toggleWidth() {
    $settings.expandProductMenu = !$settings.expandProductMenu;
  }

  function toggleMobileMenu(
    event: MouseEvent & { currentTarget: EventTarget & HTMLDivElement }
  ) {
    showMobileMenu = !showMobileMenu;
  }
</script>

<div class="flex flex-col h-full bg-gray-100 drop-shadow-xl z-40 h-full">
  <section id="MobileMenu" class="bg-primary-700 drop-shadow-sm">
    <div class="block md:hidden text-md">
      <div
        class="bg-white border p-4 flex flex-row"
        on:click={toggleMobileMenu}
        on:keypress={toggleMobileMenu}
      >
        <i class="fas fa-bars text-gray-400 mr-4 flex items-center" />

        <i class="{selected.icon} text-primary-400 flex items-center mr-2" />
        <p class="flex-1 flex items-center text-primary-400">
          {selected.title}
        </p>
      </div>
      <div
        class="border bg-white relative w-full {showMobileMenu ? '' : 'hidden'}"
      >
        {#each unselected as item}
          <a
            href={item.href}
            class="flex flex-row w-full p-4 hover:bg-gray-50 text-gray-600 hover:text-primary-400"
          >
            {#if item.icon}
              <div class="flex items-center w-[35px]">
                <i class="{item.icon} flex items-center mr-2" />
              </div>
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
    <section
      id="LeftMenu"
      class="bg-gray-200 border-r-[1px] text-xs {small
        ? ''
        : 'lg:w-[200px]'}  hidden md:block"
    >
      <ul class={small ? "" : "flex flex-col"}>
        {#each menuItems as item}
          <li>
            <a
              href={item.href}
              class="block p-2 md:text-sm md:p-3 m-1 text-xs md:text-md
                  {small ? 'text-center' : ''} 
                  {item == highlighted
                ? 'text-primary-500 bg-gray-50'
                : '  hover:bg-gray-50 hover:text-gray-600  text-gray-400'}"
            >
              {#if item.icon}
                <i
                  class="{item.icon} {small ? 'text-xl' : ''} {small
                    ? ''
                    : 'lg:mr-2'} "
                />
              {/if}
              <div
                class=" {small ? 'hidden' : 'md:inline'} 
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
      {#if showTopMenu}
        <div class="border-b-[1px]">
          <slot name="topmenu" />
        </div>
      {/if}

      <div class="flex-1 md:overflow-auto h-full">
        <div class="max-w-[2000px] m-auto h-full">
          <slot />
          <div class=" mb-[100px]" />
        </div>
      </div>
    </div>
  </div>
</div>

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
