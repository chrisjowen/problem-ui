<script lang="ts">
  import { auth } from "$lib/store";
  import { page } from "$app/stores";
  import api from "$lib/api";
  import ProblemLayout from "$lib/components/problem/ProblemLayout.svelte";
  import { Breadcrumb, BreadcrumbItem, Button } from "flowbite-svelte";
  import { onMount } from "svelte";
  import UserList from "$lib/showproblem/userList.svelte";
  import { goto } from "$app/navigation";

  let problem: any = null;
  let loggedInUser = $auth.loggedInUser;

  onMount(() => {
    loadProblem();
  });

  function loadProblem() {
    api.problem.get($page.params.id).then((res) => {
      problem = res.data;
    });
  }

  $: following = problem?.followers?.some(
    (f: any) => f.id === loggedInUser?.id
  );
  async function onFollow() {
    console.log("follow", loggedInUser);
    if (!loggedInUser) {
      goto("/login");
    } else {
      await api.problem.follow(problem.id);
      loadProblem();
    }
  }

  async function onUnFollow() {
    if (!loggedInUser) {
      goto("/login");
    } else {
      await api.problem.unfollow(problem.id);
      loadProblem();
    }
  }
</script>

<ProblemLayout bind:problem>
  {#if problem}
    <div class="m-2 md:m-0">
      <div class=" flex justify-end">
        <Button
          class="mb-2 w-full md:w-auto"
          size="xs"
          on:click={following ? onUnFollow : onFollow}
          color={following ? "light" : "light"}
        >
          <i class="fas fa-user-plus mr-2" />

          {following ? "Unfollow" : "Follow"}</Button
        >
      </div>
      <UserList users={problem.followers} placeholder="No Followers" />
    </div>
  {/if}
</ProblemLayout>
