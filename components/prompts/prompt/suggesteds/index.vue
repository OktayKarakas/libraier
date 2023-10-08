<template>
  <div class="border-b border-black mb-[7px] pb-[24px] borderOpacity">
    <h3
      class="text-[24px] font-bold leading-[28px] text-[#D9D9D9] ml-[17px] heading"
    >
      Related Prompts
    </h3>
  </div>
  <div class="mb-5">
    <client-only>
      <PromptsPromptSuggestedsCarousel :data="careouselData" />
    </client-only>
  </div>
</template>

<script setup>
const careouselData = ref();
const route = useRoute();

const fetchCareouselData = async () => {
  const { data } = await useFetch("/api/user/prompts", {
    method: "GET",
    query: {
      getPromptsByCategoryName: true,
      promptCategory: route.params.categoryId,
    },
  });

  return data;
};

careouselData.value = await fetchCareouselData();
</script>

<style scoped>
.borderOpacity {
  border-color: rgba(0, 0, 0, 0.3);
}
.heading {
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
</style>
