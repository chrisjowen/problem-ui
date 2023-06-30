<script lang="ts">
  import { goto } from "$app/navigation";
  import api from "$lib/api";
  import { connect } from "$lib/channel/socket";
  import { auth } from "$lib/store";
  import { createEventDispatcher, onDestroy } from "svelte";

  let dispatch = createEventDispatcher();
  let channel: any;
  let problemId: null;

  let steps = {
    problem: {
      state: "loading",
      message: {
        idle: "Building problem template",
        loading: "Creating Solve Space - This may take a few minutes",
        done: "Problem created",
      },
    },

    meta: {
      state: "idle",
      message: {
        loading: "Generating Problem Statement",
        done: "Problem summarized",
      },
    },

    image: {
      state: "idle",
      message: {
        loading: "Creating banner image",
        done: "Banner image generated",
      },
    },

    resources: {
      state: "idle",
      hiddenOnIdle: true,
      message: {
        loading: "Finding website resources",
        done: "Resources generated",
      },
    },

    obstacles: {
      state: "idle",
      hiddenOnIdle: true,
      message: {
        loading: "Analysing risks",
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
    channel = await connect(`user:trace:${traceId}`, $auth.token);

    channel.on("problem:creating", () => (steps.problem.state = "loading"));
    channel.on("problem:creating:meta", () => (steps.meta.state = "loading"));
    channel.on("problem:creating:image", () => (steps.image.state = "loading"));
    channel.on("problem:created", async (res: any) => {
      steps.problem.state = "done";
      steps.meta.state = "done";
      steps.image.state = "done";
      problemId = res.id;
      dispatch("created", problemId)
      watchProblem();
    });
  }

  onDestroy(async () => {
    if (channel) {
      channel.leave();
      channel = await connect(`user:${$auth.loggedInUser.id}`, $auth.token);
    }
  });

  export async function watchProblem() {
    channel = await connect(`user:${$auth.loggedInUser.id}`, $auth.token);

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



<div>
  <ul class="space-y-9">
    {#each Object.entries(steps) as [stepName, step]}
      <li class="flex {step.state == "idle" ? "hidden" : ""} ">
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



