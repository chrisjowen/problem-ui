<script>
// @ts-nocheck

  import { browser } from "$app/environment";

  
   

  if (browser) {
    let d = document;
    let   s = d.createElement("script");

    s.src = "https://problemsworthsolving.disqus.com/embed.js";
    s.setAttribute("data-timestamp", + new Date());
    (d.head || d.body).appendChild(s);
  }
</script>

<div class="bg-white p-9 mb-4">
    <div id="disqus_thread" />
</div>

<noscript
  >Please enable JavaScript to view the <a
    href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a
  ></noscript
>
