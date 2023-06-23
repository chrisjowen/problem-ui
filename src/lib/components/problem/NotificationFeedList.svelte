<script lang="ts">
  import { notifications } from "$lib/store";
  import Gravitar from "$lib/components/shared/Gravitar.svelte";
  import moment from "moment";
  import { createEventDispatcher } from "svelte";
  import { goto } from "$app/navigation";
  import { browser } from "$app/environment";
  export let length = 200;

  let dispatch = createEventDispatcher();

  $: feed = $notifications?.entries.slice(0, length);
  $: items = feed
    ?.map((feedItem: any) => {
      if (feedItem.type == "problem") {
        return {
          ...feedItem,
          icon: "fas fa-info-circle ",
          link: `/problem/show/${feedItem.item.id}`,
          linkText: feedItem.item.title,
          prefix: "",
        };
      } else if (feedItem.type == "discussion") {
        return {
          ...feedItem,
          icon: "fa-solid fa-comment",
          link: `/problem/show/${feedItem.item.problem_id}/discussion/${feedItem.item.id}`,
          linkText: feedItem.item.title,
          prefix: "",
        };
      } else if (feedItem.type == "link") {
        return {
          ...feedItem,
          icon: "fa-solid fa-link",
          link: feedItem.item.url,
          linkText: feedItem.item.text,
          prefix: "",
          external: true,
        };
      } else if (feedItem.type == "page") {
        return {
          ...feedItem,
          icon: "fas fa-file",
          link: `/problem/show/${feedItem.item.problem_id}/page/${feedItem.item.id}`,
          linkText: feedItem.item.title,
          prefix: "",
        };
      } else if (feedItem.type == "answer") {
        return {
          ...feedItem,
          icon: "fas fa-file",
          link: `/problem/show/${feedItem.item.discussion.problem_id}/discussion/${feedItem.item.discussion_id}#answer-${feedItem.item.id}`,
          linkText: feedItem.item.discussion.title,
          prefix: "On discussion:",
        };
      } else if (feedItem.type == "problemuser") {

        var message = ""
        if(feedItem.item.status == "invited") {
          message = `@${feedItem.item.member.username} was invited to problem`
        }
        else if(feedItem.item.status == "requested") {
          message = `@${feedItem.item.member.username} requested to join problem`
        }


        return {
          ...feedItem,
          icon: "fas fa-user",
          link: `/problem/show/${feedItem.item.problem_id}/users`,
          linkText: message,
          prefix: "",
        };
      }
    })
    .filter((i) => i != null);

  function fromNow(when: any) {
    return moment.utc(when).fromNow();
  }

  let dispatchOnClick = (notification: any) => (e: Event) => {
    if (notification.external) {
      open(notification.link, "_blank");
    } else {
      goto(notification.link);
    }
    dispatch("click", notification);
  };
</script>

{#if items && items.length > 0}
  {#each items as item}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div
      on:click={dispatchOnClick(item)}
      class="{item.read
        ? 'bg-gray-50 '
        : 'bg-primary-50'}   text-gray-700 border-b-[1px] p-3 flex hover:bg-primary-50"
    >
      <div class="m-2">
        <Gravitar user={item.by} size="md" />
      </div>
      <div class="m-2 text-xs flex items-center flex-1">
        <div>
          <p class="text-gray-500">{fromNow(item?.inserted_at)}</p>
          <p>
            <strong class="mr-1">
              {#if item.by}
                @{item.by.username}
              {:else}
                System user
              {/if}
            </strong>
          </p>
          <p>
            {item.action}
            {#if item.type != "problemuser"}
              {item.type}
            {/if}
            <i class="fas fa-arrow-right mx-1" />
            {item.prefix}
            <a
              href={item.link}
              on:click={dispatchOnClick(item)}
              class="text-blue-800 {item.external ? 'target="_blank"' : ''}"
            >
              <i class="{item.icon} mr-1" />
              {item.linkText}
            </a>
          </p>
        </div>
      </div>
      <div class="flex justify-center items-center mr-2">
        <i class="fas fa-chevron-right text-gray-500" />
      </div>
    </div>
  {/each}
{:else}
  <p class="text-md p-4 text-black">No Notifications</p>
{/if}
