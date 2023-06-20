<script lang="ts">
  import { goto } from "$app/navigation";
  import api from "$lib/api";
  import { auth } from "$lib/store";
  import { Button } from "flowbite-svelte";
  import { createEventDispatcher } from "svelte";

  export let problem: Problem;
  let loggedInUser = $auth.loggedInUser
  let dispatch = createEventDispatcher();


  $: following = problem?.followers?.some(
    (f: any) => f.id === loggedInUser?.id
  );
  async function onFollow() {
    if (!loggedInUser) {
      goto("/login");
    } else {
      await api.problem.follow(problem.id);
      dispatch("change", false)
    }
  }

  async function onUnFollow() {
    if (!loggedInUser) {
      goto("/login");
    } else {
      await api.problem.unfollow(problem.id);
      dispatch("change", true)
    }
  }
</script>

<Button
  size="xs"
  class="w-full md:w-auto "
  on:click={following ? onUnFollow : onFollow}
  color="light"
>
  <i
    class="  {!following
      ? 'fas fa-user-plus '
      : 'fa fa-check text-green-500'} mr-2"
  />
  {following ? "Following" : "Follow"}
</Button>
