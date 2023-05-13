<script>
  // import { Alert } from 'flowbite-svelte';
  import {
    Label,
    Button,
    Textarea,
    Input,
    Checkbox,
    Select,
  } from "flowbite-svelte";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  let who = {
    description: "",
    job: "",
    demographicsImportant: false,
    demographics: {
      ageRange: [-1, -1],
      gender: "Any",
      group: "",
      socioEconomic: "Any",
    },
  };

  let genders = [
    { value: "Male", name: "Male" },
    { value: "Female", name: "Female" },
    { value: "Any", name: "Any" },
  ];

  let socioEconomics = [
    { name: "Any", value: "Any" },
    { name: "Impovireshed", value: "Impovireshed" },
    { name: "Working Class", value: "Working" },
    { name: "Middle Income", value: "Middle" },
    { name: "High Net Individuals", value: "HNW" },
    { name: "Ultra High Net Individuals", value: "UHNW" },
  ];

  function onSubmit() {
    dispatch("change", who);
  }
</script>

<div>
  <div class="mb-4">
    <Label for="who" class="mb-2">Job Or Function</Label>
    <Input
      id="job"
      type="text"
      bind:value={who.job}
      placeholder="Job or function "
      required
    />
  </div>

  <div class="mb-4">
    <Label for="who" class="mb-2">Description</Label>
    <Textarea
      rows="4"
      id="who"
      bind:value={who.description}
      placeholder="Brifely describe the persona of the pers are effected by this problem"
      required
    />
  </div>

  <div class="p-4 bg-indigo-100 mb-4">
    <Checkbox id="job" bind:checked={who.demographicsImportant} required>
      Demographics Are Important
    </Checkbox>
  </div>

  {#if who.demographicsImportant == true}
    <div class="mb-4">
      <Label for="age_from" class="mb-2">Age Range</Label>
      <div class="grid gap-6 mb-6 md:grid-cols-2">
        <div>
          <Input
            type="number"
            id="age_from"
            bind:value={who.demographics.ageRange[0]}
            required
          />
        </div>
        <div>
          <Input
            type="number"
            id="age_to"
            bind:value={who.demographics.ageRange[1]}
            required
          />
        </div>
      </div>
    </div>

    <div class="mb-4">
      <Label for="gender" class="mb-2">Gender</Label>
      <Select
        id="gender"
        class="mt-2"
        items={genders}
        bind:value={who.demographics.gender}
      />
    </div>

    <div class="mb-4">
      <Label for="socioEconomics" class="mb-2">Socio Economics</Label>
      <Select
        id="socioEconomics"
        class="mt-2"
        items={socioEconomics}
        bind:value={who.demographics.socioEconomic}
      />
    </div>

    <div class="mb-4">
      <Label for="group" class="mb-2">Any other group identifier</Label>
      <Input
        type="text"
        id="group"
        bind:value={who.demographics.group}
      />
    </div>
  {/if}

  <Button on:click={onSubmit}>Test</Button>
</div>
