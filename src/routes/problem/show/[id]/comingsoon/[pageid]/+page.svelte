<script>
  import { page } from "$app/stores";
  import api from "$lib/api";
  import ProblemLayout from "$lib/components/problem/ProblemLayout.svelte";
  import Editor from "$lib/components/shared/editor/Editor.svelte";
  import { onMount } from "svelte";

  let soon = null;
  onMount(() => {
    load();
  });

  $: {
    $page.params.pageid && load()
  }

  function load() {
    api.soon.get($page.params.pageid).then((res) => {
      soon = res.data;
    });
  }
</script>

<ProblemLayout>
  {#if soon}
    <section
      id="PageDisplay"
      class="  flex-1 min-h-full bg-white relative rounded-md p-8 w-full"
    >
      <div class="m-auto max-w-[1000px]">
        <Editor bind:html={soon.content} editable={false} />
      </div>
    </section>
  {/if}
</ProblemLayout>
