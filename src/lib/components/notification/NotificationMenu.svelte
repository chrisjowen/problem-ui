<script lang="ts">
  import api from "$lib/api";
  import { auth, notifications } from "$lib/store";
  import { onMount } from "svelte";
  import NotificationFeedList from "../problem/NotificationFeedList.svelte";
  import { connect } from "$lib/channel/socket";

  let showMenu = false;

  $: {
    if ($auth.loggedInUser) {
      reloadNotifications()
    }
  }

  $: unread = $notifications?.entries?.filter((n: any) => !n.read)?.length;

  onMount(async () => {
     if($auth.loggedInUser) {
      let channel  = await connect(`user:${$auth.loggedInUser.id}`, $auth.token);
      channel.on("notification", (notification: any) => {
        reloadNotifications()
      });
     }
  })

  function reloadNotifications() {
    api.notifications.list("", 10, 1, ["to", "by"]).then((res) => {
        $notifications = res.data;
      });
  }

  function toggleMenu(event: null | MouseEvent = null) {
    if(containsInParent(event?.toElement, "notification-menu")) {
      return;
    }
    showMenu = !showMenu;
  }

  function containsInParent(element: any, id: string) {

    if(element == null) {
      return false;
    }

    return element.id == id || element.parentElement?.id == id  || element.parentElement?.parentElement?.id == id ;
  }

  function markAsRead(event: any) {
    let notification = event.detail;
    if(notification.read) {
      return;
    }
    readNotification(notification)

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
    on:mouseleave={toggleMenu}
    class="p-2 px-3 rounded-t-lg
    {showMenu ? 'bg-white text-black' : ''}
    "
  >
    <i class="fa-solid fa-bell text-lg  {unread > 0  ? "text-yellow-300" : ""} " />
    
  </div>
  <div
    id="notification-menu"
    on:mouseleave={toggleMenu}
    class="absolute top-[32px] w-[550px] left-[-458px] max-h-[700px] overflow-auto  z-50 bg-white  rounded-xl border
    {showMenu
      ? 'block'
      : 'hidden'}"
  >
    <NotificationFeedList on:click={markAsRead}  />
  </div>
</div>
