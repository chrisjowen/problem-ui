<script>
  import { auth } from "$lib/store";
  import Gravitar from "$lib/components/shared/gravitar.svelte";
  import { Breadcrumb, BreadcrumbItem } from "flowbite-svelte";
  import { onMount } from "svelte";
  import api from "$lib/api";

  let me = $auth.loggedInUser;

  onMount(async () => {
    me = (await api.user.get(me.id, ["problems"])).data
  });
</script>

<div class=" p-6">
  <Breadcrumb aria-label="Default breadcrumb example">
    <BreadcrumbItem home href="/">Home</BreadcrumbItem>
    <BreadcrumbItem>Profile</BreadcrumbItem>
  </Breadcrumb>
</div>

{#if me}
  <div class="m-9 ">
    <div class="flex bg-white p-4 border">
      <div class=" mr-5" >
        <Gravitar email={me.email} size="lg" />
      </div>
      <div class="flex-1">
        <h1 class=" text-xl text-primary-600 font-bold">
          {me.name}
          {me.last_name}
        </h1>
        <p class="text-xs">
             {me.email}
        </p>
      </div>
    </div>
  </div>
{/if}
