<script lang="ts">
  import Editor from "$lib/components/shared/editor/Editor.svelte";
  import { Button, Input, Label, Modal, Select } from "flowbite-svelte";
  import { createEventDispatcher } from "svelte";
  export let open = false;

  let dispatch = createEventDispatcher();

  let capacities = [
    { value: "Technical Contributor", name: "Technical Contributor" },
    { value: "Non Technical Contributor", name: "Non Technical Contributor" },
    { value: "Beta Tester", name: "Beta Tester" },
    { value: "Industry Expert", name: "Industry Expert" },
  ];

  let form = {
    capacity: "",
    message: "",
  };

  let onContribute = () => {
    debugger
    dispatch("contribute", form);
  };
</script>

<Modal bind:open class="w-full" size="xl" title="Request To Contribute">

  <Label class="block mb-2">Capacity</Label>
  <Select bind:items={capacities} bind:value={form.capacity} required />

  <Label class="block mb-2">Message To Solvers</Label>
  <div class="h-[300px] border">
    <Editor bind:html={form.message} simple={true} />
  </div>

  <Button class="mt-4" on:click={onContribute}>Submit Request</Button>
</Modal>
