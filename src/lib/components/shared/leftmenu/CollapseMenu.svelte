<script context="module" lang="ts">
  export interface MenuItem {
    title: string;
    href: string;
    icon?: string;
    children: MenuItem[];
    parent: null | MenuItem;
  }
</script>

<script lang="ts">
  import { onMount } from "svelte";

  import CollapseMenuItem from "./CollapseMenuItem.svelte";
  import { page } from "$app/stores";

  export let menuItems: MenuItem[] = [];

  let flattened: MenuItem[] = []

  onMount(() => {
    menuItems = menuItems.map(addParents)
    console.log(flattened)
  })

  let routePath = $page.route.id?.replace("/(space)", "").replace("[id]", $page.params.id)

  
  $: selected = routePath &&  flattened && flattened.find((item: MenuItem) => item.href == routePath);
  $: path = (selected && makePath([selected])) || [];
 
  

  function makePath(path : MenuItem[]) {
        let itm = path[0];
        if(itm.parent) {
            return makePath([itm.parent, ...path])
        }
        return path;
    }

   


  function addParents(item : MenuItem) {
    flattened = [...flattened, item]
    item.children = (item.children || []).map((child: MenuItem) => {
        child.parent = {...item}
        delete child.parent.children;
        return addParents(child)
    })
    return item
    
  }
 

</script>


<ul>
  {#each menuItems as item}
    <CollapseMenuItem {item} {selected}  />
  {/each}
</ul>

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
