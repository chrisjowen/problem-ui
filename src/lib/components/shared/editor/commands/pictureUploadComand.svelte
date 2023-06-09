<script lang="ts">
  import { Modal } from "flowbite-svelte";
  import { Dropzone } from "flowbite-svelte";

  export let editor: any;
  let pictureModal = false;
  let files = [];

  let buttonClicked = () => {
    editor.commands.setImage({ src: "https://placebeard.it/300x300" });
  };
  let fileChanged = (event) => {
    // console.log(files)
  };
</script>

<slot buttonClicked={buttonClicked}></slot>

<Modal open={pictureModal}>
  <Dropzone id="dropzone" on:change={fileChanged} bind:files>
    <svg
      aria-hidden="true"
      class="mb-3 w-10 h-10 text-gray-400"
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
