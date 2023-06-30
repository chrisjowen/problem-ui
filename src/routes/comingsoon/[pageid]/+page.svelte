<script lang="ts">
  import { page } from "$app/stores";
  import api from "$lib/api";
  import LeftMenuLayout from "$lib/components/shared/LeftMenuLayout.svelte";
  import Editor from "$lib/components/shared/editor/Editor.svelte";
  import { state } from "$lib/store";
  import { onMount } from "svelte";

  let soon = null;
  onMount(() => {
    load();
  });

  $: {
    $page.params.pageid && load();
  }

  function load() {
    api.soon.list().then((res) => {
      $state.soons = res.data;
      setTimeout(makeMenu, 100);
    });

    api.soon.get($page.params.pageid).then((res) => {
      soon = res.data;
    });
  }

  let menuItems: any[] = [
    {
      title: "Coming Soon",
      icon: "fa-solid fa-rocket ",
      href: `/comingsoon/1`,
    },
  ];

  function makeMenu() {
    menuItems = ($state.soons?.entries || []).map((soon: any) => {
      return {
        title: soon.title,
        icon: soon.icon,
        href: `/comingsoon/${soon.id}`,
        comingSoon: true,
      };
    });
  }
</script>
{#if soon && $state.soons?.entries?.length > 0}
<LeftMenuLayout {menuItems}>

    <section
      id="PageDisplay"
      class="  flex-1 min-h-full bg-white relative rounded-md p-8 w-full"
    >
      <div class="m-auto max-w-[1000px]">
        <Editor bind:html={soon.content} editable={false} />
      </div>
    </section>
</LeftMenuLayout>
{/if}
