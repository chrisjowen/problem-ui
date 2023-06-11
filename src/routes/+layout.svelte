<script lang="ts">
  import {
    Drawer,
    Sidebar,
    SidebarGroup,
    SidebarItem,
    SidebarWrapper,
  } from "flowbite-svelte";
  import "../app.postcss";
  import { page } from "$app/stores";
  import { auth, overflow } from "$lib/store";
  import Gravitar from "$lib/components/shared/Gravitars.svelte";
  import { Listgroup } from "flowbite-svelte";
  import { onMount } from "svelte";



  let loggedInUser: any = null;
  let hideSideBar = true;
  let showUserMenu = false;

  let userLinks = [
    { name: "Profile", href: "/profile/me" },
    { name: "Logout", href: "/logout" },
  ];

  auth.subscribe((value) => {
    loggedInUser = value.loggedInUser;
    console.log("loggedInUser", loggedInUser);
  });


  

onMount(() => {
  showUserMenu = false;

  const report_error = (msg: string = 'unknown error') => {

    console.error("Caught unhandled rejection:", msg)

    // toasts.push({
    //   message: `Unhandled error: ${msg}`,
    //   type: 'error',
    // })
  }

  const handle_rejection = (e: PromiseRejectionEvent) => {
    e.preventDefault()
    report_error(e?.reason)
  }

  const handle_error = (e: ErrorEvent) => {
    e.preventDefault()
    report_error(e?.message)
  }

  window.addEventListener('unhandledrejection', handle_rejection)
  window.addEventListener('error', handle_error)

  return () => {
    window.removeEventListener('unhandledrejection', handle_rejection)
    window.removeEventListener('error', handle_error)
  }
})




  $: showNavBar = $page.route.id != "/login";
</script>


<div class="flex flex-col h-screen ">
  {#if showNavBar}
    <div class="w-full bg-primary-700 text-white">
      <div class="flex flex-row">
        <div class="flex-1 p-3 md:p-6">
          <span on:click={() => (hideSideBar = false)} class="md:hidden">
            <i class="fas fa-bars mr-4" />
          </span>
          <span
            class="self-center whitespace-nowrap text-sm md:text-lg font-semibold dark:text-white"
          >
            PWSolving
          </span>
        </div>

        <Drawer bind:hidden={hideSideBar} id="sidebar2">
          <Sidebar>
            <SidebarWrapper divClass="overflow-y-auto p-2">
              <SidebarGroup>
                <SidebarItem
                  label="Home"
                  href="/"
                  on:click={() => (hideSideBar = true)}
                >
                  <svelte:fragment slot="icon">
                    <i class="fas fa-home text-xs" />
                  </svelte:fragment>
                </SidebarItem>
                <SidebarItem
                  label="Problems"
                  href="/problem/list"
                  on:click={() => (hideSideBar = true)}
                >
                  <svelte:fragment slot="icon">
                    <i class="fa-solid fa-magnifying-glass text-xs" />
                  </svelte:fragment>
                </SidebarItem>
                <SidebarItem
                  label="Sectors"
                  href="/sector"
                  on:click={() => (hideSideBar = true)}
                >
                  <svelte:fragment slot="icon">
                    <i class="fa-solid fa-industry text-xs" />
                  </svelte:fragment>
                </SidebarItem>
                {#if loggedInUser}
                  <SidebarItem
                    label="Profile"
                    href="/profile/me"
                    on:click={() => (hideSideBar = true)}
                  >
                    <svelte:fragment slot="icon">
                      <Gravitar email={loggedInUser.email} size="xs" />
                    </svelte:fragment>
                  </SidebarItem>
                {/if}
              </SidebarGroup>
            </SidebarWrapper>
          </Sidebar>
        </Drawer>

        <div class="hidden md:block">
          <div class="justify-end p-7 space-x-6 flex text-xs">
            <a href="/"><i class="fas fa-home text-xs mr-1" /> Home </a>
            <a href="/problem/list">
              <i class="fa-solid fa-magnifying-glass text-xs mr-1" />
              Problems
            </a>
            <a href="/sector">
              <i class="fa-solid fa-industry text-xs mr-1" />
              Sectors
            </a>
            {#if loggedInUser}
              <div class="relative">
                <div on:click={() => (showUserMenu = true)}>
                  <Gravitar email={loggedInUser.email} size="xs" />
                </div>
                {#if showUserMenu}
                  <div
                    on:mouseleave={() => (showUserMenu = false)}
                    class="w-48 top-[35px] absolute left-[-160px] z-50"
                  >
                    <Listgroup color="gray" active items={userLinks} let:item>
                      {item.name}
                    </Listgroup>
                  </div>
                {/if}
              </div>
            {:else}
              <a href="/login">
                <i class="fas fa-sign-in-alt text-xs mr-1" />
                Login
              </a>
            {/if}
          </div>
        </div>
      </div>
    </div>
  {/if}

  <div class="flex-1  {$overflow ? 'overflow-auto' : 'overflow-hidden'}  ">
    <slot />
  </div>
</div>

