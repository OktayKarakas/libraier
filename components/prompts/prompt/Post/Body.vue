<template>
  <div class="bg-[#001C30] h-auto w-[299px] mx-auto flex flex-col px-4">
    <div
      class="font-bold text-[14px] text-white max-w-[260px] py-[20px]"
      v-dompurify-html="description.description"
    ></div>

    <button
      class="text-white mb-[30px] text-[12px] leading-[20px] tracking-[0.1px] underline underline-offset-[5px]"
      @click="handleDetailModal('open')"
    >
      See Details
    </button>
    <PromptsPromptPostDetailsModal
      :isDetailModalOpen="isDetailModalOpen"
      :handleDetailModal="handleDetailModal"
      :detailData="details"
    />
    <div
      class="absolute top-0 right-0 bottom-0 left-0 bg-black opacity-5 z-10 h-screen"
      v-if="isDetailModalOpen"
    ></div>
    <PromptsPromptPostModal />
  </div>
</template>

<script setup>
const props = defineProps(["promptData"]);
const isDetailModalOpen = ref(false);
const description = ref("");
const details = ref("");

function handleDetailModal(statusVal) {
  if (statusVal.toLowerCase() === "close") {
    isDetailModalOpen.value = false;
    // Remove the overlay-active class to enable scrolling
    document.body.classList.remove("overlay-active");
  } else {
    isDetailModalOpen.value = true;
    // Add the overlay-active class to disable scrolling
    document.body.classList.add("overlay-active");
  }
}
if (props.promptData?.result?.prompts) {
  description.value = props.promptData.result.prompts;
  details.value = props.promptData.result.prompts;
}
</script>

<style>
body.overlay-active {
  height: 100vh;
  overflow: hidden;
}
</style>
