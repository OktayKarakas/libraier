<template>
  <div class="border-b border-black mb-[7px] pb-[24px] borderOpacity">
    <h3
      class="text-[24px] font-bold leading-[28px] text-[#D9D9D9] ml-[17px] heading"
    >
      Related Prompts
    </h3>
  </div>
  <div class="mb-5">
    <PromptsPromptSuggestedsCarousel />
  </div>
  <div class="border-b border-black mb-[7px] pb-[24px] borderOpacity mt-[50px]">
    <h3
      class="text-[24px] font-bold leading-[28px] text-[#D9D9D9] ml-[17px] heading"
    >
      Created Prompts
    </h3>
  </div>
  <div class="mb-5">
    <PromptsPromptSuggestedsCarousel />
  </div>
</template>

<script setup></script>

<style scoped>
.borderOpacity {
  border-color: rgba(0, 0, 0, 0.3);
}
.heading {
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
</style>
