<script>
  import { Card, Heading, P } from "flowbite-svelte";

  export let persona = {
    name: "John Smith",
    age: 41,
    bio: "John is a established software developer with around two decades of experience. He struggles to do the right thing",
    painPoints: "John is a established software developer with around two decades of experience. John is a established software developer with around two decades of experience. John is a established software developer with around two decades of experience. John is a established software developer with around two decades of experience. He struggles to do the right thing",
    gender: "MALE",
    avatar: "https://placebeard.it/640x260",
  };
</script>

<div class="m-4 p-4 bg-primary-50">
    <div>
        <img src={persona.avatar} alt={persona.name} />
          <h1 class="text-xl mb-3 mt-4 text-primary-900">John Smith</h1>
          <P class="mb-4">{persona.age} years old - {persona.gender}</P>
      
          <h1 class="text-xl mb-3 mt-4 text-bold text-primary-900">Bio</h1>
          <P class="mb-4">{persona.bio}</P>
      
          <h1 class="text-xl mb-3 mt-4 text-primary-900">Paint Points</h1>
          <P class="mb-4">{persona.painPoints}</P>
    </div>
      
</div>
