<script lang="ts">
  import Gravitar from "$lib/components/shared/Gravitars.svelte";

  export let user: any;
  export let maxBio = 10000;
  export let role: string = "Problem Owner";
</script>

<div class="bg-white p-6 border flex relative overflow-hidden">
  <div class="flex flex-shrink-0 ">
    <div class="mr-4 mb-2">
      <Gravitar {user} size="lg" />
    </div>
    <div>
      <h2 class="text-lg">
        {user.name}
        {user.last_name}
      </h2>
      <p class="text-xs mb-2 text-gray-500">
        {"Problem Solver | Design Thinker | Experience Creator | Author of the".slice(0, maxBio)}...
      </p>
      <span class="text-xs inline-block text-gray-400 bg-gray-50 border p-1">
        {role}
      </span>
    </div>
  </div>
</div>
