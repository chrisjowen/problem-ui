<script lang="ts">
  import axios from "axios";
  import { onMount } from "svelte";
  import EditableTextArea from "$lib/shared/editableTextArea.svelte";
  import { page } from "$app/stores";
  import { Breadcrumb, BreadcrumbItem, Card } from "flowbite-svelte";
  import { Listgroup, ListgroupItem } from "flowbite-svelte";
  import { goto } from "$app/navigation";

  let idea: any = null;

  onMount(() => {
    loadIdea();
  });

  function loadIdea() {
    axios
      .get(`/api/idea/${$page.params.id}`)
      .then((res) => {
        idea = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }

</script>

{#if !idea}
  <div class="bg-gray-50 p-9">
    <h2 class="mb-3 text-2xl font-bold tracking-tight text-primary-600">
      Loading...
    </h2>
  </div>
{:else}
  <div>
    <div class=" p-6">
      <Breadcrumb aria-label="Default breadcrumb example">
        <BreadcrumbItem href="/sector" home>Sector</BreadcrumbItem>
        <BreadcrumbItem href="/sector/{idea.sector.id}">{idea.sector.name}</BreadcrumbItem>
        <BreadcrumbItem >{idea.title}</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
      <section class=" col-span-3 bg-white border ml-4 mb-4">
        <EditableTextArea bind:input={idea.description}>
          <div class="p-4 text-center w-full ">
            <div
              class="h-[256px]  border m-auto"
              style="background-image:url('/api/image{idea.image}');  background-size: cover; background-position: center;"
            />
          </div>
        </EditableTextArea>
      </section>
    </div>
  </div>
{/if}
