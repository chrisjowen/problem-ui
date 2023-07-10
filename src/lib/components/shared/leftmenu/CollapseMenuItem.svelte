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
    class="flex items-center m-1 {selected?.href == item.href && 'bg-gray-100' }  {open
      ? ''
      : ''} rounded-lg hover:text-primary-600"
  >
    {#if item.children?.length > 0}
      {#if open}
        <i class="fas fa-chevron-down pl-2 text-xs" />
      {:else}
        <i class="fas fa-chevron-right pl-2 text-xs" />
      {/if}
      {:else}
        <span class="mr-4"></span>
    {/if}
    <a href={item.virtual ? item.children[0].href : item.href} class="flex-1 block md:text-sm md:p-3 text-xs ">
      {#if item.icon}
        <i class="{item.icon} lg:mr-2" />
      {/if}
      <div class="md:inline">
        {item.title}
      </div>
    </a>
  </div>
  {#if item.children && open}
    <div class="ml-3">
      {#each item.children as child}
        <CollapseMenuItem item={child} {selected} />
      {/each}
    </div>
  {/if}
</li>
