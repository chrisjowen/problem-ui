<script lang="ts">
  import { browser } from "$app/environment";
  import { Avatar } from "flowbite-svelte";
  import { MD5 } from "crypto-js";
  import type { User } from "$lib/types";

  export let email = "system@problemworthsolving.com";
  export let user : null | User = null;

  export let size = "xs";

  export let className = "";

  $: url = browser
    ? `https://www.gravatar.com/avatar/${MD5(
        user?.email || email
      ).toString()}?d=robohash`
    : "";
</script>

{#if user}
  <a href="/users/{user.username}">
    <Avatar src={url} {size} class={className} />
  </a>
{:else}
  <Avatar src={url} {size} class={className} />
{/if}
