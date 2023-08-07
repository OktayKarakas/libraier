<template>
  <div class="w-full text-center">
    <div class="flex flex-col items-center">
      <h1 class="leading-9 mb-[27px] text-[32px]">
        <span class="heroHeading-1 block">Artificial</span>
        <span class="heroHeading-2 block">Intelligence</span>
        <span class="heroHeading-3">Prompt </span>
        <span class="heroHeading-4">Library</span>
      </h1>
      <p class="text-[14px] font-semibold paragraphColor w-[250px] mx-auto">
        Libraier's library has hundreds of prompts for your technical,
        scientific, historic, and daily needs!
      </p>
      <button
        class="text-[14px] text-[#001C30] font-medium block w-[241px] bg-white rounded-md mt-[40px] mb-[20px] py-[5.5px] buttonShadow"
      >
        <span class="mr-1 ml-1">See Prompts</span>
        <img
          class="inline pb-[2px]"
          src="~/assets/landing/hero/buttonRightArrow.svg"
        />
      </button>
      <button
        class="text-[14px] font-medium block w-[241px] text-white bg-black rounded-md py-[5.5px] buttonShadow"
      >
        Write Prompts
      </button>
    </div>
  </div>
</template>

<script></script>

<style scoped>
.heroHeading-1 {
  background: linear-gradient(168.7deg, #001c30 50%, #458782 96%);
  -webkit-background-clip: text; /* For Safari/Chrome */
  background-clip: text;
  color: transparent;
  font-weight: 700;
}
.heroHeading-2 {
  background: linear-gradient(110deg, #001c30 47%, #458782 110%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-weight: 700;
}
.heroHeading-3 {
  background: linear-gradient(168.7deg, #001c30 50%, #458782 172.54%);
  -webkit-background-clip: text; /* For Safari/Chrome */
  background-clip: text;
  color: transparent;
  font-weight: 700;
}
.heroHeading-4 {
  background: linear-gradient(110deg, #001c30 -15%, #458782 110%);
  -webkit-background-clip: text; /* For Safari/Chrome */
  background-clip: text;
  color: transparent;
  font-weight: 700;
}

.buttonShadow {
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
</style>
