<script lang="ts">
    interface Persona {
      age: number;
      bio: string;
      countryOfBirth: string;
      descriptionOfAppearance: string;
      ethnicity: string;
      gender: string;
      name: string;
      painPoints: string;
    }
  
    let avatar : null | string = null;
  
    import WhoForm from "$lib/createproblem/who.form.svelte";
    import { Heading, P, Card } from "flowbite-svelte";
    import axios from "axios";
    
    type NullablePersona = null | Persona;
  
    function getAvatar(persona: Persona) {
      axios.post("/api/assistant/persona/avatar", persona).then((res) => {
        avatar = res.data.url;
      });
    }
  
    function onWhoChanged(event: CustomEvent) {
      let who = event.detail;
  
      axios.post("/api/assistant/persona", who).then((res) => {
        console.log(res);
        persona = res.data;
        getAvatar(persona!);
      });
  
      console.log(who);
    }
  
    let persona: NullablePersona = null;
  </script>
  
  <div >
    <div>
      <Heading class="mb-5" tag="h2" color="text-indigo-500">Create Persona</Heading>
      <WhoForm on:change={onWhoChanged} />
    </div>
    <div class="p-4">
      {#if persona != null}
        <Card>
          {#if avatar != null}
            <img src={avatar} alt={persona.name} />
          {/if}
  
          <Heading tag="h3">{persona.name}</Heading>
          <P class="mb-4">{persona.age} years old - {persona.gender}</P>
          <Heading tag="h4" class="mb-4">Bio</Heading>
          <P class="mb-4">{persona.bio}</P>
          <Heading tag="h4" class="mb-4">Paint Points</Heading>
          <P class="mb-4">{persona.painPoints}</P>
        </Card>
      {/if}
    </div>
  </div>
  