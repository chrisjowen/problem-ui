<script lang="ts">
  import { imageUrl } from "$lib/util/imageutil";
  import type { Problem } from "$lib/types/index";
  import { Button, Input, Label, Textarea } from "flowbite-svelte";
  import ImageUploadModal from "$lib/components/shared/ImageUploadModal.svelte";
  import MultiSectorSearchSelect from "$lib/components/sector/MultiSectorSearchSelect.svelte";
  import { createEventDispatcher } from "svelte";

  let showImageUplodModal = false;
  export let problem: Problem;

  let dispatch = createEventDispatcher();

  function onSave(): void {
    dispatch("save", problem);
  }

  let imageType = "img";

  function onImageUploaded(e: CustomEvent<any>): void {
    problem[imageType] = e.detail.path;
  }

  let showImageModal = (path: string) => () => {
    imageType = path;
    showImageUplodModal = true;
  };
</script>

<ImageUploadModal
  bind:open={showImageUplodModal}
  on:imageUploaded={onImageUploaded}
/>

<div class="h-full flex flex-col">
  <div class="flex-1 overflow-auto ">
    <div class="p-4 bg-white  ">
      <div class="mb-2">
        <Label class="block mb-2">Name</Label>
        <Input type="text" bind:value={problem.title} />
      </div>

      <div class="mb-2">
        <Label class="block mb-2">Overview</Label>
        <Textarea bind:value={problem.blurb} class="h-[200px]" />
      </div>
      <div class="mb-4">
        <Label class="block mb-2">Sectors</Label>
        <MultiSectorSearchSelect bind:selected={problem.sectors} />
      </div>
      <div class="mb-2">
        <Label class="block mb-2">Banner</Label>
        <button class="border" on:click={showImageModal("banner_image")}>
          <img
            src={imageUrl(problem.banner_image)}
            alt={problem.title}
            class=" max-h-[322px]"
          />
        </button>
      </div>
      <div class="mb-2">
        <Label class="block mb-2">Icon</Label>
        <button class="border bg-white" on:click={showImageModal("img")}>
          <img
            src={imageUrl(problem.img)}
            alt={problem.title}
            class="w-[100px] h-[100px] m-auto border"
          />
        </button>
      </div>
    </div>
  </div>

  <div class="p-2 bg-gray-50 border-t-[1px] z-30 flex justify-end">
    <Button size="xs" on:click={onSave}>
      <i class="fas fa-save mr-2" />
      Save
    </Button>
  </div>
</div>
