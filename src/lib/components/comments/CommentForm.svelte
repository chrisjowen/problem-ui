<script lang="ts">
  import { Button, Textarea } from "flowbite-svelte";
  import Gravitar from "$lib/components/shared/Gravitar.svelte";

  import { auth } from "$lib/store";
  import { createEventDispatcher } from "svelte";
  export let comment = "";
  export let submitText = "Post";
  let user = $auth.loggedInUser;

  let dispatch = createEventDispatcher();

  let hasFocused = false

  function onPost() {
    hasFocused = false
    dispatch("post",  comment)
    comment = "";
  }
</script>

{#if user}
  <section class=" p-4 border-b-[1px]">
    <div class="flex">
      <div class="pr-2">
        <Gravitar user={user} size="sm" className="rounded-md" />
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
      <Button size="xs" class="bg-primary-400"  disabled={comment.length < 5 || comment.length >= 255 } on:click={onPost}>
        <i class="fa fa-comment mr-2 text-xs" />
        {submitText} 
      </Button>
    </div>
  </section>
{/if}
