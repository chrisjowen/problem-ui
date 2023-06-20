<script lang="ts">
  import type RestApi from "$lib/api/common/restApi";
  import type { Link, PaginationResults } from "$lib/types";
  import { Button, Modal } from "flowbite-svelte";
  import LinkForm from "./LinkForm.svelte";
  import { imageUrl } from "$lib/util/imageutil";
  import { redirectIfNotLoggedIn } from "$lib/util/authUtil";

  let links: PaginationResults<Link>;
  export let api: RestApi;
  export let editable = false;
  export let query = "";
  export let search = "";
  let page = 1;
  export let pageSize = 3;

  let showModal = false;
  let selectedLink: null | Link;

  async function reload() {
    let response = await api.list(query, pageSize, page);
    links = response.data;
  }

  $: {
    if (query !== null) {
      reload();
    }
  }

  let onShowLinkModal =
    (link: null | Link = null) =>
    () => {
      redirectIfNotLoggedIn();
      selectedLink = link;
      showModal = true;
    };

  async function onUpdateLink(e: CustomEvent<Link>): Promise<void> {
    let link = e.detail;

    if (!link.id) {
      await api.create(link);
    } else {
      await api.update(link.id, link);
    }

    selectedLink = null;
    await reload();
    showModal = false;
  }

  function icon(uri: string) {
    const url = new URL(uri);
    return `${url.protocol}//${url.host}/favicon.ico`;
  }

  function highlight(text: string) {
    if (search) {
      return text.replace(
        new RegExp(search, "gi"),
        (match) => `<span class="bg-yellow-200">${match}</span>`
      );
    }

    return text;
  }
</script>

<Modal bind:open={showModal} title="Add Link" class="w-full" size="lg">
  <LinkForm on:update={onUpdateLink} link={selectedLink} />
</Modal>

<div class="flex mb-5">
  <h1 class="flex-1 items-end flex text-xl text-primary-600">Resources</h1>
  {#if editable}
    <Button size="xs" color="light" on:click={onShowLinkModal()}>
      <i class="fas fa-link mr-2" />
      Add Resource
    </Button>
  {/if}
</div>



{#if links}
  {#if links.total_entries == 0}
    <div class="bg-white border p-4">No Links</div>
  {/if}

  <div class="grid grid-cols-1 grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
    {#each links.entries as link}
      <div
        class="border p-3 relative w-full bg-white overflow-hidden rounded-xl hover:shadow-xl transition-shadow duration-[0.5s] ease-in-out"
      >
        <a target="_blank" href={link.url}>
          <div class="w-full h-[200px] overflow-hidden border mb-4 rounded-xl justify-center text-center flex items-center">
           
            <object
              title={link.text}
              data="https://image.thum.io/get/{link.url}"
              type="image/png"
              class="w-full"
            >
              <i class="fa text-8xl fa-external-link-alt text-primary-300" />
            </object>
          </div>
        </a>

        <div class="pb-4">
          <span
            class="text-xs bg-gray-50 p-2 mr-1 mb-1 inline-block text-gray-400 border"
          >
          <span>
            <i class="fas fa-tag mr-1" />
          </span>
            #{link.type}
          </span>
        </div>
        <div class="flex">
          <div class="mr-3 mt-1">
            <object
              title={link.text}
              data={icon(link.url)}
              type="image/png"
              width="20"
              height="20"
            >
              <i class="fa fa-external-link-alt text-primary-900" />
            </object>
          </div>

          <div class="flex-1">
            <a
              class="underlined text-primary-800 mr-2 text-sm"
              target="_blank"
              href={link.url}
            >
              {@html highlight(link.text.slice(0, 35))}
            </a>
            <p class="text-xs text-gray-500">
              {@html highlight(link.url.slice(0, 40))}...
            </p>
          </div>
          {#if editable}
            <div>
              <Button size="xs" color="light" on:click={onShowLinkModal(link)}>
                <i class="fas fa-edit" />
              </Button>
            </div>
          {/if}
        </div>
      
      </div>
    {/each}
  </div>

 
  
{/if}
