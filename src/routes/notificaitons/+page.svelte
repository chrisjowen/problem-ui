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
    {#each $notifications.entries as notification}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div class="bg-white border flex  hover:drop-shadow-md rounded-lg mb-2">
        <div
          class="flex-1 flex p-5"
          on:click={viewNotification(notification)}
        >
          <div class="mr-4 flex items-center">
            <i
              class="fa fa-bell text-4xl {notification.read
                ? 'text-gray-200'
                : 'text-primary-600'} "
            />
          </div>
          <div class="flex-1 flex items-center {notification.read ? 'text-gray-400' : ''}">
            <h1>{notification.title}</h1>
          </div>
        </div>

        <button class="hover:bg-red-500  bg-gray-500 p-2 px-4 rounded-r-lg  flex items-center" on:click={deleteNotification(notification)}>
          <i class="fa fa-trash text-white" />
        </button>
      </div>
    {/each}
  {:else}
    <div>No Notifications</div>
  {/if}
</div>
