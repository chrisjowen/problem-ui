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
  import { auth, overflow, state } from "$lib/store";
  import Gravitar from "$lib/components/shared/Gravitar.svelte";
  import { onMount } from "svelte";
  import UserMenuItem from "$lib/components/user/UserMenuItem.svelte";
  import NotificationMenu from "$lib/components/notification/NotificationMenu.svelte";
  import api from "$lib/api";
  import LoginModal from "$lib/components/shared/LoginModal.svelte";
  import { browser } from "$app/environment";

  let loggedInUser: any = null;
  let hideSideBar = true;

  auth.subscribe((value) => {
    loggedInUser = value.loggedInUser;
  });


  $: {
    if(browser){
      $page.route.id && document.getElementById("main-pane")?.scrollTo(0, 0);
    }
  }

  onMount(() => {
    if ($state?.sectors == null) {
      api.sector.list("", 100, 1).then((r) => {
        $state.sectors = r.data;
      });
      api.soon.list("", 100, 1).then((r) => {
        $state.soons = r.data;
      });
    }
    console.log(document.getElementById("main-pane"))
 

    const report_error = (msg: string = "unknown error") => {
      console.error("Caught unhandled rejection:", msg);
    };

    const handle_rejection = (e: PromiseRejectionEvent) => {
      e.preventDefault();
      report_error(e?.reason);
    };

    const handle_error = (e: ErrorEvent) => {
      e.preventDefault();
      report_error(e?.message);
    };

    window.addEventListener("unhandledrejection", handle_rejection);
    window.addEventListener("error", handle_error);

    return () => {
      window.removeEventListener("unhandledrejection", handle_rejection);
      window.removeEventListener("error", handle_error);
    };
  });

  let showLogin = false;
  let noNav = ["/login", "/idea/create"];

  $: showNavBar = noNav.indexOf($page.route.id) == -1;

  function login() {
    showLogin = false;
    setTimeout(() => (showLogin = true), 100);
  }
</script>

<LoginModal bind:open={showLogin} />

<Drawer placement="right" bind:hidden={hideSideBar} id="sidebar2">
  <div>
    <div class="flex items-center mb-4">
      <img
        src="/img/logo.png"
        class="w-[40px] mr-1"
        alt="Problems Worth Solving"
      />
      <span class="text-black font-bold lg:text-xl bold">rowdSolve</span><span
        class="hidden lg:block font-bold lg:text-xs relative left-[1px] top-[2px]"
        >.ai</span
      >
    </div>
  </div>
  <Sidebar>
    <SidebarWrapper divClass="overflow-y-auto p-2 text-gray-700 ">
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
          label="Your Ideas"
          href="/idea/me"
          on:click={() => (hideSideBar = true)}
        >
          <svelte:fragment slot="icon">
            <i class="fas fa-lightbulb text-xs" />
          </svelte:fragment>
        </SidebarItem>

        <!-- <SidebarItem
          label="Seed Ideas"
          href="/ideas"
          on:click={() => (hideSideBar = true)}
        >
          <svelte:fragment slot="icon">
            <i class="fa-solid fa-lightbulb" />
          </svelte:fragment>
        </SidebarItem>
        <SidebarItem
          label="SolveSpaces"
          href="/problem"
          on:click={() => (hideSideBar = true)}
        >
          <svelte:fragment slot="icon">
            <i class="fa-solid fa-rocket" />
          </svelte:fragment>
        </SidebarItem>
        <SidebarItem
          label="Sectors"
          href="/sector"
          on:click={() => (hideSideBar = true)}
        >
          <svelte:fragment slot="icon">
            <i class="fa-solid fa-industry" />
          </svelte:fragment>
        </SidebarItem> -->
        {#if $auth.loggedInUser}
          <!-- <SidebarItem
            label="Notifications"
            href="/notifications"
            on:click={() => (hideSideBar = true)}
          >
            <svelte:fragment slot="icon">
              <i class="fa-solid fa-bell" />
            </svelte:fragment>
          </SidebarItem> -->
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

<div class="flex flex-col absolute inset-0 h-full bg-gray-100">
  {#if showNavBar}
    <div class="w-full bg-primary-700 text-white drop-shadow-md z-40">
      <div class="flex flex-row">
        <div class="flex-1 flex">
          <div class="flex-1 flex items-center">
            <a href="/" class="flex p-3">
              <img
                src="/img/logo.png"
                class="w-[40px] mr-1"
                alt="Problems Worth Solving"
              />

              <div class="flex items-center">
                <span class="text-white font-bold lg:text-xl bold"
                  >rowdSolve</span
                ><span
                  class="hidden lg:block font-bold lg:text-xs relative left-[1px] top-[2px]"
                  >.ai</span
                >
              </div>
            </a>

            <div class="p-5 px-7 space-x-2 flex text-xs hidden md:block">
              <a
                href="/problem"
                class="hover:bg-primary-600 rounded-xl p-2 px-3"
              >
                <i class="fa-solid fa-search text-xs mr-1" />
                Explore
              </a>
              {#if loggedInUser}
                <a
                  href="/idea/me"
                  class="hover:bg-primary-600 rounded-xl p-2 px-3"
                >
                  <i class="fa-solid fa-rocket text-xs mr-1" />
                  Your Ideas
                </a>
              {/if}
            </div>
          </div>

          <a
            href="#stay"
            on:click={() => (hideSideBar = false)}
            class="md:hidden p-4"
          >
            <i class="fas fa-bars text-lg" />
          </a>
        </div>

        <div class="hidden md:block">
          <div class="justify-end p-5 px-7 space-x-4 flex text-xs">
            {#if loggedInUser}
              <!-- <NotificationMenu /> -->
              <div class=" m-1 mx-3">
                <UserMenuItem user={loggedInUser} />
              </div>
            {:else}
              <div>
                <button
                  on:click={login}
                  class="hover:bg-primary-600 rounded-xl p-2 px-3"
                >
                  <i class="fas fa-sign-in-alt text-xs mr-1" />
                  Login
                </button>
              </div>
            {/if}
          </div>
        </div>
      </div>
    </div>
  {/if}

  <div
    id="main-pane"
    class="flex-1 h-full {$overflow ? 'overflow-auto' : 'overflow-hidden'}  "
  >
    <slot />
  </div>
</div>
