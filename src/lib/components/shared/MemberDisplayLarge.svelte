<script lang="ts">
  import Gravitar from "$lib/components/shared/Gravitar.svelte";
  import { createEventDispatcher } from "svelte";
  import type { Problem, User } from "$lib/types";
  import { auth } from "$lib/store";
  import { isAdminMember, isMember } from "$lib/util/authUtil";
  import { Button } from "flowbite-svelte";
  import api from "$lib/api";
  export let membership: any | null = null;
  export let problem: Problem;

  export let role: string = "Problem Owner";

  let dispatch = createEventDispatcher();

  function dispatchDelete() {
    dispatch("delete", user);
  }

  $: memberIds = problem.problem_users.map((m: any) => m.member_id) || [];
  $: deletable =
    membership &&
    ($auth.loggedInUser?.id == problem.user_id ||
      memberIds.indexOf(membership?.member_id) > -1);

  $: user = membership?.member || problem.user;
  $: active = membership == null || membership.status == "active";
  $: requested = membership?.status == "requested";

  function acceptRequest(e: MouseEvent): void {
    api.problem
      .members(problem.id)
      .update(membership.id, {
        status: "active",
      })
      .then(() => {
        dispatch("accept", membership);
      });
  }
</script>

<div class="bg-white p-4 border-b-[1px] flex flex-shrink-0">
  <div class="flex flex-shrink-0 w-full">
    <div class="mr-4 mb-2">
      <Gravitar {user} size="md" className="rounded-sm" />
    </div>
    <div class="flex-1">
      <h2 class="text-sm mb-1 font-bold">
        @{user.username}
      </h2>
      <p class="text-xs mb-2 text-gray-500">
        Problem Solver | Design Thinker | Experience Creator | Author of the
      </p>
      <span class="text-xs inline-block text-gray-400 bg-gray-50 border p-1">
        {membership?.role || role}
      </span>
    </div>
    {#if membership?.status == "invited"}
      {#if membership.member_id == $auth.loggedInUser?.id}
        <div class="flex items-center">
          <Button size="xs" on:click={acceptRequest}>Accept</Button>
        </div>
      {:else}
        <div>
          <p class="p-2 bg-gray-100 text-xs text-gray-500">
            <i class="fa fa-check mr-1" />
            Invite Sent
          </p>
        </div>
      {/if}
    {:else if membership?.status == "requested"}
      {#if isAdminMember(problem)}
        <div class="flex items-center">
          <Button size="xs" on:click={acceptRequest}>Accept</Button>
        </div>
      {:else}
        <p class="text-xs">Requested</p>
      {/if}
    {:else if (deletable && isAdminMember(problem)) || $auth.loggedInUser && membership?.member_id == $auth.loggedInUser?.id}
    <div class="flex items-center">
        <Button size="xs" color="red" on:click={dispatchDelete}>
          <i class="fa fa-trash mr-2" /> Remove
        </Button>
      </div>
    {/if}
  </div>
</div>
