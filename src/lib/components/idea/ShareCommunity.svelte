<script>
  import { onMount } from "svelte";

  export let url = "https://www.reddit.com/r/startups";
  export let text = "/r/startups";

  let image = "";
  onMount(() => {
    image = getImage();
  });

  function getImage() {
    if (url.includes("reddit")) {
      return "/img/logos/reddit.png";
    }
    if (url.includes("facebook")) {
      return "/img/logos/facebook.png";
    }
    if (url.includes("linkedin")) {
      return "/img/logos/linkedin.webp";
    }
    if (url.includes("quora")) {
      return "/img/logos/quora.png";
    }

    return `https://image.thum.io/get/${url}`;
  }
</script>

<a
  target="_blank"
  href={url}
  class="border p-3 relative
    w-full
    items-center
    flex
    bg-white
    overflow-hidden
    text-sm
    rounded-xl
    hover:shadow-lg
    transition-shadow
    duration-[0.2s]
    ease-in-out"
>
  <img class="w-[30px] h-[30px] rounded-full mr-4" src={image} alt={url} />
  <div class="flex-1">
    {text}
  </div>
  <i class="fas fa-chevron-right"></i>
</a>
