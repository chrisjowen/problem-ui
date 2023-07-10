<script lang="ts">
  import Editor from "$lib/components/shared/editor/Editor.svelte";
import type { Problem } from "$lib/types";
  import { imageUrl } from "$lib/util/imageutil";

  export let problem: Problem;
</script>
<Editor html={problem.overview} editable={false} />
