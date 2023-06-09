<script>
  import { browser } from "$app/environment";
  import { Avatar } from "flowbite-svelte";
  import { MD5 } from 'crypto-js';
  

  export let email = "chris.j.owen@hotmail.co.uk";
  export let size = "xs";

  export let className = "";

  $: url = browser ? `https://www.gravatar.com/avatar/${MD5(email).toString()}` : "";
</script>

<Avatar src={url} {size} class={className} />
