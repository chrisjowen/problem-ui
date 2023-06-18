<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { goto } from "$app/navigation";
  import api from "$lib/api";
  import { auth } from "$lib/store";
  import type { Problem } from "$lib/types";
  import { isAnyMember, isMember } from "$lib/util/authUtil";
  import { Button } from "flowbite-svelte";

  export let problem: Problem;
  let dispatch = createEventDispatcher();

  function onJoinClicked(e: MouseEvent): void {
    api.problem
      .members(problem.id)
      .create({
        member_id: $auth.loggedInUser.id,
        role: "contributor",
        status: "requested",
      })
      .then((res) => {
        dispatch("requesed", null);
      });
  }
</script>

{#if !isAnyMember(problem)}
  <div class="border-b-[1px] p-4 text-center bg-primary-50">
    <h1 class="mb-4 text-xl text-gray-600 hidden md:block">
      Want To Help Solve This Problem?
    </h1>
    <Button
      size="xs"
      class="w-full md:w-auto "
      color="primary"
      on:click={onJoinClicked}
    >
      <i class="fas fa-user-plus mr-2" />
      Join & Contribute
    </Button>
  </div>

{:else if !isMember(problem)}
<div class="border-b-[1px] p-4 text-center bg-primary-50">
    <h1 class="text-xl text-gray-600 hidden md:block">
        <i class="fas fa-info-circle  mr-2" />
      Request Sent Awaiting Approval
    </h1>
  </div>
{/if}
