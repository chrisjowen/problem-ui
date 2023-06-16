<script lang="ts">
  import { goto } from "$app/navigation";
  import api from "$lib/api";
  import { notifications } from "$lib/store";
  import { redirectIfNotLoggedIn } from "$lib/util/authUtil";
  import { Button, Modal } from "flowbite-svelte";
  import { onMount } from "svelte";

  let showModal = false;
  let selected: any = null;

  onMount(() => {
    redirectIfNotLoggedIn();
  });

  let viewNotification = (notification: any) => () => {
    readNotification(notification);
    selected = notification;
    showModal = true;
  };

  async function readNotification(notification : any) {
    await api.notifications.update(notification.id, {read: true}).then(() => {
      api.notifications.list().then((res) => {
        notifications.set(res.data);
      })
    })
  }
</script>

{#if selected}
  <Modal
    bind:open={showModal}
    size="lg"
    class="w-full"
    bind:title={selected.title}
  >
    {selected.content}

    <svelte:fragment slot="footer">
      {#each selected.actions as action}
      <Button on:click={() => goto(`${action.href}`)}>{action.title}</Button>
      {/each}
    </svelte:fragment>
  </Modal>
{/if}

<div class="p-4">
  {#if $notifications?.entries}
    {#each $notifications.entries as notification}
      <div class="{notification.read ? "bg-gray-100" : "bg-white"} border p-4 mb-2 flex">
        <div class="mr-4">
          <i class="fa fa-bell text-4xl text-primary-600" />
        </div>
        <div class="flex-1">
          <h1>{notification.title}</h1>
          <p class="text-xs">{notification.content}</p>
        </div>

        <div>
          <Button
            size="xs"
            color="light"
            on:click={viewNotification(notification)}>View</Button
          >
        </div>
      </div>
    {/each}
  {:else}
    <div>No Notifications</div>
  {/if}
</div>
