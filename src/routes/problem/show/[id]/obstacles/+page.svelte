<script lang="ts">
  import { page } from "$app/stores";
  import api from "$lib/api";
  import ProblemLayout from "$lib/components/problem/ProblemLayout.svelte";
  import ObstacleList from "$lib/components/shared/obstacles/ObstacleList.svelte";
  import { isMember } from "$lib/util/authUtil";
  import { Button } from "flowbite-svelte";
  
  let problem: any;
</script>

<ProblemLayout bind:problem>
  {#if problem}
  <div class="m-4 space-y-1">
    <div class="flex mb-5">
      <h1 class="flex-1 items-end flex text-xl text-primary-600">Risks</h1>
      {#if isMember(problem)}
        <div>
          <Button
            class=" text-xs"
            size="xs"
            on:click={() =>
              goto("/problem/show/" + problem.id + "/page/create")}
            color="light"
          >
            <i class="fas fa-exclamation-triangle mr-2" />
            Create Risk</Button
          >
        </div>
      {/if}
    </div>

    <ObstacleList
      api={api.problem.obstacles($page.params.id)}
      id={$page.params.id}
      pageSize={100}
      base="/problem/show/{problem.id}"
    />
  </div>
  {/if}
</ProblemLayout>
