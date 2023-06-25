<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { resetToken } from "$lib/api/auth";
  import { onMount } from "svelte";

  onMount(() => {
    resetToken($page.params.token).then(_ => {
      goto("/profile/me");
    });
  });
</script>
