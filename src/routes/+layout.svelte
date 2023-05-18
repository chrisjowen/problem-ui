<script lang="ts">
  import {
    Navbar,
    NavBrand,
    NavHamburger,
    NavUl,
    NavLi,
    Avatar,
  } from "flowbite-svelte";
  import "../app.postcss";
  import { afterNavigate } from "$app/navigation";

  import { page } from "$app/stores";
  import { auth } from "$lib/store";
  import Gravitar from "$lib/components/shared/gravitar.svelte";
  import { fade } from "svelte/transition";

  let loggedInUser: any = null;

  auth.subscribe((value) => {
    loggedInUser = value.loggedInUser;
    console.log("loggedInUser", loggedInUser);
  });

  afterNavigate(() => {
    document.getElementById("main").scrollTop = 0;
  });

  $: showNavBar = $page.route.id != "/login";
</script>

<div class="flex flex-col h-screen">
  {#if showNavBar}
    <div class=" bg-primary-700 text-white">
      <Navbar
        fluid={true}
        let:hidden
        let:toggle
        color="transparant"
        navDivClass="m-0  flex flex-wrap justify-between items-center "
        navClass="px-2 sm:px-4 py-2.5  w-full z-10 top-0 left-0  bg-primary-700 drop-shadow-lg"
      >
        <NavBrand href="/">
          <span
            class="self-center whitespace-nowrap text-lg font-semibold dark:text-white"
          >
            ProblemsWorthSolving.com
          </span>
        </NavBrand>
        <NavHamburger on:click={toggle} />
        <NavUl {hidden} activeClass="text-white " nonActiveClass="text-white">
          <NavLi href="/" active={true}
            ><i class="fas fa-home text-xs mr-1" /> Home</NavLi
          >
          <NavLi href="/problem/list">
            <i class="fas fa-search text-xs mr-1" /> Problems</NavLi
          >
          <NavLi href="/sector"
            ><i class="fas fa-list text-xs mr-1" /> Sectors</NavLi
          >

          {#if loggedInUser}
            <NavLi href="/sector">
              <div class="flex flex-row">
                <span class="mr-2 relative top-[-5px]">
                  <Gravitar email={loggedInUser.email} size="sm" /></span
                >
              </div>
            </NavLi>
          {/if}
        </NavUl>
      </Navbar>
    </div>
  {/if}

  <div class="flex-1 overflow-auto relative">
    <slot />
  </div>
</div>

<style lang="scss">
  :global(.user-content p) {
    color: gray;
    // color: rgb(75 85 99 / var(--tw-text-opacity)) !important;
    margin-bottom: 24px !important;
  }
  :global(.user-content h1) {
    font-size: 1.65rem;
    font-weight: bold;
    // color: rgb(30 58 138 / var(--tw-bg-opacity));
    color: #5046e5;

    margin-bottom: 24px !important;
  }
  :global(.user-content h2) {
    font-size: 1.35rem;
    // color: #3e5493;
    color: #5046e5;

    font-weight: bold;
    margin-bottom: 24px !important;
  }

  :global(.user-content h3) {
    font-size: 1.2rem;
    // color: #90949e;
    color: #5046e5;

    font-weight: bold;
    margin-bottom: 9px !important;
  }

  :global(.user-content h4) {
    font-size: 1.15rem;
    // color: #90949e;
    color: gray;

    font-weight: bold;
    margin-bottom: 9px !important;
  }

  :global(.user-content td) {
    border: solid 1px black;
    padding: 9px;
    min-width: 300px;
  }
  :global(.user-content td) {
    border: solid 1px black;
    padding: 9px;
    min-width: 300px;
  }

  :global(.user-content li p) {
    margin-bottom: 9px !important;
  }

  :global(.user-content ul li) {
    margin-left: 20px;
    padding-bottom: 2px !important;
    color: gray;

    list-style: disc;
    padding-left: 0px;
  }

  :global(.user-content ol li) {
    margin-left: 20px;
    padding-bottom: 2px !important;
    color: gray;

    list-style: decimal;
    padding-left: 0px;
  }

  :global(.user-content ul, .user-content ol, .user-content table) {
    margin-bottom: 20px;
  }

  :global(.user-content code) {
    margin: 20px;
    background: #3b3d44;
    display: block;
    padding: 18px;
    color: white;
    font-size: 0.9em;
  }
  :global(.user-content blockquote) {
    margin: 20px;
    background: #f7f8fa;
    border-left: solid 5px rgb(30 58 138 / var(--tw-bg-opacity));
    display: block;
    list-style: disc;
    padding: 12px;
    color: white;
    font-size: 1.1em;
  }

  :global(
      .user-content blockquote p:last-child,
      .user-content table td p:last-child
    ) {
    margin-bottom: 0px !important;
  }
</style>
