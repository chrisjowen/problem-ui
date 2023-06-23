<script lang="ts">
  import Gravitar from "../shared/Gravitar.svelte";
  import type { User } from "$lib/types";
  import { goto } from "$app/navigation";
  import { Button } from "flowbite-svelte";
  import { auth } from "$lib/store";
  import Editor from "../shared/editor/Editor.svelte";
  import { bind } from "svelte/internal";
  import TagList from "../shared/TagList.svelte";
  export let editable = true;
  export let user: User;

  $: profile = user.profile;
</script>

{#if user.id == $auth.loggedInUser.id && editable}
  <div class="flex justify-end">
    <Button size="xs" color="light" on:click={() => goto("/profile/update")}>
      Update Profile
      <i class="fa fa-edit ml-2" />
    </Button>
  </div>
{/if}

<div class=" m-4">
  <section id="UserOverview" class="flex">
    <div class=" mr-8">
      <Gravitar {user} className="rounded-lg" size="lg" />
    </div>
    <div class="flex-1">
      <h1 class=" text-xl text-primary-600 font-bold mt-3">
        {user.name}
        {user.last_name}
      </h1>
      <p class="font-bold">@{user.username}</p>
      <p class="mt-2 text-xs text-gray-500">{user.tagline}</p>
    </div>
  </section>

  {#if profile}
    <section id="Overview" class="space-y-4 mt-4">
      <div class="text-sm">
        <p>Twitter: {profile.twitter}</p>
        <p>LinkedIn: {profile.linkedin}</p>
      </div>

      <div class="grid grid-cols-3 gap-4">
        <div class=" border p-4 bg-white rounded-xl text-center">
          <p>{profile.country}</p>
        </div>
        <p class="bg-white border p-4 rounded-xl text-center">
          {#if profile.technical}
            <i class="fa fa-check text-green-500 mr-2" />
          {:else}
            <i class="fa fa-close text-red-500 mr-2" />
          {/if}

          Technical
        </p>

        <p class=" bg-white border p-4 rounded-xl text-center">
          {#if profile.open_to_invites}
            <i class="fa fa-check text-green-500 mr-2" />
          {:else}
            <i class="fa fa-close text-red-500 mr-2" />
          {/if}

          Open For Invites
        </p>
      </div>

      <div class=" max-w-none border p-4 bg-white rounded-xl">
        <h2 class="text-xl font-bold">Introduction</h2>
        <div class="p-2">
          <Editor bind:html={profile.intro} editable={false} />
        </div>
      </div>

      <div class=" max-w-none border p-4 bg-white rounded-xl">
        <h2 class="text-xl font-bold mb-4">Skills</h2>
        <TagList tags={profile.skills} editable={false} />
      </div>

      <div class=" max-w-none border p-4 bg-white rounded-xl">
        <h2 class="text-xl font-bold mb-4">Interests</h2>
        <TagList tags={profile.interests} editable={false} />
      </div>

      <div class=" max-w-none border p-4 bg-white rounded-xl">
        <h2 class="text-xl font-bold">Greatest Accomplishments</h2>
        <div class="p-2">
          <Editor bind:html={profile.accomplishments} editable={false} />
        </div>
      </div>

      <div class=" max-w-none border p-4 bg-white rounded-xl">
        <h2 class="text-xl font-bold">Education</h2>
        <p class="p-2">{ profile.education}</p>
      </div>

      <div class=" max-w-none border p-4 bg-white rounded-xl">
        <h2 class="text-xl font-bold">Anything Else Of Note?</h2>
        <div class="p-2">
          <Editor bind:html={profile.anything_else} editable={false} />
        </div>
      </div>

      <!-- 
        field :accomplishments, :string
        field :anything_else, :string
        field :country, :string
        field :hightst_education, :string
        field :interests, {:array, :string}, default: []
        field :languages, {:array, :map}, default: []
        field :intro, :string
        field :linkedin, :string
        field :open_to_invites, :boolean, default: true
        field :skills, {:array, :string}, default: []
        field :start_working, :naive_datetime
        field :technical, :boolean, default: false
        field :twitter, :string -->
    </section>
  {/if}
</div>
