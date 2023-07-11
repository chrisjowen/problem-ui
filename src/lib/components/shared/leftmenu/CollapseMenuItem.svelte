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
    {selected?.href == item.href ? 'bg-primary-600  text-gray-50' : 'hover:bg-primary-100'} 
    text-gray-400
    items-center
    ml-3
    rounded-md
    md:text-xs"
  >
    <a
      href={item.virtual ? item.children[0].href : item.href}
      class="flex flex-1 block md:text-sm md:p-2 items-center flex-shrink-0 p-2 md:p-0"
    >
      {#if item.icon}
        <i class="{item.icon} mr-2 {selected?.href == item.href && '!text-white'}" />
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
