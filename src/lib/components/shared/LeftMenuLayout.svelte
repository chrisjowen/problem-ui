<script lang="ts">
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";

  export let menuItems: any[] = [
      {
        title: "Test",
        icon: "fas fa-info-circle text-primary-400",
      },
    ];

  let path = $page.url.pathname;

</script>

<div class="flex flex-col h-full bg-gray-100 drop-shadow-xl z-40">
  <div class="bg-primary-500 p-4 hidden md:block">
    <slot name="topmenu" />
  </div>
  <div class="flex flex-1 flex-row overflow-hidden slide">
    <div class="bg-gray-200 text-xs lg:w-[200px]">
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
                <i class="{item.icon}  lg:mr-2" />
              {/if}
              <div class="hidden lg:inline">{item.title}</div>
            </a>
          </li>
        {/each}
      </ul>
    </div>
    <div class="border-v-[1px] flex justify-end bg-primary-50 border-b-[1px]">
      <slot name="innerMenu" />
    </div>
    <div class="overflow-auto flex-1 md:p-4">
      <slot />
    </div>
  </div>
</div>

<style lang="scss">
  .slide {
    transition: width 2s;
    overflow: hidden;
  }
</style>
