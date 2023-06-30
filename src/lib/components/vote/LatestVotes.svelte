<script lang="ts">
  import { page } from "$app/stores";
  import baseApi from "$lib/api";
  import type { PaginationResults, Comment } from "$lib/types/index";
  import { createEventDispatcher, onMount } from "svelte";
  import type { AxiosResponse } from "axios";
  import UserList from "../user/UserList.svelte";
  import { Button } from "flowbite-svelte";

  let votes: PaginationResults<any>;
  export let type = "solution";
  export let id: null | string = $page.params.id;
  let api: any = baseApi[type];
  let dispatch = createEventDispatcher();

  onMount(() => {
    load();
  });

  $: {
    id && load();
  }

  function load() {
    api
      .votes(id)
      .list("", 20, 1, ["user"])
      .then((res: AxiosResponse<PaginationResults<Comment>>) => {
        votes = res.data;
      });
  }

  async function onAddVote(event: any) {
    let result = await api.votes(id).create({});
    dispatch("voted", result);
    load();
  }

</script>


{#if votes && votes.entries}
  <Button  color="green" size="xs" on:click={onAddVote}>
    <i class="fa-solid fa-arrow-up mr-2" />
    {votes.total_entries} Votes
  </Button>
{/if}

<UserList users={votes?.entries} />
