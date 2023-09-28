<template>
  <LandingTryItNowTitleText />
  <LandingTryItNowCodeBlock />
  <button
    class="button-shadow text-[#001C30] block w-[241px] bg-white rounded-md mt-[40px] mb-[70px] py-[5.5px] buttonShadow mx-auto"
    @click="async () => await navigateTo('/prompts/categories')"
  >
    <span class="mr-1 ml-1 button-text-shadow text-[14px] font-medium"
      >See All Prompts</span
    >
  </button>
</template>

<script setup></script>

<style scoped>
.button-text-shadow {
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
.button-shadow {
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3),
    0px 1px 3px 1px rgba(0, 0, 0, 0.15);
}
</style>
