<script>
  import { Avatar } from "flowbite-svelte";
  import * as  md5 from "md5";

  export let email = "chris.j.owen@hotmail.co.uk";
  export let size = "xs";
  export let className = "";

  $: url = `https://www.gravatar.com/avatar/${md5(email)}`;
</script>

<Avatar src={url} {size} rounded class="{className}" />
