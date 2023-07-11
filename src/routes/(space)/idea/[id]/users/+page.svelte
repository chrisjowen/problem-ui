<script lang="ts">
  import MemberDisplayLarge from "$lib/components/shared/MemberDisplayLarge.svelte";
  import { isMember } from "$lib/util/authUtil";
  import InviteContributor from "$lib/components/problem/InviteContributor.svelte";
  import type { Problem, User } from "$lib/types";
  import api from "$lib/api";
  import { TabItem, Tabs } from "flowbite-svelte";
  import IdeaShell from "$lib/components/idea/manage/IdeaShell.svelte";
  import type { PageData } from "../$types";

  export let data: PageData;
  let problem: Problem = data.problem;
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

  $: requested =
    problem?.problem_users?.filter((m: any) => m.status == "requested") || [];

  $: invited =
    problem?.problem_users?.filter((m: any) => m.status == "invited") || [];

  $: active =
    problem?.problem_users?.filter((m: any) => m.status == "active") || [];
</script>

<IdeaShell bind:problem bind:reload>
  {#if problem}
    <div class="p-4 space-y-4">
      <div class="flex">
        <h1 class="flex-1 items-end flex text-xl text-primary-600">
          Contributers
        </h1>

        {#if isMember(problem)}
          <InviteContributor {problem} on:add={() => reload(true)} {exclude} />
        {/if}
      </div>

      <div class="border white bg-white">
        <Tabs style="underline">
          <TabItem open title="Members">
            <MemberDisplayLarge {problem} />
            {#each active as membership}
              <MemberDisplayLarge
                {problem}
                {membership}
                on:delete={onDeleteMember}
                on:accept={() => reload(true)}
              />
            {/each}
          </TabItem>
          <TabItem title="Requests ({requested.length})">
            {#each requested as membership}
              <MemberDisplayLarge
                {problem}
                {membership}
                on:delete={onDeleteMember}
                on:accept={() => reload(true)}
              />
            {/each}
          </TabItem>
          <TabItem title="Invited ({invited.length})">
            {#each invited as membership}
              <MemberDisplayLarge
                {problem}
                {membership}
                on:delete={onDeleteMember}
                on:accept={() => reload(true)}
              />
            {/each}
          </TabItem>
        </Tabs>
      </div>
    </div>
  {/if}
</IdeaShell>
