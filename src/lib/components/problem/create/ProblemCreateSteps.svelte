<script lang="ts">
  import { goto } from "$app/navigation";
  import api from "$lib/api";
  import { connect } from "$lib/channel/socket";
  import { auth } from "$lib/store";
  import { onDestroy } from "svelte";

  let channel: any;
  let problemId: null;

  let steps = {
    problem: {
      state: "loading",
      message: {
        idle: "Building problem template",
        loading: "Creating Problem",
        done: "Problem created",
      },
    },

    meta: {
      state: "idle",
      message: {
        loading: "Summarizing Problem",
        done: "Problem summarized",
      },
    },

    image: {
      state: "idle",
      message: {
        loading: "Generating banner image",
        done: "Banner image generated",
      },
    },

    resources: {
      state: "idle",
      message: {
        loading: "Generating resources",
        done: "Resources generated",
      },
    },

    obstacles: {
      state: "idle",
      message: {
        loading: "Generating obstacles",
        done: "Obstacles generated",
      },
    },
  };

  $: remaining = Object.keys(steps).filter((key) => {
    return steps[key].state != "done";
  }).length;

  $: {
    remaining == 0 && goto(`/problem/show/${problemId}`);
  }

  export async function watch(traceId: String) {
    channel = await connect(`problem:trace:${traceId}`, $auth.token);

    channel.on("problem:creating", () => (steps.problem.state = "loading"));
    channel.on("problem:creating:meta", () => (steps.meta.state = "loading"));
    channel.on("problem:creating:image", () => (steps.image.state = "loading"));
    channel.on("problem:created", async (res: any) => {
      steps.problem.state = "done";
      steps.meta.state = "done";
      steps.image.state = "done";
      problemId = res.id;
      watchProblem();
    });
  }

  onDestroy(() => {
    if (channel) {
      channel.leave();
    }
  });

  export async function watchProblem() {
    channel = await connect(`problem:${problemId}`, $auth.token);

    api.workflow.resources({ problem_id: problemId });
    api.workflow.obstacles({ problem_id: problemId });

    channel.on("problem:links:creating", () => {
      steps.resources.state = "loading";
    });
    channel.on("problem:links:created", () => {
      steps.resources.state = "done";
    });

    channel.on("problem:obstacles:creating", () => {
      steps.obstacles.state = "loading";
    });
    channel.on("problem:obstacles:created", () => {
      steps.obstacles.state = "done";
    });
  }
</script>

{#if problemId}
  <div class="bg-yellow-50 prose border p-4 m-8">
    <h1 class="text-3xl font-bold">Problem Created</h1>
    <p class="text-gray-500">
      <a href="/problem/show/{problemId}">View Problem</a>
    </p>
  </div>
{/if}

<div>
  <ul class="space-y-9">
    {#each Object.entries(steps) as [stepName, step]}
      <li class="flex">
        <span class="mr-9">
          {#if step.state == "done"}
            <i class="fa fa-check-circle text-green-400 text-4xl" />
          {:else if step.state == "loading"}
            <i class="fas fa-spinner fa-spin text-gray-400 text-4xl" />
          {:else}
            <i class="fa fa-circle text-gray-400 text-4xl" />
          {/if}
        </span>
        <span class="mt-1">
          {step.state == "done" ? step.message.done : step.message.loading}
        </span>
      </li>
    {/each}
  </ul>
</div>
