<template>
  <div>
    <!-- code-block-header -->
    <div
      class="bg-black w-[275px] lg:w-[420px] h-[28px] mx-auto mt-[50px] rounded-tr-[5px] rounded-tl-[5px] relative"
    >
      <div class="absolute top-0 right-0 flex gap-2 mr-[17px] mt-[7px]">
        <div class="w-[13px] h-[13px] rounded-full bg-[#00CA4E]"></div>
        <div class="w-[13px] h-[13px] rounded-full bg-[#FFBD44]"></div>
        <div class="w-[13px] h-[13px] rounded-full bg-[#FF605C]"></div>
      </div>
    </div>
    <!-- code-block-body -->
    <div
      class="bg-[#333333] opacity-[53%] w-[275px] lg:w-[420px] h-[544px] mx-auto rounded-br-[5px] rounded-bl-[5px] code-block-shadow"
    ></div>
    <div
      class="custom-bg w-[228px] lg:w-[378px] h-[440px] mx-auto rounded-br-[5px] rounded-bl-[5px] z-10 mt-[-478px] code-block-shadow relative"
    >
      <!-- close-open visual code-block-inner -->
      <div
        class="bg-black w-[228px] lg:w-[378px] h-[26px] mx-auto mt-[50px] rounded-tr-[5px] rounded-tl-[5px] relative"
      >
        <div class="absolute top-0 right-0 flex gap-2 mr-[17px] mt-[7px]">
          <div class="w-[13px] h-[13px] rounded-full bg-[#00CA4E]"></div>
          <div class="w-[13px] h-[13px] rounded-full bg-[#FFBD44]"></div>
          <div class="w-[13px] h-[13px] rounded-full bg-[#FF605C]"></div>
        </div>
      </div>
      <!-- close-open visual code-block-inner end -->
      <!-- visual code-block-inner start -->
      <div class="w-full">
        <div class="flex flex-col justify-center mt-9">
          <img
            src="~/assets/landing/empower-with-ai/code-block-inner-keyboard-icon.svg"
            alt="keyboard-icon"
            class="mb-[12px] max-w-[28px] max-h-[30px] mx-auto"
          />
          <div class="text-center px-2.5 font-semibold">
            <h3 class="text-[14px] text-[#01EAB0]">
              Prompt library for ChatGPT
            </h3>
            <h4 class="text-[12px] text-[#AAAAAA] font-medium">
              Everything you can imagine can be done but now with ai and
              prompts.
            </h4>
          </div>
        </div>
        <div class="flex flex-col justify-center mt-[30px]">
          <img
            src="~/assets/landing/empower-with-ai/code-block-inner-keyboard-icon.svg"
            alt="keyboard-icon"
            class="mb-[12px] max-w-[28px] max-h-[30px] mx-auto"
          />
          <div class="text-center px-2.5 font-semibold">
            <h3 class="text-[14px] text-[#01EAB0]">Easy to use</h3>
            <h4 class="text-[12px] text-[#AAAAAA] font-medium">
              Filter prompts.Search them in one page without spending hours.
            </h4>
          </div>
        </div>
        <div class="flex flex-col justify-center mt-[20px]">
          <img
            src="~/assets/landing/empower-with-ai/code-block-inner-keyboard-icon.svg"
            alt="keyboard-icon"
            class="mb-[12px] max-w-[28px] max-h-[30px] mx-auto"
          />
          <div class="text-center px-2.5 font-semibold">
            <h3 class="text-[14px] text-[#01EAB0]">Community Friendly</h3>
            <h4 class="text-[12px] text-[#AAAAAA] font-medium">
              Help with your knowledge. Add your values to the future library of
              humanity.
            </h4>
          </div>
        </div>
      </div>
      <!-- visual code-block-inner end -->
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.code-block-shadow {
  -webkit-box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  -moz-box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
}
.custom-bg {
  background-color: rgba(0, 28, 48, 0.45);
}
</style>
