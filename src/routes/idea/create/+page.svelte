<script lang="ts">
  import Solvers from "./../../../lib/components/idea/create/Solvers.svelte";
  import BasicInfo from "$lib/components/idea/create/BasicInfo.svelte";
  import Pitch from "$lib/components/idea/create/Pitch.svelte";
  import Solution from "$lib/components/idea/create/Solution.svelte";
  import AddBanner from "$lib/components/idea/create/AddBanner.svelte";
  import type { Problem } from "$lib/types";
  import api from "$lib/api";
  import { goto } from "$app/navigation";

  let idx = 1;
  let idea = {
    basicInfo: {
      title: "",
      sectors: [],
    },
    pitch: "",
    solution: {
      description: "",
      features: [""],
    },
    banner: "",
  };

  let validate: () => void;
  let problem: Problem;

  let steps = [
    {
      title: "Lets Get Basic Information",
      component: BasicInfo,
      binding: "basicInfo",
    },
    {
      title: "The 10 Second Pitch",
      component: Pitch,
      binding: "pitch",
    },
    {
      title: "Who Are The Solvers?",
      component: Solvers,
      binding: "solvers",
    },
    // {
    //   title: "How Will You <br /> Solve It?",
    //   component: Solution,
    //   binding: "solution",
    // },
    {
      title: "Add Banner",
      component: AddBanner,
      binding: "banner",
    },
  ];

  function next() {
    if (idx < steps.length) {
      idx = idx + 1;
      if (idx == steps.length && problem == null) {
        generateProblem()
      }
    }
    else if(problem) {
      goto(`/idea/${problem.id}/manage`)
    }
  }
  function back() {
    if (idx > 1) {
      idx = idx - 1;
    }
  }

  $: step = steps[idx - 1];

  function generateProblem() {
    api.problem.create({
      title: idea.basicInfo.title,
      blurb: idea.pitch,
      sector_ids: idea.basicInfo.sectors.map((s) => s.id)
    }).then((response) => {
      problem = response.data;
    });
  }
</script>

<div class="flex flex-col md:flex-row h-screen">
  <div
    class="bg-primary-700 flex items-center justify-center h-[150px] md:h-full md:w-[40%]"
  >
    <h1
      class="text-white
      font-bold
      lg:text-7xl
      md:text-5xl
      text-2xl
      bold
      text-center
      p-5"
    >
      {@html step.title}
    </h1>
  </div>

  <div class="  mt-9 flex flex-col flex-1">
    <div class="flex-1 p-4 flex flex-row md:items-center">
      <div class="w-full">
        <svelte:component
          this={step.component}
          bind:validate
          bind:value={idea[step.binding]}
          on:valid={next}
        />
      </div>
    </div>
    <div class="flex border-t-[1px] p-4">
      <button on:click={back}>
        <i class="fas fa-arrow-left" />
        Back
      </button>
      <div class="flex-1 text-center">{idx} / {steps.length}</div>
      <button on:click={validate}>
        Next <i class="fas fa-arrow-right" />
      </button>
    </div>
  </div>
</div>
