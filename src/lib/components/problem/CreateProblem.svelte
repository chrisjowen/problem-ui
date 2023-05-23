<script lang="ts">
  import { goto } from "$app/navigation";
  import api from "$lib/api";
  import { connect } from "$lib/channel/problemsocket";
  import { Button, Modal, Textarea } from "flowbite-svelte";
  import { onMount, onDestroy } from "svelte";
  import { v4 as uuidv4 } from "uuid";


  export let sector : any;
  export let open = true;

  let problem = "";
  let creating = false;
  let trace = uuidv4();
  let channel: any;

  async function onCreateProblem() {
    await api.problem.submit(problem, trace, sector.id);
  }

  onMount(async () => {
    channel = await connect(`problem:uid-${trace}`)
    channel.on("created:problem", (resp) => {
        goto(`/problem/show/${resp.problem_id}`);
    });
  });
  onDestroy(() => {
    channel.leave();
  });

</script>

<Modal bind:open title="Describe Your Problem" size="lg">
  {#if !creating}
    <p class="mx-5 text-gray-400">
      Dont worry about been too detailed, we will help you create the perfect
      problem statement
    </p>

    <div class="m-5">
      <Textarea rows="12" class="mb-5" bind:value={problem} />
      <Button
        class="bg-primary-600 hover:bg-primary-600  w-full"
        on:click={onCreateProblem}>Lets Go!</Button
      >
    </div>
  {:else}
    <h1 class="text-primary-600 text-4xl bold text-center mb-6">
      Analysing Problem
    </h1>

    <p class="text-center mb-5 text-gray-400">
      Let me see if I can make this problem statement more clear, this may take
      up to 30 seconds.
    </p>

    <div class="text-center mt-9">Thinking...</div>
  {/if}
</Modal>
