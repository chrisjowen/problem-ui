<script lang="ts">
  import api from "$lib/api";
  import MultiSectorSearchSelect from "$lib/components/sector/MultiSectorSearchSelect.svelte";
  import type { Idea, PaginationResults, Sector, User } from "$lib/types";
  import { onMount } from "svelte";
  import _ from "lodash";
  import { Button, Label } from "flowbite-svelte";
  import IdeaOverview from "$lib/components/idea/IdeaOverview.svelte";
  import LatestComments from "$lib/components/comments/LatestComments.svelte";
  import VoteButton from "$lib/components/vote/VoteButton.svelte";
  import UserList from "$lib/components/user/UserList.svelte";
  import { goto } from "$app/navigation";
  import TagSearch from "$lib/components/shared/TagSearch.svelte";

  onMount(load);

  let voters: User[] = [];

  let filters = {
    sectors: [],
    tags: [],
    skills: [],
  } as {
    sectors: Sector[];
    tags: string[];
    skills: string[];
  };

  let allTags: string[] = [];
  let allSkills : string[] = [];
  let showFilters = false;
  let ideaIdx = 0;
  let selectedIdea: Idea | null = null;

  let ideas: PaginationResults<Idea>;

  function load() {
    loadIdeas();
    api.ideas.tags().then((res) => {
      allTags = res.data;
    });
    api.ideas.skills().then((res) => {
      allSkills = res.data;
    });
  }

  function loadIdeas() {
    ideaIdx = 0;
    var q = "";
    q = filters.tags.length > 0 ? `tags[list]=${filters.tags.join(",")}` : q;
    q =
      filters.skills.length > 0
        ? `skills[list]=${filters.skills.join(",")}`
        : q;

    let params = {
      page: 1,
      pageSize: 200,
      qs: {
        sectors: filters.sectors.map((s) => s.id).join(","),
      },
      query: q,
      preloads: ["sectors"],
    };

    api.ideas.search(params).then((res) => {
      ideas = res.data;
      if (ideas.entries.length > 0) {
        selectedIdea = ideas.entries[0];
      } else {
        selectedIdea = null;
      }
    });
  }

  $: {
    if (filters.sectors) {
      loadIdeas();
    }
  }

  function onSectorClicked(e: CustomEvent<Sector>): void {
    let sector: Sector = e.detail;
    if (filters.sectors.find(s => s.id== sector.id)) {
      filters.sectors = filters.sectors.filter((s) => s.id != sector.id);
    } else {
      filters.sectors = [...filters.sectors, sector];
    }
  }

  function toggleTag(e: CustomEvent<string>): void {
    let tag = e.detail;
    if (filters.tags.includes(tag)) {
      filters.tags = filters.tags.filter((t) => tag != t);
    } else {
      filters.tags = [...filters.tags, tag];
    }
  }

  function toggleSkill(e: CustomEvent<string>): void {
    let skill = e.detail;
    if (filters.skills.includes(skill)) {
      filters.skills = filters.skills.filter((t) => skill != t);
    } else {
      filters.skills = [...filters.skills, skill];
    }
  }

  function onSelectNextIdea() {
    let nextIdx = ideaIdx + 1;
    if (nextIdx > ideas.entries.length - 1) {
      return;
    }
    ideaIdx = nextIdx;
    selectedIdea = ideas.entries[ideaIdx];
  }

  function onSelectPreviousIdea() {
    let nextIdx = ideaIdx - 1;
    if (nextIdx < 0) {
      return;
    }
    ideaIdx = nextIdx;
    selectedIdea = ideas.entries[ideaIdx];
  }
</script>

<div class="flex flex-col h-full">
  <!-- <div class="relative bg-gray-600">
    <div class="flex justify-end">
      <button
        on:click={() => (showFilters = !showFilters)}
        class="p-4 {showFilters
          ? 'text-primary-700 bg-white'
          : 'hover:text-primary-200'} text-gray-100 group"
      >
        <h1>
          <i class="fa fa-filter mr-1" />
          Filter
        </h1>
      </button>
    </div>

    {#if showFilters}
      <div
        class="absolute bg-white border-b-[1px] z-20 drop-shadow-lg p-8 space-y-4 w-full"
      >
        <Label class="mb-2">Sectors</Label>
        <MultiSectorSearchSelect bind:selected={filters.sectors} />

        <Label class="mb-2">Tags</Label>
        <TagSearch bind:selected={filters.tags} bind:tags={allTags} />

        <Label class="mb-2">Skills</Label>
        <TagSearch bind:selected={filters.skills} bind:tags={allSkills} />
      </div>
    {/if}
  </div> -->
  {#if ideas}
    <div class="flex flex-1 overflow-auto">
      <section id="results" class="border-r-[1px] flex-1 bg-white">
        <div class="flex justify-end bg-gray-100">
          <button
            on:click={() => (showFilters = !showFilters)}
            class="p-4 {showFilters
              ? 'text-primary-700 bg-white'
              : 'hover:text-primary-700'} text-gray-800 group"
          >
            <h1>
              <i class="fa fa-filter mr-1" />
              Filter
            </h1>
          </button>
        </div>
        {#if showFilters}
          <div class=" bg-white border-b-[1px] z-20 p-8 space-y-4 w-full">
            <Label class="mb-2">Sectors</Label>
            <MultiSectorSearchSelect bind:selected={filters.sectors} />

            <Label class="mb-2">Tags</Label>
            <TagSearch bind:selected={filters.tags} bind:tags={allTags} />

            <Label class="mb-2">Skills</Label>
            <TagSearch bind:selected={filters.skills} bind:tags={allSkills} />
          </div>
        {/if}
        <div class="flex mb-4 p-4">
          <div >
            <Button
              class="flex items-center "
              color="light"
              size="xs"
              on:click={onSelectPreviousIdea}
            >
              <i class="fa fa-chevron-left mr-2" />

              Last
              <i class="fa fa-lightbulb text-yellow-400 ml-2" />
            </Button>
          </div>
          <div class="flex-1 text-center">
            {ideaIdx + 1} of {ideas.entries.length}
          </div>

          <div>
            <Button
              class="flex items-center "
              color="light"
              size="xs"
              on:click={onSelectNextIdea}
            >
              <i class="fa fa-lightbulb text-yellow-400 mr-2" />
              Next
              <i class="fa fa-chevron-right ml-2" />
            </Button>
          </div>
        </div>
        {#if selectedIdea}
          <IdeaOverview
            {filters}
            idea={selectedIdea}
            on:tag-clicked={toggleTag}
            on:skill-clicked={toggleSkill}
            on:sector-clicked={onSectorClicked}
          >
            <div class="  mx-4">
              <div class="flex space-x-2">
                <Button
                  class="w-full"
                  size="xs"
                  on:click={() => goto(`/problem/create/${selectedIdea.id}`)}
                >
                  <i class="fa-solid fa-rocket mr-2" />
                  Create SolveSpace
                </Button>
                <VoteButton
                  classNames="w-full"
                  type="ideas"
                  id={selectedIdea.id}
                  bind:voters
                />
              </div>
            </div>
          </IdeaOverview>
        {/if}
      </section>
      <section class="flex-1 w-full overflow-auto h-full hidden xl:block">
        {#if selectedIdea}
          <div
            class="bg-primary-50 border-b-[1px] p-4 space-y-4 text-gray-700 text-center"
          >
            <img src="/img/ai.png" class="w-[100px] m-auto" alt="ai" />

            <h1 class="text-3xl mb-2 text-center">Want To Solve This Idea?</h1>
            <p>
              Create a SolveSpace, bring in your team or others from the
              community and start building the next unicorn
            </p>

            <div class="flex justify-end">
              <Button
                class="m-auto"
                on:click={() => goto(`/problem/create/${selectedIdea.id}`)}
              >
                <p><i class="fa fa-rocket mr-2 block" /></p>

                Create SolveSpace
              </Button>
            </div>
          </div>

          <div class="m-4">
            <h1 class="my-4 text-lg">Votes</h1>
            <div class="mb-4 p-4 bg-white border">
              <UserList users={voters} classNames="rounded-md mr-1" size="sm" />
            </div>

            <h1 class="my-4 text-lg">Comments</h1>

            <div class=" border bg-white mt-4 p-4">
              <LatestComments
                type="ideas"
                id={selectedIdea.id}
                showCommentForm={true}
              />
            </div>
          </div>
        {:else}
          <div class="border p-4 bg-white m-4 text-center">
            <img src="/img/ai.png" class="w-[100px] m-auto" alt="ai" />

            <p>No ideas found, try reducing your filters</p>
          </div>
        {/if}
      </section>
    </div>
  {/if}
</div>
