<script lang="ts">
  import { browser } from "$app/environment";
  import { Avatar } from "flowbite-svelte";
  import { MD5 } from 'crypto-js';
  
  export let email = "system@problemworthsolving.com";
  export let user;

  export let size = "xs";

  export let className = "";


  $: url = browser ? `https://www.gravatar.com/avatar/${MD5(user?.email || email).toString()}?d=robohash` : "";
</script>

  <Avatar src={url} {size} class={className}  />
