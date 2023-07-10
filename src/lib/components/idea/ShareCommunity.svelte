 <script>
  import { onMount } from "svelte";

    export let url = "https://www.reddit.com/r/startups";
    export let text = "/r/startups";

    let image = "";
    onMount(() => {
        image = getImage();
    });

    function getImage() {
        if(url.includes("reddit")) {
            return "/img/logos/reddit.png";
        }
        if(url.includes("facebook")) {
            return "/img/logos/facebook.png";
        }
        if(url.includes("linkedin")) {
            return "/img/logos/linkedin.webp";
        }
        if(url.includes("quora")) {
            return "/img/logos/quora.png";
        }

        return `https://image.thum.io/get/${url}`
    }
 </script>
 
 <div
    class="border p-3 relative
    w-full
    bg-white
    overflow-hidden
    rounded-xl
    hover:shadow-xl
    transition-shadow
    duration-[0.5s]
    ease-in-out"
  >
    <a target="_blank" href="{url}">
      <div
        class="w-full h-[100px] overflow-hidden border mb-4 rounded-xl justify-center text-center flex items-center
        bg-[url('{image}')]
        "
      >
        <object
          title="{url}"
          data={image}
          type="image/png"
          class="w-full"
        />
      </div>
    </a>
    <a target="_blank" href="{url}" class="flex items-cente text-xs">
      <i class="fas fa-external-link-alt mr-2" /> {text}
    </a>
  </div>

