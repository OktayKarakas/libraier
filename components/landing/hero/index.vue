<template>
  <div class="w-full text-center lg:h-screen lg:mt-[-100px]">
    <div class="flex flex-col items-center lg:justify-center lg:h-full">
      <h1 class="leading-9 mb-[27px] text-[32px] lg:hidden">
        <span class="heroHeading-1 block">Artificial</span>
        <span class="heroHeading-2 block">Intelligence</span>
        <span class="heroHeading-3">Prompt </span>
        <span class="heroHeading-4">Library</span>
      </h1>
      <h1
        class="text-[60px] font-bold heroHeadingPc text-center justify-self-center hidden lg:block"
      >
        <span class="block">Artificial Intelligence</span>
        <span class="block">Prompt Library</span>
      </h1>
      <p
        class="text-[14px] font-semibold paragraphColor leading-6 w-[250px] mx-auto lg:w-[559px] lg:text-[18px] lg:font-semibold lg:leading-[32px] lg:text-[#111827]"
      >
        Libraier's library has hundreds of prompts for your technical,
        scientific, historic, and daily needs!
      </p>
      <div
        class="flex flex-col lg:flex-row-reverse lg:items-center lg:gap-8 lg:justify-center"
      >
        <button
          class="text-[14px] text-[#001C30] font-medium block w-[241px] lg:w-[126px] lg:h-[32px] bg-white rounded-md mt-[40px] mb-[20px] lg:mb-[0px] py-[5.5px] buttonShadow"
          @click="async () => await navigateTo('/prompts/categories')"
        >
          <span class="mr-1 ml-1">See Prompts</span>
          <img
            class="inline pb-[2px]"
            src="~/assets/landing/hero/buttonRightArrow.svg"
          />
        </button>
        <button
          class="text-[14px] font-medium block w-[241px] text-white bg-black rounded-md py-[5.5px] lg:w-[120px] lg:h-[32px] lg:mt-[40px] buttonShadow"
          @click="handleWritePrompts"
        >
          Write Prompts
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const { signIn, status } = useAuth();
async function handleWritePrompts() {
  if (status.value === "unauthenticated") {
    await signIn("google", { callbackUrl: "/user/prompts/write" });
  } else {
    await navigateTo("/user/prompts/write");
  }
}
</script>

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

.heroHeadingPc {
  background: linear-gradient(103.68deg, #001c30 40.21%, #458782 101.71%);
  -webkit-background-clip: text; /* For Safari/Chrome */
  background-clip: text;
  color: transparent;
}

.buttonShadow {
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
</style>
