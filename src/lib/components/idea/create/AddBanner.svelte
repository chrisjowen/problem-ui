<script lang="ts">
  import Gravitar from "$lib/components/shared/Gravitar.svelte";
  import LoginModal from "$lib/components/shared/LoginModal.svelte";
  import { auth } from "$lib/store";
  import type { User } from "$lib/types";
  import { Button, Dropzone } from "flowbite-svelte";
  import { createEventDispatcher } from "svelte";
  import axios from "axios";

  export let value: User[] = [];

  let checked = false;
  let validLength: boolean = false;
  let dispatch = createEventDispatcher();

  function valid() {
    dispatch("valid", true);
  }

  export function validate() {
    checked = true;
    valid();
  }

  let area = "general";
  export let open = false;
  let files: any[] = [];

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

<div class="mb-4">
  <h1 class="text-lg font-bold flex-1">Add Banner</h1>
  <p class=" mb-4 text-xs"><span class="font-bold">Optional:</span> But Will Increase Participation</p>
  {#if $auth.loggedInUser}
    <div class="p-4 bg-white border flex text-center">
      <Dropzone
        id="dropzone"
        on:drop={onUpload}
        on:change={onUpload}
        bind:files
      >
        <svg
          aria-hidden="true"
          class="mb-3 w-10 h-20 text-gray-400 m-auto"
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
    </div>
    <div class="flex justify-end pt-4">
      <Button size="lg" on:click={validate}
        >Next <i class="fas fa-arrow-right ml-2" />
      </Button>
    </div>
  {:else}
    <div class="p-4 bg-white border flex">
      <LoginModal let:click>
        <Button on:click={click} class="m-auto">
          <i class="fas fa-sign-in-alt mr-2" />
          Login To Submit Your Idea
        </Button>
      </LoginModal>
    </div>
  {/if}
</div>
