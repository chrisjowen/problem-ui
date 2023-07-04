<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { Button } from "flowbite-svelte";
  import { auth } from "$lib/store";
  import { goto } from "$app/navigation";
  import ProblemLayout from "$lib/components/problem/ProblemLayout.svelte";
  import LatestComments from "$lib/components/comments/LatestComments.svelte";
  import { isMember } from "$lib/util/authUtil";
  import Editor from "$lib/components/shared/editor/Editor.svelte";
  import Tip from "$lib/components/problem/Tip.svelte";
  import Banner from "$lib/components/problem/Banner.svelte";
  import Idea from "$lib/components/problem/Idea.svelte";
  import Stakeholders from "$lib/components/problem/Stakeholders.svelte";
  import { connect } from "$lib/channel/socket";
  import type { Channel } from "phoenix";

  let problem: any = null;
  let reloadStakeholders: () => void;
  let loggedInUser: any;
  let problemId = $page.params.id;
  let reload: (force: boolean) => void;

  async function watch() {
    if (loggedInUser) {
      let channel: Channel = await connect(
        `user:${loggedInUser.id}`,
        $auth.token
      );

      ["problem:overview:creating", "problem:stakeholders:creating", "problem:image:complete"].map(
        (event) =>
          channel.on(event, () => {
            console.log(event)
          })
      );


      ["problem:overview:complete", "problem:stakeholders:complete", "problem:image:complete"].map(
        (event) =>
          channel.on(event, () => {
            console.log(event)
            reloadStakeholders();
            reload(true);
          })
      );
    }
  }

  onMount(() => {
    loggedInUser = $auth.loggedInUser;
    watch();
  });
</script>

<ProblemLayout bind:problem bind:reload showMenu={false}>
  {#if problem}
    {#if isMember(problem)}
      <Tip title="Welcome To Your SolveSpace" mainClass="m-0  md:mb-4">
        <p class="text-sm">
          If this is your first time here, feel free to check out
          <a
            href="/docs/sharespace"
            class="text-primary-700 hover:underline mx-1"
          >
            <i class="fas fa-file mx-1" /> Introduction To Solvespaces
          </a>
          to see what you can do here
        </p>
      </Tip>
    {/if}

    <div class="flex md:mt-4 items-start">
      <section class="xl:max-w-[940px] mx-auto md:mx-4 md:rounded-t-lg">
        <div class="md:border md:rounded-lg bg-white">
          <Banner {problem} />
          <Idea {problem} />
        </div>

        <h1 class="text-2xl my-4">Whats The Problem?</h1>

        <div class="md:border md:rounded-lg bg-white p-8 mt-4">
          {#if problem.overview}
            <Editor editable={false} html={problem.overview} />
          {:else}
            <i class="fas fa-spinner fa-spin mr-8" />
            <i class="fas fa-robot" /> Generating Problem Statement
          {/if}
        </div>

        <h1 class="text-2xl my-4">Stakeholders</h1>

        <div class="md:border md:rounded-lg bg-white mt-4">
          <Stakeholders bind:load={reloadStakeholders} />
        </div>
      </section>

      <section class="flex-1 hidden xl:block mr-4">
        {#if isMember(problem)}
          <div class="mb-4">
            <div class="border p-4 bg-white text-center">
              <h1 class="mb-4 text-xl text-gray-800 font-bold">
                Looking For Collaborators?
              </h1>
              <p class="text-sm">
                Let the crowd know your looking for help with this problem
              </p>
              <Button
                class="mt-4 w-full "
                on:click={() => {
                  goto(`./${problemId}/users`);
                }}
              >
                <i class="fa-solid fa-bullhorn mr-2" />
                Request For Contributers
              </Button>
            </div>
          </div>
        {/if}

        <div class="mb-4">
          <h1 class="text-xl text-gray-800">Comments</h1>
          <p class="text-xs mb-4">
            Like this space, or have questions drop a comment here!
          </p>
          <div class="bg-white border py-4 rounded-lg">
            <LatestComments type="problem" />
          </div>
        </div>
      </section>
    </div>
  {/if}
</ProblemLayout>
