<script lang="ts">
  import { page } from "$app/stores";
  import api from "$lib/api";
  import FeedList from "$lib/components/problem/FeedList.svelte";
  import ProblemLayout from "$lib/components/problem/ProblemLayout.svelte";
  import Gravitar from "$lib/components/shared/Gravitar.svelte";
  import type { Problem } from "$lib/types";
  import moment from "moment";

  let feed: any[] = [];
  let problem: Problem;
  api.problem
    .feed($page.params.id)
    .list()
    .then((res) => {
      feed = res.data;
    });

  function fromNow(when: any) {
    return moment.utc(when).fromNow();
  }
</script>

<ProblemLayout bind:problem>

  <div class="flex mb-5 m-4">
    <h1 class="flex-1 items-end flex text-xl text-primary-600">Activity Feed</h1>
  </div>

  <div class="border bg-white m-4">
    <FeedList problem={problem}  />
  </div>
  <div class="m-9">
      &nbsp;
  </div>
</ProblemLayout>
