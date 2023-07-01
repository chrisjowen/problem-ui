<script lang="ts">
  import type { Stakeholder } from "$lib/types";
  import { Button, Input, Label, Select, Textarea } from "flowbite-svelte";
  import { createEventDispatcher } from "svelte";
  import TagList from "../shared/TagList.svelte";
  import { editable } from "svelte-tiptap";
  import SelectMany from "../shared/SelectMany.svelte";
  let dispatch = createEventDispatcher();

  export let stakeholder: Stakeholder = {
    img: "",
    type: "",
    description: "",
    problems: [],
    age_from: null,
    age_to: null,
    regions: [],
    gender: "",
    benefits: "",
    professions: [],
    interests: [],
    education: "",
    races: [],
    socioEcenomics: [],
  };

  let genders = [
    { value: "Male", name: "Male" },
    { value: "Female", name: "Female" },
    { value: "Other", name: "Other" },
    { value: "All", name: "All" },
  ];

  let races = [
    "Hispanic or Latino",
    "American Indian",
    "Asian (Chinese, Filipino, Japanese, Korean, Vietnamese, Other Asian)",
    "Asian Indian",
    "Black or African American",
    "Native Hawaiian or Other Pacific Islander",
    "White",
  ].map((r) => ({ value: r, name: r }));


  let socioEconomics = [
    "Working class",
    "Middle class",
    "Upper class",
  ].map((r) => ({ value: r, name: r }));


  async function onSave() {
    dispatch("save", stakeholder);
  }
</script>

<div class=" m-4">
  {#if stakeholder}

    <section class="space-y-2">
      <div class="border bg-white p-4 space-y-4">
        <h1 class="text-lg font-bold">Details</h1>

        <Label class="block mb-2">Type</Label>
        <Input type="text" bind:value={stakeholder.type} />
        <Label class="block mb-2">Description</Label>
        <Input type="text" bind:value={stakeholder.description} />
        <Label class="block mb-2">Benefits</Label>
        <Textarea class="h-[200px]" bind:value={stakeholder.benefits} />
        <Label class="block mb-2">Interests</Label>
        <TagList editable={true} bind:tags={stakeholder.interests} />
      </div>

     
  
      <div class="border bg-white p-4 space-y-4">
        <h1 class="text-lg font-bold">Demographics</h1>

        <Label class="block mb-2">Gender</Label>
        <Select items={genders} type="text" bind:value={stakeholder.gender} />

        <Label class="block mb-2">Races</Label>
        <!-- svelte-ignore missing-declaration -->
        <SelectMany items={races} bind:selected={stakeholder.races} />

        <Label class="block mb-2">Education</Label>
        <Input type="text"  bind:value={stakeholder.education} />

        <Label class="block mb-2">SocioEconomics</Label>
        <SelectMany items={socioEconomics} bind:selected={stakeholder.socioEcenomics} />
      </div>

  

      

     
    </section>

    <div class="flex justify-end mt-4 z-30 relative">
      <Button size="xs" class="bg-primary-400 mb-4" on:click={onSave}>
        <i class="fas fa-save mr-2" />
        Save Stakeholder
      </Button>
    </div>
  {/if}
</div>
