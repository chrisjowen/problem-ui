<script lang="ts">
  import ProblemLayout from "$lib/components/problem/ProblemLayout.svelte";
  import UserList from "$lib/components/shared/UserList.svelte";
  import UserDisplay from "$lib/components/shared/UserDisplay.svelte";
  import MemberDisplayLarge from "$lib/components/shared/MemberDisplayLarge.svelte";
  import { isMember } from "$lib/util/authUtil";
  import InviteContributor from "$lib/components/problem/InviteContributor.svelte";
  import type { User } from "$lib/types";
  import api from "$lib/api";

  let problem: any = null;
  let reload: (force: boolean) => void;
  $: memberIds = problem?.problem_users?.map((m: any) => m.member_id) || [];

  function exclude(u: User) {
    return memberIds.concat(problem.user_id).indexOf(u.id) == -1;
  }

  function onDeleteMember(e: CustomEvent<any>): void {
    let user = e.detail;
    let problem_user = problem.problem_users.find(
      (pu: any) => pu.member_id == user.id
    );
    api.problem
      .members(problem.id)
      .delete(problem_user.id)
      .then(() => {
        reload(true);
      });
  }
</script>

<ProblemLayout bind:problem bind:reload>
  {#if problem}
    <div class="p-4 space-y-4">
      <div class="flex">
        <h1 class="flex-1 items-end flex text-xl text-primary-600">Contributers</h1>

        {#if isMember(problem)}
          <InviteContributor {problem} on:add={() => reload(true)} {exclude} />
        {/if}
      </div>

      <div class="border rounded-xl white">
        <MemberDisplayLarge problem={problem}  />
        {#each problem.problem_users as membership}
          <MemberDisplayLarge
            problem={problem} 
            membership={membership}
            
            on:delete={onDeleteMember}
            on:accept={() => reload(true)}
          />
        {/each}
      </div>

      <h1 class="flex-1 items-end flex text-xl text-primary-600">Followers</h1>


      <UserList users={problem.followers} placeholder="No Followers" />
    </div>
  {/if}
</ProblemLayout>
