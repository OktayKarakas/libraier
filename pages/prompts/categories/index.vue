<template>
  <div class="mt-[50px]">
    <PromptsCategoriesSearch @searchRendered="onSearchRendered" />
    <p v-if="!searchRendered" class="text-center pb-12 font-bold">Loading...</p>
    <client-only>
      <PromptsCategoriesList v-if="searchRendered" />
    </client-only>
  </div>
</template>

<script setup>
const searchRendered = ref(false);

const onSearchRendered = () => {
  searchRendered.value = true;
};
</script>

<style scoped>
.buttonParagraph {
  font-family: "Rubik";
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 20px;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: 0.1px;

  color: #001c30;

  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
</style>
