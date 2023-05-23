<script lang="ts">
  import axios from "axios";
  import { onMount } from "svelte";
  import EditableTextArea from "$lib/shared/editableTextArea.svelte";
  import { page } from "$app/stores";
  import { Alert, Breadcrumb, BreadcrumbItem } from "flowbite-svelte";
  import UserList from "$lib/showproblem/userList.svelte";
  import { auth } from "$lib/store";
  import { goto } from "$app/navigation";
  import problemApi from "$lib/api/problemApi";
  import ProblemLayout from "$lib/components/problem/ProblemLayout.svelte";
  import api from "$lib/api";

  let problem: any = null;
  let solution: any = null;
  let loggedInUser: any;
  let problemId = $page.params.id;

  onMount(() => {
    loadProblem();
    loadSolution();
    auth.subscribe((value) => {
      loggedInUser = value.loggedInUser;
    });
  });

  function loadProblem() {
    axios
      .get(`/api/problem/${problemId}`)
      .then((res) => {
        problem = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function loadSolution() {
    axios
      .get(`/api/problem/${problemId}/solution`)
      .then((res) => {
        solution = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function onUpdateProblemStatement() {
    api.problem.update(problemId, { overview: problem.overview });
  }
</script>

<ProblemLayout bind:problem>
  {#if problem}
    <!-- <div class="pb-4">
      <Alert border>
        <span slot="icon">
          <i class="fas fa-info-circle" />
        </span>
        Problem is currently {problem.status}
      </Alert>
    </div> -->
  
  
    <div class="border bg-white mb-4">
      <EditableTextArea
        bind:input={problem.overview}
        owner={problem.user}
        editable={loggedInUser?.id == problem.user.id}
        let:editing
        on:save={onUpdateProblemStatement}
      >
    
        {#if !editing}
          <div class="p-4  w-full">
            <div
              class="h-[256px] border m-auto rounded"
              style="background-image:url('/api/image{problem.img}');  background-size: cover; background-position: center;"
            >
            <div class="flex m-2 bg-white border rounded">
              <div class="rounded-full  ">
                <i class="fas fa-info-circle text-3xl m-2 mx-4 mb-2 text-primary-600" />
              </div>
              <h1 class="text-3xl font-bold text-primary-600 mt-2 mb-2 ">{problem.title}</h1>
            </div>
            </div>
            
          </div>
        {/if}
      </EditableTextArea>
    </div>
  {/if}
</ProblemLayout>
