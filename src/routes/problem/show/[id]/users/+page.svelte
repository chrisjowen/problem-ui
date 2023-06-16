<script lang="ts">
  import { auth } from "$lib/store";
  import api from "$lib/api";
  import ProblemLayout from "$lib/components/problem/ProblemLayout.svelte";
  import { Button } from "flowbite-svelte";
  import UserList from "$lib/components/shared/UserList.svelte";
  import { goto } from "$app/navigation";
  import UserDisplay from "$lib/components/shared/UserDisplay.svelte";
  import { isMember } from "$lib/util/authUtil";

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

  async function addContributer() {
    if (!loggedInUser) {
      goto("/login");
    } else {
      await api.problem.addContributer(problem.id);
      reload(true);
    }
  }
</script>

<ProblemLayout bind:problem bind:reload>
  {#if problem}
    <div class="p-4 space-y-4">
      <div class="flex">
        <h1 class="flex-1 items-end flex">Contributers</h1>

        {#if isMember(problem)}
          <Button
            class="items-end flex"
            size="xs"
            on:click={addContributer}
            color="light"
          >
            <i class="fas fa-user-plus mr-2" />
            Invite Contributor</Button
          >
        {/if}
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2">
        <UserDisplay user={problem.user} maxBio={50} />
        {#each problem.problem_users as problem_user}
          <UserDisplay user={problem_user.member} role={problem_user.role} maxBio={50} />
        {/each}
      </div>

      <h1 class="flex-1 items-end flex">Followers</h1>
      <UserList users={problem.followers} placeholder="No Followers"  />
    </div>
  {/if}
</ProblemLayout>
