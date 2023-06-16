<script lang="ts">
  import type { User } from "$lib/types";
  import { Listgroup } from "flowbite-svelte";
  import Gravitar from "$lib/components/shared/Gravitars.svelte";
  import { notifications } from "$lib/store";
  export let user: User;

  let showUserMenu = false;

  let userLinks = [
    { name: "Profile", href: "/profile/me" },
    { name: "Logout", href: "/logout" },
    { name: "Notifications", href: "/notificaitons" },
  ];

  $: showNotifications = $notifications?.entries?.filter(n => !n.read).length > 0;
</script>

<div class="relative">
  <a href="#stay" on:click={() => (showUserMenu = true)} class="flex">
    <Gravitar {user} size="xs" bind:notifications={showNotifications} className="hover:rounded-sm rounded-xl " />
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
