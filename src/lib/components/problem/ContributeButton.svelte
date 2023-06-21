<script lang="ts">
  import { createEventDispatcher } from "svelte";
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
        dispatch("requested", null);
      });
  }
</script>

{#if !isAnyMember(problem)}
  <Button
    size="xs"
    class="flex-1 md:flex-none md:w-auto "
    color="light"
    on:click={onJoinClicked}
  >
    <i class="fa-solid fa-user-group mr-2" />
    Contribute
  </Button>
{:else if !isMember(problem)}
  <Button size="xs" class="flex-1 md:flex-none md:w-auto " color="light" disabled={true}>
    <i class="fa fa-info-circle mr-2" />
    Request Sent
  </Button>
{/if}
