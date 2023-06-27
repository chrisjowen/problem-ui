<script lang="ts">
  import type { Sector } from "$lib/types";
  import SectorLayout from "$lib/components/sector/SectorLayout.svelte";
  import NewsList from "$lib/components/news/NewsList.svelte";
  let sector: Sector;
</script>

<SectorLayout bind:sector>
  <NewsList tags={[sector.name]} />
</SectorLayout>
