<script lang="ts">
  import Gravitar from "$lib/components/shared/Gravitar.svelte";
  import LoginModal from "$lib/components/shared/LoginModal.svelte";
  import { auth } from "$lib/store";
  import type { User } from "$lib/types";
  import { Button } from "flowbite-svelte";
  import { createEventDispatcher } from "svelte";

  export let value: User[] = [];

  let checked = false;
  let validLength: boolean = false;
  let dispatch = createEventDispatcher();

  function valid() {
    dispatch("valid", true);
  }

  export function validate() {
    checked = true;
    valid()
  }

  let deleteFeature = (idx: number) => () => {};

  let addFeature = () => {};
</script>

<div class="mb-4">
  <h1 class="text-lg font-bold my-4 flex-1">The Solvers</h1>

  {#if $auth.loggedInUser}
    <div class="p-4 bg-white border flex">
      <Gravitar
        user={$auth.loggedInUser}
        className="w-[40px] h-[40px] rounded-none"
      />
      <div class="ml-4 flex-1">
        <h2 class="font-bold text-gray-700">
          {$auth.loggedInUser.name}
          {$auth.loggedInUser.last_name}
        </h2>
        <p class="text-gray-500 text-xs">@{$auth.loggedInUser.username}</p>
      </div>
    </div>
    <div class="flex justify-end pt-4">
      <Button size="lg" on:click={validate}
        >Next <i class="fas fa-arrow-right ml-2" />
      </Button>
    </div>
  {:else}
    <div class="p-4 bg-white border flex ">
      <LoginModal let:click>
        <Button  on:click={click} class="m-auto">
          <i class="fas fa-sign-in-alt mr-2" />
          Login To Submit Your Idea
        </Button>
      </LoginModal>
    </div>
  {/if}
</div>
