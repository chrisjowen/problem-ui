<script lang="ts">
  import CollapseMenuItem from "./CollapseMenuItem.svelte";
  import type { MenuItem } from "./CollapseMenu.svelte";
  import { children } from "svelte/internal";

  export let item: MenuItem;
  export let selected: MenuItem;

  $: path = selected && makePath([selected]);

  $: open = path && path.find((pathItem) => item.href == pathItem.href) != null;

  function makePath(path: MenuItem[]) {
    let itm = path[0];
    if (itm.parent) {
      return makePath([itm.parent, ...path]);
    }
    return path;
  }
</script>

<li>
  <div
    class="flex
    items-center
    m-1
    flex-shrink-0
    {selected?.href == item.href && 'bg-gray-100 text-primary-600'} 
    rounded-lg
    text-gray-500
    hover:text-primary-600
    items-center
    md:text-xs"
  >
    {#if item.children?.length > 0}
      {#if open}
        <i class="fas fa-chevron-down pl-2 mr-2 hidden" />
      {:else}
        <i class="fas fa-chevron-right pl-2 mr-2 hidden" />
      {/if}
    {:else}
      <span class="mr-4 hidden" />
    {/if}
    <a
      href={item.virtual ? item.children[0].href : item.href}
      class="flex flex-1 block md:text-sm md:p-3 items-center flex-shrink-0 p-2 md:p-0"
    >
      {#if item.icon}
        <i class="{item.icon} mr-2" />
      {/if}
      <div class="md:inline">
        {item.title}
      </div>
    </a>
  </div>
  {#if item.children}
    <div class="ml-3">
      {#each item.children as child}
        <ul>
          <CollapseMenuItem item={child} {selected} />
        </ul>
      {/each}
    </div>
  {/if}
</li>
