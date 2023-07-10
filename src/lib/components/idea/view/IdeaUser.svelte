<script lang="ts">
  import Gravitar from "$lib/components/shared/Gravitar.svelte";
  import type { User } from "$lib/types";
  import { Button } from "flowbite-svelte";

  export let user: User;
</script>

<div class="flex px-4 xl:px-0 pt-4">
  <div class="mr-4 flex items-center">
    <Gravitar {user} size="sm" className="rounded-lg w-[40px] h-[40px]" />
  </div>
  <div class="flex-1">
    <h2 class="font-bold text-xs md:text-lg text-gray-700">
      {user.name}
      {user.last_name}
    </h2>
    <p class="text-gray-500 text-xs">@{user.username}</p>
  </div>
  <div class="md:hidden" > 
    <Button color="light" size="xs">
        Share
      <i class="fas fa-share ml-1" />
    </Button>
  </div>
</div>
