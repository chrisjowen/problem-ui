<script lang="ts">
  import api from "$lib/api";
  import { auth, notifications } from "$lib/store";
  import NotificationFeedList from "./problem/NotificationFeedList.svelte";

  let showMenu = false;

  $: {
    if ($auth.loggedInUser) {
      reloadNotifications()
    }
  }

  $: unread = $notifications?.entries?.filter((n: any) => !n.read)?.length;


  function reloadNotifications() {
    api.notifications.list("", 50, 1, ["to", "by"]).then((res) => {
        $notifications = res.data;
      });
  }

  function toggleMenu() {
    showMenu = !showMenu;
  }

  function markAsRead(event: any) {
    let notification = event.detail;
    readNotification(notification)
    toggleMenu();

  }


  async function readNotification(notification: any) {
    await api.notifications.update(notification.id, { read: true }).then(() => {
      reloadNotifications()
    });
  }

</script>

<div class="flex items-center relative">
  <div
    on:mouseenter={toggleMenu}

    class="p-2 px-3 rounded-t-lg
    {showMenu ? 'bg-white text-black' : ''}
    "
  >
    <i class="fa-solid fa-bell text-xs mr-1" />
    Notifications
  </div>
  <div
    on:mouseleave={toggleMenu}
    class="absolute top-[32px] w-[550px] left-[-408px] max-h-[700px] overflow-auto  z-50 bg-white  rounded-xl border
    {showMenu
      ? 'block'
      : 'hidden'}"
  >
    <NotificationFeedList on:click={markAsRead} />
  </div>
</div>
