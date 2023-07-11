<script context="module" lang="ts">
  export interface MenuItem {
    title: string;
    href?: string;
    icon?: string;
    children?: MenuItem[];
    parent?: null | MenuItem;
    virtual?: boolean;
  }
</script>

<script lang="ts">
  import { onMount } from "svelte";

  import CollapseMenuItem from "./CollapseMenuItem.svelte";
  import { page } from "$app/stores";
  import { Drawer } from "flowbite-svelte";

  export let menuItems: MenuItem[] = [];
  export let hidden = true;
  let flattened: MenuItem[] = [];

  onMount(() => {
    menuItems = menuItems.map(addParents);
    console.log(flattened);
  });

  $: {
    if(menuItems) {
        menuItems = menuItems.map(addParents);
    }
  }


  let path = "/test/[id]/[pageId]"

  

  let routePath = Object.keys($page.params).reduce((acc: string, param: string) => {
    return acc.replace(`[${param}]`, $page.params[param]);
  }, $page.route.id!)?.replace("/(space)", "")
  
//   $page.route.id
//     ?.replace("/(space)", "")
    
//     .replace("[id]", $page.params.id)
//     .replace("[pageId]", $page.params.pageId);


  $: selected = routePath && flattened && (findExact() || findNearest());
  $: path = (selected && makePath([selected])) || [];


  function findExact() {
    return flattened.find((item: MenuItem) => item.href == routePath)
  }

  function findNearest() {
    let nearest =  flattened.filter((item: MenuItem) => {
        if(!item.href) {
            return false;
        }
        return routePath.includes(item.href)
    })

    if(nearest.length > 0) {
        let longest = nearest.sort((a: MenuItem, b: MenuItem) => {
            return b.href!.length - a.href!.length
        })[0]
        return longest
        
    }
    debugger
    return null
  }

  function makePath(path: MenuItem[]) {
    flattened = [];
    let itm = path[0];
    if (itm.parent) {
      return makePath([itm.parent, ...path]);
    }
    return path;
  }

  function addParents(item: MenuItem) {
    flattened = [...flattened, item];
    item.children = (item.children || []).map((child: MenuItem) => {
      child.parent = { ...item };
      delete child.parent.children;
      return addParents(child);
    });
    return item;
  }
</script>

<Drawer
  divClass="overflow-y-auto z-50 flex-shrink-0 p-0 bg-white  dark:bg-gray-800"
  placement="left"
  bind:hidden
  id="sidebar2"
>
  <div>
    <div class="flex items-center  p-3 bg-primary-700 text-white">
      <img
        src="/img/logo.png"
        class="w-[40px] h-[40px] mr-1"
        alt="Problems Worth Solving"
      />
      <span class="font-bold lg:text-xl bold">rowdSolve</span><span
        class="hidden lg:block font-bold lg:text-xs relative left-[1px] top-[2px]"
        >.ai</span
      >
    </div>
  </div>
  <ul>
    {#each menuItems as item}
      <CollapseMenuItem {item} {selected} />
    {/each}
  </ul>
</Drawer>

<div class="hidden md:inline">
  <ul>
    {#each menuItems as item}
      <CollapseMenuItem {item} {selected} />
    {/each}
  </ul>
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
