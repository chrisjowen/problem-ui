<script lang="ts">
  import { Button, Textarea } from "flowbite-svelte";
  import Gravitar from "$lib/components/shared/Gravitar.svelte";

  import { auth } from "$lib/store";
  import { createEventDispatcher } from "svelte";
  import LoginModal from "../shared/LoginModal.svelte";
  export let comment = "";
  export let submitText = "Post";
  $: user = $auth.loggedInUser;

  let dispatch = createEventDispatcher();

  let hasFocused = false
  let showLoginModel = false

  function onPost() {
    hasFocused = false
    dispatch("post",  comment)
    comment = "";
  }
</script>

<LoginModal bind:open={showLoginModel} />
{#if $auth.loggedInUser}
  <section class="pb-4 ">
    <div class="flex">
      <div class="pr-2">
        <Gravitar user={user} size="xs" className="rounded-md w-[20px] h-[20px]" />
      </div>
      <div class="flex-1 ml-1">
        <p class="text-xs mb-2">{user.name} {user.last_name}</p>
        <Textarea class=" {hasFocused ? "h-[140px]" : ""}" bind:value={comment} on:focus={() => hasFocused = true} />
        <div class="flex-1">
          <p class="text-xs {comment.length < 5 ? "text-gray-300" : (comment.length >= 255 ? "text-red-600 bold" : "text-green-400")}">{comment.length}/255 Chars</p>
        </div>
      </div>
    </div>
    <div class="flex justify-end">
      <button   class="border text-xs p-1 rounded-md hover:bg-primary-50 px-2 text-gray-500" disabled={comment.length < 5 || comment.length >= 255 } on:click={onPost}>
        <i class="fa fa-comment mr-1 text-xs" />
        {submitText}  
      </button> 
    </div>
  </section>
  {:else}
  <div class="p-4 text-xs flex justify-center">
    <button on:click={() => showLoginModel = true} class="text-primary-500 underline mr-1">
      <i class="fa fa-sign-in-alt mr-1" />
      Log in  to comment</button> 
  </div>
{/if}
