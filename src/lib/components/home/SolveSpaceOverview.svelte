<script>
  import Gravitar from "../shared/Gravitar.svelte";
  import Saos from "saos";
</script>

<div class="space-y-4 mb-4">
  <Saos animation={"from-left 1s  both"} once={true}>
    <div class="flex">
      <div>
        <Gravitar
          email="chris.j.owen@hotmail.co.uk"
          size="lg"
          className="w-[50px] h-[50px] mr-4"
        />
      </div>
      <div class="flex-1">
        <p class="speech-bubble mb-4 bg-white p-8 rounded-xl">
          What is a <strong>SolveSpace</strong>?
        </p>
      </div>
    </div>
  </Saos>

  <Saos animation={"from-right 1.5s  both"} once={true}>
    <div class="flex">
      <div class="flex-1">
        <p class="speech-bubble mb-4 bg-white p-8 rounded-xl">
          <strong>SolveSpaces</strong> are a collaborative space where you can to
          manage and grow your teams, discuss and solve your startup problems, and
          manage all your needed resources for growth.
        </p>
      </div>
      <div>
        <img src="/img/ai.png" class="w-[80px] ml-4" alt="bot" />
      </div>
    </div>
  </Saos>

  <Saos animation={"from-left 2s  both"} once={true}>
    <div class="flex">
      <div>
        <Gravitar
          email="chris.j.owen@hotmail.co.uk"
          size="lg"
          className="w-[50px] h-[50px] mr-4"
        />
      </div>
      <div class="flex-1">
        <p class="speech-bubble mb-4 bg-white p-8 rounded-xl">
          Mmmm, ok so what can you do in these <strong>SolveSpaces</strong>?
        </p>
      </div>
    </div>
  </Saos>

  <Saos animation={"from-right 2.5s  both"} once={true}>
    <div class="flex">
      <div class="flex-1">
        <p class="speech-bubble mb-4 bg-white p-8 rounded-xl">
          Many features are coming soon, but for now there are many things you
          can do in your <strong>SolveSpaces</strong>, such as:
        </p>
      </div>
      <div>
        <img src="/img/ai.png" class="w-[80px] ml-4" alt="bot" />
      </div>
    </div>
  </Saos>
</div>

<style>
  /* @keyframes -global-from-left {
    0% {
      transform: rotateX(50deg) translateX(-200vw) skewX(-50deg);
      opacity: 1;
    }
    100% {
      transform: rotateX(0deg) translateX(0) skewX(0deg);
      opacity: 1;
    }
  }

  @keyframes -global-from-right {
    0% {
      transform: rotateX(50deg) translateX(200vw) skewX(-50deg);
      opacity: 1;
    }
    100% {
      transform: rotateX(0deg) translateX(0) skewX(0deg);
      opacity: 1;
    }
  }

  @keyframes -global-slide-in-bottom {
    0% {
      -webkit-transform: translateY(1000px);
      transform: translateY(50px);
      opacity: 0;
    }
    100% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes -global-fade-in {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  } */
</style>
