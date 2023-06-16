<script lang="ts">
  import { browser } from "$app/environment";
  import { Avatar } from "flowbite-svelte";
  import { MD5 } from 'crypto-js';
  
  export let email = "chris.j.owen@hotmail.co.uk";
  export let user;

  export let size = "xs";

  export let className = "";

  export let notifications = false;

  $: url = browser ? `https://www.gravatar.com/avatar/${MD5(user?.email || email).toString()}` : "";
</script>

{#if notifications }
  <Avatar src={url} {size} class={className} dot={{color:"yellow", size: "xs", placement:"top-right"}}  />
{:else}
  <Avatar src={url} {size} class={className} />
{/if}
