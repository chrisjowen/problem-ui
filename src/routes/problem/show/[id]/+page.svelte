<script lang="ts">
  import axios from "axios";
  import { onMount } from "svelte";
  import EditableTextArea from "$lib/shared/editableTextArea.svelte";
  import { page } from "$app/stores";
  import {
    Breadcrumb,
    BreadcrumbItem,
    Button,
    TabItem,
    Tabs,
  } from "flowbite-svelte";
  import Statistics from "$lib/showproblem/plan/statistics.svelte";
  import Features from "$lib/showproblem/plan/features.svelte";
  import TechnologiesAndExpertise from "$lib/showproblem/plan/technologiesAndExpertise.svelte";
  import Research from "$lib/showproblem/research/research.svelte";
  import UserList from "$lib/showproblem/userList.svelte";
  import { auth } from "$lib/store";
  import { goto } from "$app/navigation";
  import problemApi from "$lib/api/problemApi";
  import Disqus from "$lib/components/shared/disqus.svelte";

  let problem: any = null;
  let solution: any = null;
  let loggedInUser: any;
  let problemId = $page.params.id;

  $: following = problem?.followers?.some(
    (f: any) => f.id === loggedInUser?.id
  );

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

  async function onFollow() {
    console.log("follow", loggedInUser);
    if (!loggedInUser) {
      goto("/login");
    } else {
      await problemApi.follow(problemId);
      loadProblem();
    }
  }

  async function onUnFollow() {
    if (!loggedInUser) {
      goto("/login");
    } else {
      await problemApi.unfollow(problemId);
      loadProblem();
    }
  }
</script>

{#if !problem}
  <div class="bg-gray-50 p-9">
    <h2 class="mb-3 text-2xl font-bold tracking-tight text-primary-600">
      Loading...
    </h2>
  </div>
{:else}
  <div>
    <div class="bg-primary-100 p-2 flex flex-row justify-end space-x-2">
      {#if following}
        <Button size="xs" color="red" on:click={onUnFollow}>
          <i class="fas fa-bell-slash mr-2" />
          Unfollow
        </Button>
      {:else}
        <Button size="xs" color="light" on:click={onFollow}>
          <i class="fas fa-bell mr-2" />
          Follow
        </Button>
      {/if}
    </div>
    <div class=" p-6">
      <Breadcrumb aria-label="Default breadcrumb example">
        <BreadcrumbItem href="/sector">Sectors</BreadcrumbItem>
        <BreadcrumbItem href="/sector/{problem.sector.id}"
          >{problem.sector.name}</BreadcrumbItem
        >
        <BreadcrumbItem>{problem.title}</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-5 m-3 md:gap-3">
      <section class="border bg-gray-50 col-span-3">
        <Tabs
          class="bg-white"
          contentClass=" bg-white  "
          activeClasses="p-4  m-0 border-[0px] border-b-[4px] border-primary-600 text-primary-600"
          inactiveClasses="p-4 hover:border-b-[4px] border-primary-600 m-0"
        >
          <TabItem open>
            <div slot="title" class="flex items-center gap-2">
              <i class="fas fa-info-circle" />
              Problem
            </div>
            <div />
            <EditableTextArea
              bind:input={problem.overview}
              owner={loggedInUser}
              editable={loggedInUser}
              let:editing
            >
              {#if !editing}
                <div class="p-4 text-center w-full">
                  <div
                    class="h-[256px] border m-auto"
                    style="background-image:url('/api/image{problem.img}');  background-size: cover; background-position: center;"
                  />
                </div>
              {/if}
              <div class="p-3 mb-2">
                {#if !editing}
                  <h1 class="mb-4 ml-3 text-xl text-primary-600">
                    Key Research
                  </h1>
                {/if}
                <Research {problem} />
              </div>
            </EditableTextArea>
          </TabItem>

          {#if solution}
            <TabItem>
              <div slot="title" class="flex items-center gap-2">
                <i class="fas fa-list-check" />
                Proposed Solution
              </div>
              <div class=" ">
                {#if solution}
                <EditableTextArea bind:input={solution.description}  />
                {/if}
              </div>  
              <div class="m-4">
                <Statistics {solution} />
              </div>
              <div class="m-4 border p-4">
                <TechnologiesAndExpertise {solution} />
              </div>
              <div class="m-4 border p-4">
                <h1 class="mb-4 text-xl text-primary-600">Key Features</h1>
                <Features {solution} />
              </div>
            </TabItem>
          {/if}
        </Tabs>
      </section>
      <section class="col-span-2 m-4 lg:mt-0">
        <div class=" mb-4">
          <h1 class="mb-4 text-xl text-primary-600 font-bold">Followers</h1>
          <UserList users={problem.followers} />
        </div>
        <div class="bg-white border mb-4">
         <Disqus />
        </div>
     
      </section>
    </div>
  </div>
{/if}
