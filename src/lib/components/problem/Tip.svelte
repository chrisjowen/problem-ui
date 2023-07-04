<script lang="ts">
  import { page } from "$app/stores";
  import { tips, dismissTip } from "$lib/store";

  export let title: String = "";
  export let mainClass: String = "my-4";
  export let id: String = $page.url.toString();

  let dismissed: boolean = false;

  tips.subscribe((val) => {
    dismissed = val.dismissed.includes(id);
  });

  function onDismissTip() {
    dismissTip(id);
  }
</script>

{#if !dismissed}
  <div class=" p-4 bg-primary-100 flex {mainClass}"  >
    <div>
      <img src="/img/ai.png" class="h-12" alt="helper" />
    </div>
    <div class="ml-4 flex-1 text-gray-600">
      <h1 class="text-xl mb-2 font-bold">{title}</h1>
        <slot />
    </div>
    <div>
      <button class="hover:text-gray-500 w-[30px] h-[30px] text-center
       rounded-lg hover:bg-primary-50" on:click={onDismissTip}>
        <i class="fa fa-times flex items-center justify-center" />
      </button>
    </div>
  </div>
{/if}
