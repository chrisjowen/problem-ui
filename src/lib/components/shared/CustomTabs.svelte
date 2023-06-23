<script lang="ts">
  export let tabs: any[] = [
    {
      name: "Tab 1",
      id: "tab1",
      icon: "fa fa-home",
    },
  ];

  export let selectedTab = "tab1";

 let selectTab = (tab: any) => () => {
    selectedTab = tab.id;
  }
</script>

<div>
  <div>
    <ul>
      {#each tabs as tab}
        <li>
          <button on:click={selectTab(tab)}>
            {#if tab.icon}
              <i class={tab.icon} />
            {/if}
            {tab.name}
          </button>
        </li>
      {/each}
    </ul>
  </div>
  <section id="body">
    <slot selectedTab={selectedTab} />
  </section>
</div>
