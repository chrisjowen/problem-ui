<script lang="ts">
  import { page } from "$app/stores";
  import api from "$lib/api";
  import ProblemValidationView from "$lib/components/idea/view/IdeaValidationView.svelte";
  import type { Problem } from "$lib/types";
  import { onMount } from "svelte";
  import type { PageData } from "./$types";
  import { browser } from "$app/environment";
  export let data: PageData;
  let problem: Problem;



  async function reload() {
    let response = await api.problem
      .get($page.params.id, [
        "user",
        "user.profile",
        "problem_users",
        "problem_users.member",
        "sectors",
        "stakeholders",
        "votes",
        "votes.user",
        "comments",
        "products",
        "contribution_requests",
        "contribution_requests.user"
      ])
      .catch((e) => {
        console.error(e);
        null;
      });

    problem = response!.data;
  }
</script>

{#if data.problem}
  <ProblemValidationView problem={data.problem} on:reload={reload} />
{/if}
