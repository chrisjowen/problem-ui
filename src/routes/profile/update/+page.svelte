<script lang="ts">
  import { onMount } from "svelte";
  import type { User } from "$lib/types";
  import api from "$lib/api";
  import { auth } from "$lib/store";
  import Gravitar from "$lib/components/shared/Gravitar.svelte";
  import {
    Button,
    Checkbox,
    Input,
    Label,
    Select,
    TabItem,
    Tabs,
    Textarea,
  } from "flowbite-svelte";
  import Editor from "$lib/components/shared/editor/Editor.svelte";
  import TagList from "$lib/components/shared/TagList.svelte";
  import { goto } from "$app/navigation";

  export let user: User = $auth.loggedInUser;

  onMount(loadProfile);

  let profile : any;

  let countries = [
    { value: "us", name: "United States" },
    { value: "sg", name: "Singapore" },
    { value: "ca", name: "Canada" },
    { value: "fr", name: "France" },
  ];

  function loadProfile() {
    api.user.get(user.id, ["profile"]).then((res) => {
      user = res.data;
      profile = user.profile;
    });
  }


  function updateProfile(e: MouseEvent): void {
    api.user.profile(user.id).update(profile.id, profile).then((res) => {
      user = res.data;
      goto(`/profile/me`);
    });
  }
</script>

{#if user && profile}

  <div class=" m-4 space-y-8">
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
        <p class="mt-2 text-xs text-gray-500">Maker blah blah blah</p>
      </div>
    </section>

    <Tabs style="underline" contentClass="m-0">
      <TabItem open title="General">
        <div class="space-y-4">
          <div class=" bg-white rounded-xl p-4 space-y-4 border">
            <Label class="flex items-center mr-4">Interests</Label>
            <TagList bind:tags={profile.interests} />
          </div>
          <div class="space-y-4 p-4 bg-white rounded-xl border">
            <div class="flex">
              <Label class="flex items-center w-[80px] mr-4">Country</Label>
              <Select
                size="sm"
                class="mt-2"
                items={countries}
                bind:value={profile.country}
              />
            </div>
          </div>
          <div class="space-y-4 p-4 bg-white rounded-xl border">
            <div class="flex">
              <Label class="flex items-center w-[80px] mr-4">Twitter</Label>
              <Input size="sm" type="text" bind:value={profile.twitter} />
            </div>
            <div class="flex">
              <Label class="flex items-center w-[80px] mr-4">LinkedIn</Label>
              <Input size="sm" type="text" bind:value={profile.linkedin} />
            </div>
          </div>
          <div class="flex bg-white rounded-xl p-4 space-x-4 border">
            <Checkbox bind:checked={profile.open_to_invites} />
            <Label class="flex items-center mr-4">I Am Open To Invites</Label>
          </div>
        </div>
      </TabItem>
      <TabItem title="Introduction">
        <div class="space-y-4">
          <div class=" bg-white rounded-xl p-4 space-y-4 border">
            <Label>Introduction</Label>
            <div class="bg-white rounded-xl h-[300px] border">
              <Editor simple={true} bind:html={profile.intro} showFullscreen={false} />
            </div>
          </div>
          <div class=" bg-white rounded-xl p-4 space-y-4 border">
            <Label>Greatest Accomplishments</Label>
            <div class="bg-white rounded-xl h-[300px] border">
              <Editor
                simple={true}
                bind:html={profile.accomplishments}
                showFullscreen={false}
              />
            </div>
          </div>
          <div class=" bg-white rounded-xl p-4 space-y-4 border">
            <Label>Anything Else Of Note?</Label>
            <div class="bg-white rounded-xl h-[300px] border">
              <Editor
                simple={true}
                bind:html={profile.anything_else}
                showFullscreen={false}
              />
            </div>
          </div>
        </div>
      </TabItem>
      <TabItem title="Education & Skills">
        <div class="space-y-4">
          <div class="bg-white rounded-xl p-4 space-y-4 border">
            <Label>Education</Label>
            <Textarea bind:value={profile.education} />
          </div>
          <div class="flex bg-white rounded-xl p-4 space-x-4 border">
            <Checkbox bind:checked={profile.technical} />

            <Label class=" items-center  mr-4"
              >I Am Technical (i.e. a scientist, engineer or software developer)</Label
            >
          </div>

          <div class=" bg-white rounded-xl p-4 space-y-4 border">
            <Label class="flex items-center mr-4">Skills</Label>
            <TagList bind:tags={profile.skills} />
          </div>
        </div>
      </TabItem>
    </Tabs>
  </div>

  <div>
    <Button class="m-4"  color="primary" size="lg" on:click={updateProfile}>
      Save
    </Button>
  </div>
{/if}
