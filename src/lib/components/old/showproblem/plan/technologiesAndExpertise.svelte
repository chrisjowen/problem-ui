<script lang="ts">
  export let solution: any;
</script>

<section>
  <div class="m-1">
    <h1 class="mb-4 text-xl text-primary-600">Technologies</h1>
    <div>
      {#each solution.technologies || [] as technology}
        <span
          class="text-xs bg-primary-500 p-2 mr-1 mb-2 inline-block text-white rounded-md"
        >
          {technology}
        </span>
      {/each}
    </div>
  </div>
  <div class="m-1">
    <h1 class="mb-4 text-xl text-primary-600">Team Expertise</h1>
    <div>
      {#each solution.expertise || [] as expertise}
        <span
          class="text-xs bg-primary-500 p-2 mr-1 mb-1 inline-block text-white rounded-md"
        >
          {expertise}
        </span>
      {/each}
    </div>
  </div>
</section>
