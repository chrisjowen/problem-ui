<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { Button } from "flowbite-svelte";
  import UserList from "$lib/components/user/UserList.svelte";
  import { auth } from "$lib/store";
  import { goto } from "$app/navigation";
  import ProblemLayout from "$lib/components/problem/ProblemLayout.svelte";
  import api from "$lib/api";
  import LatestComments from "$lib/components/comments/LatestComments.svelte";
  import type { PaginationResults, Comment } from "$lib/types";
  import LinksList from "$lib/components/links/LinksList.svelte";
  import LatestDiscussions from "$lib/components/discussion/LatestDiscussions.svelte";
  import { PUBLIC_IMG_CDN_BASE } from "$env/static/public";
  import ObstacleList from "$lib/components/obstacles/ObstacleList.svelte";
  import { isMember } from "$lib/util/authUtil";
  import FeedList from "$lib/components/problem/FeedList.svelte";
  import Editor from "$lib/components/shared/editor/Editor.svelte";
  import { imageUrl } from "$lib/util/imageutil";
  import EntityOverview from "$lib/components/shared/EntityOverview.svelte";

  let problem: any = null;
  let comments: PaginationResults<Comment>;
  let loggedInUser: any;
  let problemId = $page.params.id;
  let reload: (force: boolean) => void;

  onMount(() => {
    loggedInUser = $auth.loggedInUser;
  });

  function onUpdateProblemStatement() {
    api.problem.update(problemId, { overview: problem.overview });
  }
</script>

<ProblemLayout bind:problem bind:reload>
  {#if problem}
    <div class="flex md:mt-4 items-start">
      <section class="xl:max-w-[940px] mx-auto md:mx-4 md:rounded-t-lg">
        {#if problem.pinned_note && problem.pinned_note != ""}
          <div class="p-4 bg-primary-100 mb-4 rounded-lg">
            <i class="fas fa-info-circle mr-2"></i>

            {@html problem.pinned_note}
          </div>
        {/if}

        <div class="md:border md:rounded-lg bg-white">
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
              background: black url('{imageUrl(
                problem.banner_image || problem.img
              )}');
              background-size: cover;  
              background-position: center;
              background-repeat: no-repeat;
              filter: brightness(0.7) grayscale(100%);
            "
            />

            <div class="flex items-center flex-row w-full md:m-9">
              <img
                src="{PUBLIC_IMG_CDN_BASE}{problem.img}"
                alt={problem.title}
                class="w-[250px] h-[250px] block md:inline-block m-auto md:float-left drop-shadow-xl"
              />
            </div>
          </div>

          <div class="p-8">
            <div class="flex">
              <div class="flex-1">
                <EntityOverview entity={problem} />
              </div>
              {#if isMember(problem)}
                <div>
                  <Button
                    color="light"
                    size="xs"
                    on:click={() => goto(`${problem.id}/update`)}>Edit</Button
                  >
                </div>
              {/if}
            </div>
            <div class="my-9 p-4 bg-gray-50 text-gray-700">
              <div class="flex">
                <div class="mr-4">
                  <i class="fa-solid fa-atom text-4xl" />
                </div>
                <div class="flex-1 flex items-center">
                  <h1 class="text-2xl font-bold">{problem.title}</h1>
                </div>
              </div>
              <p class="p-4">
                {problem.blurb}
              </p>
            </div>
            <Editor editable={false} html={problem.overview} />
          </div>
        </div>
        <div class="bg-white p-2 mt-2 md:rounded-md lg:border lg:mb-8">
          <LatestComments type="problem" />
        </div>
      </section>
      <section class="flex-1 hidden xl:block mr-4">
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
          <FeedList {problem} length={4} />
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
            <a
              href="/problem/show/{problemId}/users"
              class="text-xs text-blue-500">All Followers</a
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
          <h1 class="mb-4 text-xl text-gray-800">Discussions</h1>
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

        <div class="hidden">
          <h1 class="mb-4 text-xl text-gray-800">Risks</h1>
          <ObstacleList
            api={api.problem.obstacles(problemId)}
            id={problemId}
            length={4}
          />
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
