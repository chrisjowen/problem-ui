<script>
  let questions = [
    {
      title: "What are the major painpoints you see for the future of the planet?",
      tags: ["eco", "planet", "green"],
      votes: 1,
      answers: 10,
      views: 211,
    },

  ];
</script>
{#each questions as question}
  <div class="flex mb-3 border p-4 bg-white">
    <div class="space-y-2 text-xs ">
      <p>{question.votes} votes</p>
      <p>{question.answers} answers</p>
      <p>{question.views} views</p>
    </div>
    <div class="ml-4">
        <h1 class="text-xl text-primary-600">{question.title}</h1>
        <div class="flex flex-wrap mt-4">
          {#each question.tags as tag}
            <span class="text-xs bg-primary-600 p-2 mr-1 mb-2 inline-block text-white"> {tag} </span>
          {/each}
        </div>
    </div>
  </div>
{/each}
