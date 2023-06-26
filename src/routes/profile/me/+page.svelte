<script lang="ts">
  import { auth } from "$lib/store";
  import { onMount } from "svelte";
  import api from "$lib/api";
  import { Button, Indicator, TabItem, Tabs } from "flowbite-svelte";
  import { goto } from "$app/navigation";
  import NotificationFeedList from "$lib/components/problem/NotificationFeedList.svelte";
  import _ from "lodash";
  import { imageUrl } from "$lib/util/imageutil";
  import UserProfileDisplay from "$lib/components/user/UserProfileDisplay.svelte";

  let me = $auth.loggedInUser;
  let problems: any[] = [];

  $: myProblems = _.uniqBy(
    problems?.concat(
      me?.memberships
        ?.filter((m) => m.status == "active")
        .map((m: any) => {
          return { ...m.problem, membership: m };
        }) ?? []
    ),
    "id"
  );

  $: filteredProblems = myProblems?.slice(0, 5);

  $: invites = me?.memberships?.filter((m: any) => m.status == "invited") ?? [];

  // TODO: Make preloads queriable too https://hexdocs.pm/ecto/Ecto.Query.html#preload/3-preload-functions
  onMount(async () => {
    me = (
      await api.user.get(me.id, [
        "memberships",
        "memberships.problem",
        "profile",
      ])
    ).data;
    loadProblems();
  });

  function loadProblems() {
    api.problem.list(`user_id=${me.id}`, 500, 1, ["user"]).then((res) => {
      problems = res.data.entries;
      loadRequests();
    });
  }

  let requested: any[] = [];

  function loadRequests() {
    let allProblemIds = problems?.map((p: any) => p?.id).join(",") || "";
    api.membership
      .list(`problem_id[in]=${allProblemIds}|status=requested`, 5, 1, [
        "problem",
      ])
      .then((res) => {
        requested = res.data.entries;
      });
  }
</script>

{#if me}
  <div class="flex h-full">
    <section
      id="leftMenu"
      class="w-[300px] bg-gray-200 h-full overflow-x-hidden overflow-y-auto flex flex-col hidden md:block"
    >
      <div class=" p-4 border-b-[1px]">
        <Button
          class=" text-xs w-full"
          size="xs"
          on:click={() => goto("/problem/create")}
          color="light"
        >
          <i class="fa-solid fa-atom mr-2" />
          Create New Problem</Button
        >
      </div>
      <h1 class=" text-xl text-primary-600 font-bold px-4">Your Problems</h1>
      <ul class="flex-1 overflow-x-hidden overflow-y-auto">
        {#each filteredProblems as problem}
          <li>
            <a
              href="/problem/show/{problem.id}"
              class="block p-2 md:text-sm md:p-3 m-2 text-gray-500 text-xs md:text-md rounded-sm hover:text-gray-600 hover:bg-gray-100 flex flex-row flex-shrink-0"
            >
              <div class="w-[55px] mr-4">
                <img
                  class="h-[40px]"
                  src={imageUrl(problem.img)}
                  alt="content"
                />
              </div>
              <div>
                <span>{problem.title.slice(0, 40)}</span>
                <span class="bg-gray-100 p-1 border rounded-xl text-xs"
                  >{problem.membership?.role || "owner"}</span
                >
              </div>
            </a>
          </li>
        {/each}
      </ul>
    </section>

    <section id="MainPane" class="flex-1 overflow-auto">
      <Tabs style="underline" contentClass="p-4">
        <TabItem open title="Profile">
          <UserProfileDisplay user={me} />
        </TabItem>
        <TabItem>
          <div slot="title" class="flex items-center gap-2">
            {invites.length} Invites
          </div>
          <section id="Invites" class="flex flex-col m-4">
            {#if invites.length > 0}
              <ul class="flex-1 overflow-x-hidden overflow-y-auto">
                {#each invites as invite}
                  <li class="bg-white border mb-2">
                    <a
                      href="/problem/show/{invite.problem.id}/users"
                      class="block p-2 md:text-sm md:p-3 text-gray-500 text-xs md:text-md rounded-sm hover:bg-primary-100 flex flex-row flex-shrink-0"
                    >
                      <div class="w-[55px] mr-2">
                        <img
                          class="h-[40px] border"
                          src={imageUrl(invite.problem.img)}
                          alt="content"
                        />
                      </div>
                      <p class="flex items-center">
                        <span>{invite.problem.title}</span>
                      </p>
                    </a>
                  </li>
                {/each}
              </ul>
            {:else}
              <div class="bg-white p-4 border">No Invites</div>
            {/if}
          </section>
        </TabItem>
        <TabItem title="Requests">
          <div slot="title" class="flex items-center gap-2">
            {requested.length} Contribution Request
          </div>
          <section id="Requests" class="flex flex-col m-4">
            {#if requested.length > 0}
              <ul class="flex-1 overflow-x-hidden overflow-y-auto">
                {#each requested as request}
                  <li class="bg-white border mb-2">
                    <a
                      href="/problem/show/{request.problem.id}/users"
                      class="block p-2 md:text-sm md:p-3 text-gray-500 text-xs md:text-md rounded-sm hover:bg-primary-100 flex flex-row flex-shrink-0"
                    >
                      <div class="w-[55px] mr-2">
                        <img
                          class="h-[40px] border"
                          src={imageUrl(request.problem.img)}
                          alt="content"
                        />
                      </div>
                      <p class="flex items-center">
                        <span>{request.problem.title}</span>
                      </p>
                    </a>
                  </li>
                {/each}
              </ul>
            {:else}
              <div class="bg-white p-4 border">No Requests</div>
            {/if}
          </section>
        </TabItem>
        <TabItem title="Notifications">
          <section id="Feed" class="flex flex-col m-4">
            <NotificationFeedList length={5} />
          </section>
        </TabItem>
      </Tabs>
    </section>
  </div>
{/if}
