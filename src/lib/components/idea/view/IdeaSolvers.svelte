<script lang="ts">
  import type { Problem } from "$lib/types";
  import Gravitar from "$lib/components/shared/Gravitar.svelte";

  export let problem: Problem;

  $: user = problem.user;

  $: activeUsers = problem.problem_users.filter(
    (user: any) => user.state == "ACTIVE"
  );
</script>

<div class="prose"><h2>Solvers</h2></div>
<button class="p-2 w-full text-left hover:bg-primary-50 flex ">
  <Gravitar {user} className="w-[50px] h-[50px] rounded-none" />
  <div class="ml-5 flex-1">
    <h1 class="text-md font-bold">
      {user.name}
      {user.last_name}
    </h1>
    <p class="text-gray-500 text-xs">@{user.username}</p>

    <p class="prose">
      {@html user.profile?.intro || ""}
    </p>
  </div>
</button>

{#each activeUsers as user}
  <button class="p-4 w-full text-left hover:bg-primary-50 flex">
    <Gravitar {user} className="w-[50px] h-[50px] rounded-none" />
    <div class="ml-4 flex-1">
      <h1 class="text-xl font-bold">
        {user.name}
        {user.last_name}
      </h1>
      <p class="text-gray-500 text-xs">@{user.username}</p>
    </div>
  </button>
{/each}
