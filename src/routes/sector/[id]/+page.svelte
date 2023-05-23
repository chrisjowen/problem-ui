<script lang="ts">
  import axios from "axios";
  import { onMount } from "svelte";
  import EditableTextArea from "$lib/shared/editableTextArea.svelte";
  import { page } from "$app/stores";
  import { Alert, Breadcrumb, BreadcrumbItem, Button } from "flowbite-svelte";
  import { goto } from "$app/navigation";
  import UserList from "$lib/showproblem/userList.svelte";
  import { auth } from "$lib/store";
  import CreateProblem from "$lib/components/problem/CreateProblem.svelte";
  let sector: any = null;
  let problems: any[] = [];
  let loggedInUser: any = null;
  let showProblemModal = false;

  onMount(() => {
    loadSector();
    loadProblems();
    loggedInUser = $auth?.loggedInUser;
  });

  function follow() {
    console.log("follow", loggedInUser);
    if (!loggedInUser) {
      goto("/login");
    }
  }

  function loadSector() {
    axios
      .get(`/api/sector/${$page.params.id}`)
      .then((res) => {
        sector = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function loadProblems() {
    axios
      .get(`/api/sector/${$page.params.id}/problems?page_size=5`)
      .then((res) => {
        problems = res.data.entries;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  let showProblem = (problem: any) => () => {
    goto(`/problem/show/${problem.id}`);
  };
</script>

{#if !sector}
  <div class="bg-gray-50 p-9">
    <h2 class="mb-3 text-2xl font-bold tracking-tight text-primary-600">
      Loading...
    </h2>
  </div>
{:else}
  <CreateProblem bind:open={showProblemModal} {sector} />
  <div>
    <div class="bg-primary-100 p-2 flex flex-row justify-end space-x-2 hidden">
      <Button size="xs" color="light" on:click={follow}>
        <i class="fas fa-bell mr-2" />
        Follow
      </Button>
    </div>
    <div class="bg-primary-500 p-2 flex flex-row space-x-2">
      <div class="flex-1 p-2">
        <Breadcrumb aria-label="Default breadcrumb example">
          <BreadcrumbItem href="/sector" linkClass="text-white text-xs">Sectors</BreadcrumbItem>
          <BreadcrumbItem href="/sector/{sector.id}"
          linkClass="text-white text-xs">{sector.name}</BreadcrumbItem
          >
        </Breadcrumb>
      </div>
      <div>
      {#if loggedInUser}
        <Button
          size="xs"
          color="light"
          on:click={() => (showProblemModal = true)}
        >
          <i class="fas fa-add mr-2" />
          Create Problem
        </Button>
      {/if}
    </div>
    </div>

    <div class=" mx-4 mb-4 hidden">
      <Alert dismissable border>
        <span slot="icon">
          <i class="fas fa-info-circle" />
        </span>
        Are you highly knowadgable about this sector?
        <a href="#" class="underline font-bold"
          >Register as an expert in {sector.name}</a
        >
      </Alert>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-6 md:gap-4 md:m-3">
      <section class=" col-span-4 mb-4">
        <div class="bg-white border">
          <EditableTextArea bind:input={sector.description}>
            <div class="p-4 text-center w-full">
              <div
                class="h-[256px] border m-auto"
                style="background-image:url('/api/image{sector.image}');  background-size: cover; background-position: center;"
              />
            </div>
          </EditableTextArea>
        </div>
      </section>
      <section class="col-span-2 m-2 md:m-0">
        <div class=" mb-4 hidden">
          <h1 class="mb-4 text-xl text-primary-600 font-bold">Experts</h1>
          <UserList />
        </div>
        <div class="grid grid-cols-1 md:grid-cols-1 overflow-x-auto">
          {#each problems as problem, idx}
            <div class="inline-block flex w-full mb-4">
              <!-- svelte-ignore a11y-click-events-have-key-events -->
              <div
                class=" bg-white border hover:border-primary-600 w-full md:flex flex-row"
                on:click={showProblem(problem)}
                size="full"
              >
                <div class="p-4">
                  <img
                    class="w-full md:w-auto h-[100px] object-cover object-center border"
                    src="/api/image/{problem.img}"
                    alt="content"
                  />
                </div>
                <div class="flex-1 mb-4 m-4 space-y-4">
                  <h5 class="text-xl font-bold text-gray-400">
                    {problem.title}
                  </h5>
                  <p class="">
                    {problem.blurb.slice(0, 100)}...
                  </p>
                </div>
              </div>
            </div>
          {/each}
          <div class="flex justify-end">
         
          <Button size="xs"  class="w-full">
              <i class="fas fa-search mr-2" />
              Search Problems
            </Button>
          </div>
        </div>
      </section>
    </div>
  </div>
{/if}
