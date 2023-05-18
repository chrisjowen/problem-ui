<script>
  import { Card, Heading, P } from "flowbite-svelte";

  export let persona = {
    name: "John Smith",
    age: 41,
    bio: "John is a software developer with around two decades of experience. ",
    painPoints: "John is a established software developer with around two decades of experience. John is a established software developer with around two decades of experience. John is a established software developer with around two decades of experience. John is a established software developer with around two decades of experience. He struggles to do the right thing",
    gender: "MALE",
    avatar: "https://placebeard.it/640x260",
  };
</script>

<Card class=" bg-primary-50" size="full" padding="none">
  <img src={persona.avatar} alt={persona.name}  class="rounded-t-md" />

    <div class="m-3">
          <h1 class="text-xl mb-3 mt-4 text-primary-600">John Smith</h1>
          <P class="mb-4">{persona.age} years old - {persona.gender}</P>
      
          <h1 class="text-xl mb-3 mt-4 text-bold text-primary-600">Bio</h1>
          <P class="mb-4">{persona.bio}</P>
      
          <h1 class="text-xl mb-3 mt-4 text-primary-600">Paint Points</h1>
          <P class="mb-4">{persona.painPoints}</P>
    </div>
      
</Card>
