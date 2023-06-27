<script>
  import { page } from "$app/stores";
  import api from "$lib/api";
  import PageView from "$lib/components/page/PageContent.svelte";
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
      class="max-w-[1000px] xl:min-w-[1000px] h-full border flex-1 min-h-full mb-9 bg-white m-4 relative rounded-md p-8"
    >
      <Editor bind:html={soon.content} editable={false} />
    </section>
  {/if}
</ProblemLayout>
