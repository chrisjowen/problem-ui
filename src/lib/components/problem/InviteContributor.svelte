<script lang="ts">
  import type { Problem, User, PaginationResults } from "$lib/types";
  import { isMember } from "$lib/util/authUtil";
  import { Button, Input, Modal } from "flowbite-svelte";
  import Gravitar from "$lib/components/shared/Gravitars.svelte";
  import api from "$lib/api";
  import { debounce } from "lodash";
  import { createEventDispatcher } from "svelte";

  export let problem: Problem;
  export let exclude = (u: User) => true;
  let show = false;
  let results: PaginationResults<User>;
  let q = "";

  let dispatch = createEventDispatcher();

  function onInviteContributer(e: MouseEvent): void {
    search()
    show = true;
  }

  function search() {
    let params = q == "" ? "" : `OR(name[like]=${q}|last_name[like]=${q})`;
    api.user.list(params).then((res) => {
      results = res.data;
    });
  }

  let onUserSelected = (user: User) => async () => {
    await api.problem
      .members(problem.id)
      .create({ member_id: user.id, role: "contributor" });
    show = false;
    dispatch("add", user);
  };

  $: users = results?.entries?.filter(exclude);
</script>

<Modal
  bind:open={show}
  size="xl"
  class="w-full"
  placement="top-center"
  title="Invite User"
  autoclose={true}
  padding="xs"
>
  <div class="flex flex-col h-full">
    <section class=" pb-4">
      <Input bind:value={q} type="text" placeholder="Search" on:keyup={search}>
        <i class="fas fa-search" slot="left" />
      </Input>
    </section>
    {#if users}
      <section class="max-h-[500px] overflow-auto bg-white border">
        {#each users as user}
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <div
            class="flex hover:bg-primary-100 px-3 p-1 border-b-[1px]"
            on:click={onUserSelected(user)}
          >
            <div class="flex items-center"><Gravitar {user} size="sm" /></div>
            <div class="px-4 py-1 items-center">
              <p>{user.name} {user.last_name}</p>
              <p class="text-xs">
                Problem Solver | Design Thinker | Experience Creat...
              </p>
            </div>
          </div>
        {/each}
      </section>
    {/if}

    <!-- <section>
      <Button class="w-full" size="xs" color="light" disabled={true}>
        Select A Collaborator Above
      </Button>
    </section> -->
  </div>
</Modal>

{#if isMember(problem)}
  <Button
    class="items-end flex"
    size="xs"
    on:click={onInviteContributer}
    color="light"
  >
    <i class="fas fa-user-plus mr-2" />
    Add Contributor</Button
  >
{/if}
