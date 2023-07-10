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
  import type { PageData } from "./$types";
  import ProblemCard from "$lib/components/problem/new/ProblemCard.svelte";
  import MiniProblemCard from "$lib/components/problem/MiniProblemCard.svelte";

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

  $: filteredProblems = myProblems;

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
      .list(`problem_id[in]=${allProblemIds}|status=requested`, 50, 1, [
        "problem",
      ])
      .then((res) => {
        requested = res.data.entries;
      });
  }
</script>

{#if me}
  <div class="bg-white">
    <section id="MainPane" class="flex-1 overflow-auto">
      <Tabs style="underline" contentClass="p-4">
        <TabItem open title="My Ideas">
          <div
            class="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-4"
          >
            {#each filteredProblems as problem}
              <a href="/idea/{problem.id}/manage">
                <MiniProblemCard {problem} />
              </a>
            {/each}
          </div>
        </TabItem>

        <TabItem title="Profile">
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
            {requested.length} Requests
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
        <!-- <TabItem title="Notifications">
          <section id="Feed" class="flex flex-col m-4">
            <NotificationFeedList length={5} />
          </section>
        </TabItem> -->
      </Tabs>
    </section>
  </div>
{/if}
