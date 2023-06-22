<script lang="ts">
  import axios from "axios";
  import { Modal } from "flowbite-svelte";
  import { Dropzone } from "flowbite-svelte";
  import { createEventDispatcher } from "svelte";

  let area = "general";
  export let open = false;
  let files: any[] = [];

  let dispatch = createEventDispatcher();

  let onUpload = () => {
    const formData = new FormData();
    formData.append("file", files[0]);

    axios
      .post(`/api/image/${area}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        dispatch("imageUploaded", res.data);
        open = false;
      });
  };
</script>

<Modal title="Upload Image" bind:open size="xl" class="w-full">
  <Dropzone id="dropzone" on:drop={onUpload} on:change={onUpload} bind:files>
    <svg
      aria-hidden="true"
      class="mb-3 w-10 h-20 text-gray-400"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      ><path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
      /></svg
    >
    <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
      <span class="font-semibold">Click to upload</span> or drag and drop
    </p>
    <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG</p>
  </Dropzone>
</Modal>
