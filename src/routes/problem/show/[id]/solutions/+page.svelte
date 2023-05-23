<script lang="ts">
  import { classNames } from "classnames";
  import { auth } from "$lib/store";
  import { page } from "$app/stores";
  import api from "$lib/api";
  import ProblemLayout from "$lib/components/problem/ProblemLayout.svelte";
  import { Breadcrumb, BreadcrumbItem, Button } from "flowbite-svelte";
  import { onMount } from "svelte";
  import UserList from "$lib/showproblem/userList.svelte";
  import { goto } from "$app/navigation";
  import Gravitar from "$lib/components/shared/gravitar.svelte";

  let problem: any = null;
  let loggedInUser = $auth.loggedInUser;
  let solutions: any[] = [];

  onMount(() => {
    loadProblem();
    loadSolutions();
  });

  function loadSolutions() {
    api.problem.solutions($page.params.id, ["solutions"]).then((res) => {
      solutions = res.data;
    });
  }

  function loadProblem() {
    api.problem.get($page.params.id).then((res) => {
      problem = res.data;
    });
  }
</script>

<ProblemLayout bind:problem>
  {#each solutions as solution}
    <div class="p-4 bg-white border m-2 hover:drop-shadow-xl">
      <div class=" w-full">
        <div class="flex">
          <div>
            <div
              class="border rounded-full w-[55px] text-center mr-4 bg-yellow-100"
            >
              <i class="fas fa-lightbulb text-3xl m-2 text-yellow-400" />
            </div>
          </div>
          <div class="mb-4 md:mb-0">
            <div class="mb-4 mr-4">
              {@html solution.description.slice(0, 200)}
            </div>
            <div class="mb-4">
              <div class="p-2 rounded text-xs border font-bold md:inline-block">
                Stage: Proposal
              </div>

              <div class="p-2 rounded text-xs border font-bold md:inline-block">
                <i class="fas fa-users mr-1" />
                3 Members
              </div>

              <div class="p-2 rounded text-xs border font-bold md:inline-block">
                <i class="fas fa-users mr-1" />
                3 Members
              </div>
            </div>
          </div>
          <Gravitar
            email={solution?.user.email}
            size="lg"
            className=" hidden md:block"
          />
        </div>

        <!-- <div class="flex flex-row w-full ">
          <div>
            <Button
              href="/problem/{problem.id}/solution/{solution.id}"
              class="mt-3 "
              size="xs"
              color="light"
            >
              <i class="fas fa-eye mr-2" />
              View Solution
            </Button>
          </div>
        </div> -->
      </div>
    </div>
  {/each}
</ProblemLayout>
