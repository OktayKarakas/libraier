<template>
  <div class="flex flex-col items-center">
    <div class="grid grid-cols-2 gap-[20px] w-[281px] mx-auto mb-[60px]">
      <div
        class="w-[130px] h-[143px] promptBlock text-center flex flex-wrap items-center cursor-pointer"
        v-for="prompt in prompts.promptsArr"
        :key="prompt.id"
        @click="async () => await navigateToPrompt(prompt)"
      >
        <h3
          class="text-white w-[103px] mx-auto promptText max-w-[103px] max-h-[133px]"
        >
          {{ handlePromptName(prompt.title) }}
        </h3>
      </div>
    </div>
    <p class="font-bold mb-[50px] text-[16px]" v-if="store.noPrompts">
      There is no categories.
    </p>
    <button
      class="bg-white rounded-full buttonParagraph px-[15px] py-[4px] mb-[50px]"
      @click="handleClick"
      v-if="
        !store.noPrompts &&
        !prompts.isLimitHit &&
        !prompts.isSearchInput &&
        !prompts.isLoading
      "
    >
      Show More
    </button>
  </div>
</template>

<script setup>
import { useNoPromptsStore, useFetchPrompts } from "@/stores/prompts/index.ts";
const store = useNoPromptsStore();

const prompts = useFetchPrompts();

const handleClick = () => {
  prompts.increaseLimit();
};

const handlePromptName = (name) => {
  const words = name.split(" ");
  const formattedName = words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return formattedName;
};

const navigateToPrompt = async (element) => {
  await navigateTo({
    path: `/prompts/prompt/${element.categoryName}/${element.id}`,
  });
};

if (prompts.promptsArr?.length <= 0 || !prompts.promptsArr?.length) {
  store.noPromptsHandle();
} else {
  store.noPromptsHandle(false);
}
</script>

<style scoped>
.promptBlock {
  background: linear-gradient(119.37deg, #09aead 32%, #3d3895 113.86%);
  box-shadow: 10px 8px 10px rgba(61, 56, 149, 0.4),
    -5px -4px 10px rgba(9, 174, 173, 0.4);
}
.promptText {
  font-family: "Rubik";
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 21px;
  text-align: center;
  color: #ffffff;

  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
