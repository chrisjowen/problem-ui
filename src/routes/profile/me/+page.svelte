<script lang="ts">
  import { auth } from "$lib/store";
  import { Breadcrumb, BreadcrumbItem } from "flowbite-svelte";
  import { onMount } from "svelte";
  import api from "$lib/api";
  import type { Problem } from "$lib/types";
  import EditableTextArea from "$lib/components/shared/EditableTextArea.svelte";
  import { PUBLIC_IMG_CDN_BASE, PUBLIC_PROBLEM_API_PATH } from "$env/static/public";
  import Gravitar from "$lib/components/shared/Gravitars.svelte";

  let me = $auth.loggedInUser;
  let problems: Problem[] = [];

  onMount(async () => {
    me = (await api.user.get(me.id, ["problems"])).data;

    loadProblemFollowing();
  });

  function loadProblemFollowing() {
    api.follower
      .list(`user_id=${me.id}`, 5, 1, ["problem", "problem.user"])
      .then((res) => {
        problems = res.data.entries.map((f) => f.problem);
      });
  }

  let bio = `
    <p>
      Hi there! My name is Christopher Owen, and I'm a seasoned
      technical leader with a deep passion for innovation.
    </p>

    <p>
      I've spent years working in both technical and consultancy
      roles, giving me a unique perspective on how to build and grow a
      product.
    </p>

    <p>
      Throughout my career, I've always been dedicated to creating
      value for both customers and stakeholders.
    </p>
    <p>
      I believe that by staying ahead of the curve and taking
      calculated risks, businesses can achieve sustainable growth and
      long-term success.
    </p>
  `;
</script>

<div class="bg-primary-500 p-4 flex flex-row space-x-2 hidden md:block">
  <Breadcrumb aria-label="Default breadcrumb example">
    <BreadcrumbItem href="/" linkClass="text-white text-xs">Home</BreadcrumbItem
    >
    <BreadcrumbItem spanClass="text-white text-xs">Profile</BreadcrumbItem>
  </Breadcrumb>
</div>

{#if me}
  <div class="m-9">
    <div class="flex">
      <section class="border p-4 bg-white hidden">Links</section>
      <section class="flex-1 pl-4">
        <div class="flex p-4 mb-8">
          <div class=" mr-8">
            <Gravitar email={me.email} className="rounded-lg" size="lg" />
          </div>
          <div class="flex-1">
            <h1 class=" text-xl text-primary-600 font-bold mt-3">
              {me.name}
              {me.last_name}
            </h1>
            <p class="mb-2 text-gray-500">Maker blah blah blah</p>
          </div>
        </div>

        <div class="grid lg:grid-cols-3 lg:gap-4">
          <div class="lg:col-span-2 mb-4">
            <div class="bg-white border pb-4 rounded-lg mb-4">
              <EditableTextArea title="Your Bio" input={bio} editable={true} />
            </div>

            <div>
              <h2 class="text-xl mb-2">Your Problems</h2>
              {#each me.problems as problem}
                <div class="flex bg-white border p-4 rounded-lg mb-2">
                  <img
                    src="{PUBLIC_IMG_CDN_BASE}{problem.img}"
                    class="w-[70px] mr-6"
                    alt=""
                  />
                  <div>
                    <h1 class="text-xl mb-2">{problem.title}</h1>
                    <p class="text-sm">{problem.blurb}</p>
                  </div>
                </div>
              {/each}
            </div>
          </div>
          <div>
            <h2 class="text-lg mb-2">Problems You Follow</h2>
            <div class="grid grid-cols-3 gap-2">
              {#each problems as problem}
                <div class=" bg-white border p-4 rounded-lg">
                  <p class="text-center">
                    <img
                      src="/api/image{problem.img}"
                      class="w-[50px] m-auto block"
                      alt=""
                    />
                  </p>
                  <p class="text-xs text-center mt-2">{problem.title}</p>
                </div>
              {/each}
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
{/if}
