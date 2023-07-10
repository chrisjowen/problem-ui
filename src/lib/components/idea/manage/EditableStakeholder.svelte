<script lang="ts">
  import { imageUrl } from "$lib/util/imageutil";
  import type { Stakeholder } from "$lib/types";
  import { Button, Input, Label, Select, Textarea } from "flowbite-svelte";
  import { createEventDispatcher } from "svelte";
  import TagList from "../../shared/TagList.svelte";
  import SelectMany from "../../shared/SelectMany.svelte";
  import ItemsList from "$lib/components/shared/ItemsList.svelte";
  import ImageUploadModal from "$lib/components/shared/ImageUploadModal.svelte";

  let dispatch = createEventDispatcher();

  export let stakeholder: Stakeholder = {
    img: "",
    type: "",
    description: "",
    problems: [],
    age_from: 0,
    age_to: 99,
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

  let socioEconomics = ["Working class", "Middle class", "Upper class"].map(
    (r) => ({ value: r, name: r })
  );

  function onSave() {
    dispatch("save", stakeholder);
  }

  let showImageUplodModal = false;

  function onImageUploaded(e: CustomEvent<any>): void {
    stakeholder.img = e.detail.path;
  }
</script>

<ImageUploadModal
  bind:open={showImageUplodModal}
  on:imageUploaded={onImageUploaded}
/>

<div class="flex flex-col h-full">
  {#if stakeholder}
    <section class="md:p-2 flex-1 overflow-auto md:space-y-2">
      <slot />
      <div class="border bg-white p-4 space-y-4">
        <h1 class="text-lg font-bold">Stakeholder Details</h1>
     
        <Label class="block mb-2"> Name/Type </Label>
        <Input type="text" bind:value={stakeholder.type} />

        <Label class="block mb-2"> Image</Label>
        <button on:click={() => showImageUplodModal = true}>
          <img
            src={stakeholder.img
              ? imageUrl(stakeholder.img)
              : "/img/avatar.png"}
            alt={stakeholder.type}
            class="w-[100px] h-[100px] border"
          />
        </button>
        <Label class="block mb-2"> Description</Label>
        <Textarea class="h-[100px]" bind:value={stakeholder.description} />
      </div>

      <div class="border bg-white p-4 ">
        <h1 class="text-lg font-bold mb-4">Stakeholder Specific Problems</h1>
        <ItemsList
          icon="fas fa-exclamation-triangle  text-orange-400"
          bind:items={stakeholder.problems}
        />
      </div>

      <div class="border bg-white p-4 space-y-4 mb-9">
        <h1 class="text-lg font-bold">Demographics</h1>

        <Label class="block mb-2">Gender</Label>
        <Select items={genders} type="text" bind:value={stakeholder.gender} />

        <Label class="block mb-2">Ethnicities</Label>
        <SelectMany items={races} bind:selected={stakeholder.races} />

        <Label class="block mb-2">Education</Label>
        <Input type="text" bind:value={stakeholder.education} />

        <Label class="block mb-2">SocioEconomics</Label>
        <SelectMany
          items={socioEconomics}
          bind:selected={stakeholder.socioEcenomics}
        />

        <Label class="block mb-2">Interests</Label>
        <TagList editable={true} bind:tags={stakeholder.interests} />
      </div>
    </section>

    <div class="p-2 bg-gray-50 border-t-[1px] z-30 flex justify-end">
      <Button size="xs" on:click={onSave}>
        <i class="fas fa-save mr-2" />
        Save
      </Button>
    </div>
  {/if}
</div>
