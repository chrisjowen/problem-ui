<script lang="ts">
  import type { User, IdentifiableOwnedSchema } from "$lib/types";
  import { updatedFromNow } from "$lib/util/datetimeUtil";
  import Gravitar from "./Gravitar.svelte";

  export let entity: IdentifiableOwnedSchema;
  export let user: null | User = entity?.user;
</script>

{#if user}
  <div class="flex">
    <div class="rounded flex-shrink-0">
      <div class="m-auto w-full mt-1">
        <Gravitar {user} size="sm" className="rounded-md" />
      </div>
    </div>
    <div class="px-4">
      <p class="font-bold text-gray-600 md:text-sm text-sm">
        {user.name}
        {user.last_name} 
      </p>
      <p class=" mb-1 text-xs hidden md:inline-block">Problem Solver | Design Thinker | Experience Creator | Author
        of the</p>
      <p class="text-xs text-gray-400">
        @{user.username}  <i class="fas fa-arrow-right mx-1" /> updated  <i class="fas fa-arrow-right mx-1" />
        
        <i class="fas fa-clock " /> {updatedFromNow(entity)}
      </p>
      <slot />
    
      {#if entity}
        <p class="text-xs text-gray-500">
          
        </p>
      {/if}
    </div>
  </div>
{/if}
