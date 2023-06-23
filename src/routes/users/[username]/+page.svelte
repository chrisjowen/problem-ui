<script lang="ts">
  import { page } from "$app/stores";
  import api from "$lib/api";
  import UserProfileDisplay from "$lib/components/user/UserProfileDisplay.svelte";
  import type { User } from "$lib/types";
  import { onMount } from "svelte";
  let user: User;

  onMount(loadUser);




  function loadUser() {
   let username = $page.params.username;
   api.user.list(`username=${username}`,1,1, ["profile"]).then((res) => {
     user = res.data.entries[0];
   });
  }
</script>

{#if user}
  <UserProfileDisplay {user} editable={false} />
{/if}
