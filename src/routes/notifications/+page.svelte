<script lang="ts">
  import { goto } from "$app/navigation";
  import api from "$lib/api";
  import NotificationFeedList from "$lib/components/problem/NotificationFeedList.svelte";
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

  let deleteNotification = (notification: any) => () => {
     api.notifications.delete(notification.id).then(() => {
      api.notifications.list().then((res) => {
        console.log($notifications)
        $notifications.entries = $notifications!.entries.filter((n : any) => n.id !== notification.id);
      });
    });
  };


  async function readNotification(notification: any) {
    await api.notifications.update(notification.id, { read: true }).then(() => {
      api.notifications.list().then((res) => {
        notifications.set(res.data);
      });
    });
  }
</script>

{#if selected}
  <Modal
    bind:open={showModal}
    size="lg"
    class="w-full"
    bind:title={selected.title}
  >
    {@html selected.content}

    <svelte:fragment slot="footer">
      {#each selected.actions as action}
        <Button on:click={() => goto(`${action.href}`)}>{action.title}</Button>
      {/each}
    </svelte:fragment>
  </Modal>
{/if}

<div class="p-4">
  <h1>Notifications</h1>
  {#if $notifications?.entries}
    <NotificationFeedList />
  {:else}
    <div>No Notifications</div>
  {/if}
</div>
