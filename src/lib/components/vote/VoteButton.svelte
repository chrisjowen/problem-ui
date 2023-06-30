<script lang="ts">
  import { page } from "$app/stores";
  import baseApi from "$lib/api";
  import type { PaginationResults, Comment, User } from "$lib/types/index";
  import { createEventDispatcher, onMount } from "svelte";
  import type { AxiosResponse } from "axios";
  import { Button } from "flowbite-svelte";
  import { auth } from "$lib/store";
  import { goto } from "$app/navigation";

  export let classNames = "";

  let votes: PaginationResults<any>;
  export let type = "solution";
  export let id: null | string = $page.params.id;
  let api: any = baseApi[type];
  let dispatch = createEventDispatcher();

  export let voters: User[] = [];

  onMount(() => {
    load();
  });

  $: {
    id && load();
  }

  $: me = $auth?.loggedInUser;

  function load() {
    api
      .votes(id)
      .list("", 20, 1, ["user"])
      .then((res: AxiosResponse<PaginationResults<Comment>>) => {
        votes = res.data;
        voters = votes.entries.map((v) => v.user);
      });
  }

  async function onAddVote(event: any) {
    if(!me) {
      return goto("/login");
    }
    let result = await api.votes(id).create({});
    dispatch("voted", result);
    load();
  }
</script>

{#if votes && votes.entries}
  {#if me && voters.find((v) => v.id === me.id)}
    <Button disabled={true} color="light" size="xs" on:click={onAddVote} class={classNames}>
      <i class="fa-solid fa-arrow-up mr-2" />
      You & {votes.total_entries} Other Voted
    </Button>
  {:else}
    <Button color="green" size="xs" on:click={onAddVote} class={classNames}>
      <i class="fa-solid fa-arrow-up mr-2" />
      {votes.total_entries} Votes
    </Button>
  {/if}
{/if}
