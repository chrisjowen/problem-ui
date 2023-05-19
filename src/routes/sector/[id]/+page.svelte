<script lang="ts">
  import axios from "axios";
  import { onMount } from "svelte";
  import EditableTextArea from "$lib/shared/editableTextArea.svelte";
  import { page } from "$app/stores";
  import { Alert, Breadcrumb, BreadcrumbItem, Button, Card } from "flowbite-svelte";
  import { goto } from "$app/navigation";
  import UserList from "$lib/showproblem/userList.svelte";
  import { auth } from "$lib/store";
  let sector: any = null;
  let problems: any[] = [];
  let loggedInUser: any = null


  onMount(() => {
    loadSector();
    loadProblems();
    auth.subscribe((value) => {
      loggedInUser = value.loggedInUser;
    });
  });

  function follow() {
    console.log("follow", loggedInUser);
    if(!loggedInUser) {
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
      .get(`/api/sector/${$page.params.id}/problems`)
      .then((res) => {
        problems = res.data;
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
  <div>
    <div class="bg-primary-100 p-2 flex flex-row justify-end space-x-2">
      <Button size="xs" color="light" on:click={follow}>
        <i class="fas fa-bell mr-2"></i>
        Follow
      </Button>
      <!-- <Button size="xs" color="green">
        <i class="fas fa-bell-slash mr-2"></i>
        Unfollow
      </Button> -->
      <!-- <Button size="xs" color="light">
       <i class="fas fa-user-plus mr-2"></i>
          Expert
      </Button> -->
    </div>
    <div class=" p-6">
      <Breadcrumb aria-label="Default breadcrumb example">
        <BreadcrumbItem href="/sector" >Sectors</BreadcrumbItem>
        <BreadcrumbItem href="/sector/{sector.id}">{sector.name}</BreadcrumbItem>
      </Breadcrumb>
    </div> 

   
    <div class=" mx-4 mb-4 hidden">
      <Alert dismissable border>
        <span slot="icon">
          <i class="fas fa-info-circle"></i>
        </span>
        Are you highly knowadgable about this sector? 
        <a href="#" class="underline font-bold">Register as an expert in {sector.name}</a>
      </Alert> 
    </div>
   
    
    <div class="grid grid-cols-1 md:grid-cols-5 md:gap-4 m-3 ">
      <section class=" col-span-3   mb-4">
        <div class="bg-white border">
          <EditableTextArea bind:input={sector.description}>
            <div class="p-4 text-center w-full ">
              <div
                class="h-[256px]  border m-auto"
                style="background-image:url('/api/image{sector.image}');  background-size: cover; background-position: center;"
              />
            </div>
          </EditableTextArea>
        </div>
      
      </section>
      <section class="col-span-2 md:mr-4 ">
        <div class=" mb-4 hidden">
          <h1 class="mb-4 text-xl text-primary-600 font-bold">Experts</h1>
          <UserList />
        </div>
        <div>
          <h1 class="mb-4 font-bold text-2xl  tracking-tight text-primary-500">
            Latest {sector.name} Problems
          </h1>
        </div>
        <div class="grid  grid-cols-1 md:grid-cols-1 overflow-x-auto">
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
                    class="w-full md:w-auto h-[150px] object-cover object-center border"
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
      
                  <p class=" text-primary-600 p-1 pl-2 pr-2 bg-gray-200 text-xs inline-block">
                    <i class="fas fa-tag mr-1" />
                    {sector.name}
                  </p>
                </div>
              </div>
            </div>
          {/each}
          <div >
            <div class=" text-xs text-center border p-2 bg-primary-900 hover:bg-primary-700 text-white" >
              <i class="fas fa-search mr-2"></i>
              Search All {sector.name} Problems
            </div>
          </div>
        
        </div>
       
      
      </section>
    </div>
  </div>
{/if}
