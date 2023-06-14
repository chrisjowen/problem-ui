<script lang="ts">
  import { auth } from "$lib/store";
  import api from "$lib/api";
  import ProblemLayout from "$lib/components/problem/ProblemLayout.svelte";
  import { Button } from "flowbite-svelte";
  import UserList from "$lib/components/shared/UserList.svelte";
  import { goto } from "$app/navigation";

  let problem: any = null;
  let reload: (force: boolean) => void;
  let loggedInUser = $auth.loggedInUser;

  $: following = problem?.followers?.some(
    (f: any) => f.id === loggedInUser?.id
  );
  async function onFollow() {
    if (!loggedInUser) {
      goto("/login");
    } else {
      await api.problem.follow(problem.id);
      reload(true);
    }
  }

  async function onUnFollow() {
    if (!loggedInUser) {
      goto("/login");
    } else {
      await api.problem.unfollow(problem.id);
      reload(true);
    }
  }
</script>

<ProblemLayout bind:problem bind:reload={reload}>
  {#if problem}
  <div class="px-4 pt-4 flex justify-end space-x-2">
    <Button
      class="mb-2 "
      size="xs"
      on:click={following ? onUnFollow : onFollow}
      color={!following ? "light" : "green"}
    >
      <i class="  {!following ? "fas fa-user-plus " : "fa fa-check"} mr-2" />
      {following ? "Following" : "Follow"}</Button
    >
  </div>
    <div class="mx-4 ">
      <UserList users={problem.followers} placeholder="No Followers" />
    </div>
  {/if}
</ProblemLayout>
