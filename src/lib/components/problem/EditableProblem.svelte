<script lang="ts">
	import { imageUrl } from '$lib/util/imageutil';
  import type { Page } from "$lib/types/index";
  import {
    Button,
    ButtonGroup,
    Input,
    InputAddon,
    Label,
    Modal,
    Textarea,
  } from "flowbite-svelte";
  import AiHelper from "../shared/AiHelper.svelte";
  import Editor from "../shared/editor/Editor.svelte";
  import { createEventDispatcher } from "svelte";
  import TagList from "../shared/TagList.svelte";
  import ImageUploadModal from '../shared/ImageUploadModal.svelte';
  let showImageUplodModal = false
  export let problem: Problem;

  let dispatch = createEventDispatcher();
  function onSave(): void {
    dispatch("save", problem);
  }

  let imageType = 'img'

  function onImageUploaded(e: CustomEvent<any>): void {
    problem[imageType] = e.detail.path
  }

  let showImageModal = (path: string) => () => {
    imageType = path
    showImageUplodModal = true
  }
 

</script>

<ImageUploadModal bind:open={showImageUplodModal} on:imageUploaded={onImageUploaded} />

<div class="h-full md:flex">
  <div class="h-full flex flex-col border-x-[1px] border-b-[1px] flex-1">
    <div class="p-2 bg-white border-b-[1px]">
      <Input type="text" class="text-xl" bind:value={problem.title} />
    </div>

    <div class=" bg-white flex-1 overflow-auto">
      <Editor
        bind:html={problem.overview}
        height="full"
        showFullscreen={false}
      />
    </div>

    <div class="p-2 bg-gray-50 border-t-[1px] z-30 flex justify-end">
      <Button size="xs" on:click={onSave}>
        <i class="fas fa-save mr-2" />
        Save
      </Button>
    </div>
  </div>
  <div class="border-l-[1px] min-w-[500px]">
    <div class="m-6">
      <Label class="block mb-2">Overview</Label>
      <Textarea bind:value={problem.blurb} class="h-[200px]" />
    </div>

    <div class="m-6">
      <Label class="block mb-2">Tags</Label>
      <TagList bind:tags={problem.tags} />
    </div>


    <div class="m-6">
      <Label class="block mb-2">Image</Label>
      <button class="border bg-white p-4" on:click={showImageModal("img")}>
        <img src={imageUrl(problem.img)} alt="{problem.title}" class="w-[100px] h-[100px] m-auto border" />
      </button>
    </div>

    <div class="m-6">
      <Label class="block mb-2">Banner</Label>
      <button class="border bg-white p-4" on:click={showImageModal("banner_image")}>
        <img src={imageUrl(problem.banner_image)} alt="{problem.title}" class="w-[250px] h-[100px] m-auto border" />
      </button>
    </div>

  </div>
</div>
