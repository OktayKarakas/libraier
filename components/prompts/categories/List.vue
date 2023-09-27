<template>
  <div class="flex flex-col items-center">
    <div class="grid grid-cols-2 gap-[20px] w-[281px] mx-auto mb-[60px]">
      <div
        class="w-[130px] h-[143px] promptBlock text-center flex flex-wrap items-center cursor-pointer"
        v-for="category in categories.categoriesArr"
        :key="category.id"
        @click="() => navigateToPrompts(category)"
      >
        <h3 class="text-white w-[103px] mx-auto promptText">
          {{ handleCategoryName(category.name) }}
        </h3>
      </div>
    </div>
    <p class="font-bold mb-[50px] text-[16px]" v-if="store.noCategories">
      There is no categories.
    </p>
    <button
      class="bg-white rounded-full buttonParagraph px-[15px] py-[4px] mb-[50px]"
      @click="handleClick"
      v-if="
        !store.noCategories &&
        !categories.isLimitHit &&
        !categories.isSearchInput &&
        !categories.isLoading
      "
    >
      Show More
    </button>
  </div>
</template>

<script setup>
import {
  useNoCategoriesStore,
  useFetchCategories,
} from "@/stores/prompts/categories/categories.ts";
const store = useNoCategoriesStore();

const categories = useFetchCategories();

const handleClick = () => {
  categories.increaseLimit();
};

const handleCategoryName = (name) => {
  const words = name.split("_");
  const formattedName = words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return formattedName;
};

const navigateToPrompts = async (element) => {
  await navigateTo({
    path: `/prompts/prompt/${element.id}/category/${element.name}`,
  });
};

if (
  categories.categoriesArr?.length <= 0 ||
  !categories.categoriesArr?.length
) {
  store.noCategoriesHandle();
} else {
  store.noCategoriesHandle(false);
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
}
</style>
