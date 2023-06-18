<script lang="ts">
  import { onMount } from "svelte";
  import EditableTextArea from "$lib/components/shared/EditableTextArea.svelte";
  import { page } from "$app/stores";
  import { Button } from "flowbite-svelte";
  import UserList from "$lib/components/shared/UserList.svelte";
  import { auth } from "$lib/store";
  import { goto } from "$app/navigation";
  import ProblemLayout from "$lib/components/problem/ProblemLayout.svelte";
  import api from "$lib/api";
  import LatestComments from "$lib/components/shared/comments/LatestComments.svelte";
  import type { PaginationResults, Comment } from "$lib/types";
  import LinksList from "$lib/components/shared/links/LinksList.svelte";
  import LatestDiscussions from "$lib/components/shared/discussions/LatestDiscussions.svelte";
  import { PUBLIC_IMG_CDN_BASE } from "$env/static/public";
  import ObstacleList from "$lib/components/shared/obstacles/ObstacleList.svelte";
  import { isMember } from "$lib/util/authUtil";
  import InviteContributor from "$lib/components/problem/InviteContributor.svelte";
  import FeedList from "$lib/components/problem/FeedList.svelte";

  let problem: any = null;
  let comments: PaginationResults<Comment>;
  let loggedInUser: any;
  let problemId = $page.params.id;
  let reload: (force: boolean) => void;

  onMount(() => {
    loadComments();
    loggedInUser = $auth.loggedInUser;
  });

  function onUpdateProblemStatement() {
    api.problem.update(problemId, { overview: problem.overview });
  }
  $: following = problem?.followers?.some(
    (f: any) => f.id === loggedInUser?.id
  );
  async function onFollow() {
    if (!loggedInUser) {
      goto("/login");
    } else {
      await api.problem.follow(problem.id);
      reload(true);
    }
  }

  async function onUnFollow() {
    if (!loggedInUser) {
      goto("/login");
    } else {
      await api.problem.unfollow(problem.id);
      reload(true);
    }
  }

  function loadComments() {
    api.problem
      .comments(problemId)
      .list("", 4, 0, ["user"])
      .then((res) => {
        comments = res.data;
      });
  }

  function onInviteContributer() {}
</script>

<ProblemLayout bind:problem bind:reload>
  {#if problem}

    <div class="flex md:mt-4 items-start">
      <section class="xl:max-w-[940px] mx-auto md:mx-4 md:rounded-t-lg ">
        <div class="md:border md:rounded-lg bg-white md:mb-4">
          <div class="relative text-gray-400 sm:flex md:rounded-t-lg">
            <div
              class=" md:rounded-t-lg"
              style="
              position: absolute;
              width:100%;
              top:0; 
              left:0
              right:0;
              bottom:0;
              background: black url('{PUBLIC_IMG_CDN_BASE}{problem.img}');
              background-size: cover;  
              background-position: center;
              background-repeat: no-repeat;
              filter: brightness(0.7) grayscale(100%);
            "
            />

            <div class="md:p-4 p-2 z-30 md:mb-8">
              <img
                src="{PUBLIC_IMG_CDN_BASE}{problem.img}"
                alt={problem.title}
                class="sm:w-[150px] w-[70%] border md:rounded-xl block md:inline-block md:mb-5 md:mb-0 m-auto md:float-left drop-shadow-xl"
              />
            </div>
            <div class="flex-1">
              <div
                class=" sm:m-4 p-4 relative z-30 bg-white md:rounded-xl drop-shadow-lg"
              >
                <h1
                  class="text-3xl text-primary-900 font-bold mb-4 bg-blue-100 inline-block p-2 relative"
                >
                  {problem.title}
                </h1>
                <p class="mb-4 text-gray-700">
                  {problem.blurb.slice(0, 200)}...
                </p>

                <div class="flex space-x-2 justify-end mt-4">
                  <Button
                    size="xs"
                    class="w-full md:w-auto "
                    on:click={following ? onUnFollow : onFollow}
                    color="light"
                  >
                    <i
                      class="  {!following
                        ? 'fas fa-user-plus '
                        : 'fa fa-check text-green-500'} mr-2"
                    />
                    {following ? "Following" : "Follow"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <EditableTextArea
            bind:input={problem.overview}
            owner={problem.user}
            editable={isMember(problem)}
            let:editing
            on:save={onUpdateProblemStatement}
            height="350px"
          />
        </div>
        <div class="bg-white p-2 md:rounded-md lg:border lg:mb-8">
          <LatestComments
            pagination={comments}
            on:created={loadComments}
            type="problem"
          />
        </div>
      </section>
      <section class="flex-1 hidden xl:block mr-4 ">
        <div class="mb-4">
          <h1 class="mb-4 text-xl text-gray-800">Contributers</h1>
          <UserList placeholder="No Followers" users={problem.users} />
          <div class="flex justify-end m-2">
            <a href="./{problemId}/users" class="text-xs text-blue-500"
              >All Contributers</a
            >
          </div>
        </div>

        <div class="mb-4">
          <h1 class="mb-4 text-xl text-gray-800">Activity</h1>
          <FeedList problem={problem} length={4} />
          <div class="flex justify-end m-2">
            <a href="./{problemId}/users" class="text-xs text-blue-500"
              >All Activity</a
            >
          </div>
        </div>

        <div class="mb-4">
          <h1 class="mb-4 text-xl text-gray-800">Followers</h1>
          <UserList placeholder="No Followers" users={problem.followers} />
          <div class="flex justify-end m-2">
            <a href="/problem/show/{problemId}/users" class="text-xs text-blue-500"
              >All Followers</a
            >
          </div>
        </div>
        <div class="mb-4">
          <h1 class="mb-4 text-xl text-gray-800">Resources</h1>
          <LinksList api={api.problem.links(problemId)} pageSize={4} />
          <div class="flex justify-end m-2">
            <a href="./{problemId}/links" class="text-xs text-blue-500"
              >All Resources</a
            >
          </div>
        </div>

        <div class="">
          <h1 class="mb-4 text-xl text-gray-800">Discssions</h1>
          <LatestDiscussions
            api={api.problem.discussion(problemId)}
            id={problemId}
          />
          <div class="flex justify-end m-2">
            <a href="./{problemId}/discussion" class="text-xs text-blue-500"
              >All Discussions</a
            >
          </div>
        </div>

        <div class="">
          <h1 class="mb-4 text-xl text-gray-800">Risks</h1>
          <ObstacleList api={api.problem.obstacles(problemId)} id={problemId} length={4} />
          <div class="flex justify-end m-2">
            <a href="./{problemId}/obstacles" class="text-xs text-blue-500"
              >All Risks</a
            >
          </div>
        </div>
      </section>
    </div>
  {/if}
</ProblemLayout>
