<script>
  import Saos from "saos";
  import { Button } from "flowbite-svelte";
  import { goto } from "$app/navigation";

  let features = [
    {
      title: "Manage & Invite Contibuters",
      overview:
        "Bring in your team or use our upcoming expert marketplace to find the right people to help you solve your problem.",
      icon: "fa fa-user-plus ",
    },
    {
      title: "Sector & Industry News",
      overview:
        "Stay up to date with the latest news and trends in your sector and industry.",
      icon: "fas fa-newspaper",
    },
    {
      title: "Team Discussions",
      overview:
        "Collaborate with your team and other experts to solve startup problems.",
      icon: "fa-solid fa-comment",
    },
    {
      title: "Resource Library",
      overview:
        "Keep all your important links, documents and other resources in one fully searchable place.",
      icon: "fa fa-link",
    },
    {
      title: "Collaborative Notes & Pages",
      overview:
        "Document you important findings and share them with the rest of the team",
      icon: "fas fa-file",
    },
    {
      title: "Market Analisys",
      coming: true,

      overview:
        "Streamline the process of gathering and analyzing data from various sources, enabling you to effortlessly identify and comprehend your competition landscape",
      icon: "fa-brands fa-product-hunt",
    },
    {
      title: "Customer Insights",
      coming: true,

      overview:
        "Get insights from your customers and other experts with automatic stakeholder personas and questionnaire generated for you. ",
      icon: "fa-solid fa-people-arrows",
    },
    {
      title: "SCOR",
      coming: true,
      overview:
        "Keep track of your Strengths, Challenges, Opportunities, Risks.",
      icon: "fa-solid fa-border-all",
    },
  ];
</script>

<div class="max-w-[1000px] m-auto">
  <h2 class="text-2xl md:mb-4 py-4 text-gray-800">Features:</h2>

  {#each features as feature}
    <Saos animation={"slide-in-bottom 0.9s both"} once={true}>
      <div class="flex border bg-white relative p-8 rounded-lg mb-2">
        {#if feature.coming}
          <div class="flex justify-end mt-4 absolute md:top-0 md:right-5 right-[5px] top-[-10px]">
            <p
              class="bg-gray-400 text-white inline text-xs p-1 px-2 rounded-lg"
            >
              Coming Soon
            </p>
          </div>
        {/if}
        <div>
          <div
            class="rounded-full bg-primary-700 md:w-[60px] md:h-[60px] w-[50px] h-[50px] text-gray-100 text-center flex items-center justify-center"
          >
            <i class="{feature.icon} text-xl md:text-2xl" />
          </div>
        </div>
        <div class="md:px-8 px-4 flex-1">
          <h2 class="md:text-2xl text-xl">{feature.title}</h2>

          <p class="text-sm md-text-md">
            {@html feature.overview}
          </p>
        </div>
      </div>
    </Saos>
  {/each}

  <div class="py-4">
    <Button class="w-full" size="xl" on:click={() => goto("/problem")} >
      <i class="fas fa-rocket mr-2" />
      Create Your SolveSpace
    </Button>
  </div>
</div>
