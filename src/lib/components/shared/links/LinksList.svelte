<script lang="ts">
  import type RestApi from "$lib/api/common/restApi";
  import type { Link, PaginationResults } from "$lib/types";
  import { Button, Modal } from "flowbite-svelte";
  import { onMount } from "svelte";
  import LinkForm from "./LinkForm.svelte";

  let links: PaginationResults<Link>;
  export let api: RestApi;
  export let editable = false;
  export let query = "";
  export let search = "";
  let page = 1;
  export let pageSize = 3;

  let showModal = false;
  let selectedLink: null | Link;

  onMount(reload);

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

{#if links}
  <!-- <p>
    {links.total_entries}
  </p> -->

  {#if links.total_entries == 0}
    <div class="bg-white border p-4">No Links</div>
  {/if}

  <div class="border-x-[1px] border-t-[1px] bg-white">
    {#each links.entries as link}
      <div class="border-b-[1px] p-3 relative w-full">
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
              {@html highlight(link.text)}
            </a>
            <p class="text-xs text-gray-500">
              {@html highlight(link.url)}
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
  {#if editable}
    <div class="flex justify-end mt-4">
      <Button size="xs" class="bg-primary-400" on:click={onShowLinkModal()}>
        <i class="fas fa-link mr-2" />
        Add Link
      </Button>
    </div>
  {/if}
{/if}
