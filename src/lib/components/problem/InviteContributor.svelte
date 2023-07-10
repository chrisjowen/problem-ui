<script lang="ts">
  import type { Problem, User, PaginationResults } from "$lib/types";
  import { isAdminMember, isMember } from "$lib/util/authUtil";
  import { Button, Input, Modal } from "flowbite-svelte";
  import Gravitar from "$lib/components/shared/Gravitar.svelte";
  import api from "$lib/api";
  import { createEventDispatcher } from "svelte";

  export let problem: Problem;
  export let exclude = (u: User) => true;
  let show = false;
  let results: PaginationResults<User>;
  let q = "";

  $: isEmail =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/.test(
      q
    );

  let dispatch = createEventDispatcher();

  function onInviteContributer(e: MouseEvent): void {
    search();
    show = true;
  }

  function search() {
    let params = q == "" ? "" : `OR(name[like]=${q}|last_name[like]=${q}|username[like]=${q})`;
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

  function checkEnter(e: KeyboardEvent): void {
    if (e.code == "Enter" && results.entries.length > 0) {
      onUserSelected(results.entries[0])();
    } else {
      search();
    }
  }


  function sendEmailInvite(e: MouseEvent): void {
    api.problem.invites(problem.id).create({ email: q, type: "email" }).then(() => {
      show = false;
    });
  }
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
      <Input
        bind:value={q}
        type="text"
        placeholder="Search"
        on:keyup={checkEnter}
      >
        <i class="fas fa-search" slot="left" />
      </Input>
    </section>
    {#if isEmail}
      <section class="max-h-[500px] overflow-auto " >
        <Button on:click={sendEmailInvite} color="light" class="w-full">
        <i class="fas fa-envelope mr-2" />
          Send email invite
        </Button>
      
      </section>
    {:else if users}
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
              <p class="text-xs">@{user.username}</p>
             
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

{#if isAdminMember(problem)}
  <Button
    class="items-end flex"
    size="xs"
    on:click={onInviteContributer}
    color="light"
  >
    <i class="fas fa-user-plus mr-2" />
    Invite Contributor</Button
  >
{/if}
