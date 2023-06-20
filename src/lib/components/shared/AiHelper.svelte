


<div class=" m-8 w-full">
    <div class="speech-bubble drop-shadow-lg">
      <div
        class="prose prose-zinc prose-h1:text-gray-600 prose-h2:text-gray-500 prose-h2:mt-0 prose-h3:text-gray-500 prose-h3:mt-0 prose-md max-w-none"
      >
        <slot />
      </div>
    </div>
    <div class="flex justify-end">
      <img src="/img/ai.png" width="150px" alt="robot" />
    </div>
  </div>


<style lang="scss">
    .speech-bubble {
      background: white;
      padding: 40px;
      border-radius: 20px;
      min-height: 150px;
      position: relative;
  
      &:after {
        content: "";
        position: absolute;
        bottom: 0;
        right: 50px;
        width: 0;
        height: 0;
        
        border: 20px solid transparent;
        border-top-color: white;
        border-bottom: 0;
        border-left: 0;
        margin-left: -10px;
        margin-bottom: -20px;
      }
    }
  </style>