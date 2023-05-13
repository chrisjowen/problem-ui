<script lang="ts">
 


  import TextBox from "./components/TextBox.svelte";
  import _ from "lodash";
  let data = {
    name: "John Doe",
    nested: {
      name: "Nested John Doe",
    },
    array: [
        {
            name: "John Doe",
        },
        {
            name: "Jane Doe",
        },
    ]
  };
  let form = {
    mode: "create",
    url: "/api/persona",
    sections: [
      {
        title: "Create Persona",
        description:
          "Create a persona to help you understand your users better.",

        elements: [
          {
            id: "name",
            component: "text",
            label: "Name",
            placeholder: "John Doe",
            required: true,
            computed: "name",
            path: "array[0].name",
            validation: {
              type: "string",
              minLength: 3,
              maxLength: 255,
            },
          },
        ],
      },
    ],
  };

let updateData = (path: string) => (event: CustomEvent) => {
    data = _.set(data, path, event.detail);
}
</script>

{data.array[0].name}
{#each form.sections as section}
  <section class="m-2 p-9">
    <h1 class="mb-2 text-xl">{section.title}</h1>
    <p class="mb-2">{section.description}</p>

    <div>
      {#each section.elements as element}
        <div class="p-4">
          <TextBox
            {element}
            value={_.get(data, element.path)}
            on:change={updateData(element.path)}
          />
        </div>
      {/each}
    </div>
  </section>
{/each}
