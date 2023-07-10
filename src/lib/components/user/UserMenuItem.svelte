<script lang="ts">
  import type { User } from "$lib/types";
  import { Listgroup } from "flowbite-svelte";
  import Gravitar from "$lib/components/shared/Gravitar.svelte";
  import { notifications } from "$lib/store";
  export let user: User;

  let showUserMenu = false;

  let userLinks = [
    { name: "Profile", href: "/profile/me" },
    { name: "Logout", href: "/logout" },
  ];

  $: showNotifications = $notifications?.entries?.filter(n => !n.read).length > 0;
</script>

<div class="relative top-[-2px]">
  <a href="#stay" on:click={() => (showUserMenu = true)} class="flex">
    <Gravitar email={user.email} size="md" bind:notifications={showNotifications} className="hover:rounded-sm rounded-lg h-[32px] w-[32px] " />
  </a>
  {#if showUserMenu}
    <div
      on:mouseleave={() => (showUserMenu = false)}
      class="w-48 top-[25px] absolute left-[-160px] z-50"
    >
      <Listgroup color="gray" active items={userLinks} let:item>
        {item.name}
      </Listgroup>
    </div>
  {/if}
</div>
