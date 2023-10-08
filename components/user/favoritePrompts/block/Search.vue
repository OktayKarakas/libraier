<template>
  <div
    class="w-[192px] h-[46px] bg-white gap-[7px] flex items-center rounded-[10px] mx-auto mb-[30px]"
  >
    <img
      src="~/assets/categories/searchIcon.svg"
      class="w-[12px] h-[12px] ml-[12px]"
    />
    <input
      type="text"
      placeholder="Search favorite Prompts"
      v-model="searchInput"
      class="text-[10px] my-auto outline-none focus:ring-0 w-full mr-[5px] border-0"
    />
  </div>
</template>

<script setup>
const emit = defineEmits(["searchInputUserPrompt"]);
import { watchDebounced } from "@vueuse/core";
const route = useRoute();
const searchInput = ref("");

watchDebounced(
  searchInput,
  async () => {
    const prompts = await fetchUserPrompts();
    emit("searchInputUserPrompt", {
      prompts,
      searchInput,
    });
  },
  { debounce: 500, maxWait: 850 }
);

async function fetchUserPrompts() {
  const { data } = await useFetch("/api/user/prompts", {
    method: "GET",
    query: {
      getOwnedPromptByTitleAndUserId: true,
      promptTitle: searchInput.value,
      userId: route.params.id,
    },
  });
  return data?.value?.result;
}
</script>

<style scoped></style>
