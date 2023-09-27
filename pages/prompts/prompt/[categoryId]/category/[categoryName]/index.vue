<template>
  <div class="mt-[50px]">
    <PromptsPromptsSearch @searchRendered="onSearchRendered" />
    <p
      v-if="!searchRendered || prompts.isLoading"
      class="text-center pb-12 font-bold"
    >
      Loading...
    </p>
    <client-only>
      <PromptsPromptsList v-if="searchRendered && !prompts.isLoading" />
    </client-only>
  </div>
</template>

<script setup>
import { useFetchPrompts } from "@/stores/prompts/index.ts";

const prompts = useFetchPrompts();
const searchRendered = ref(false);

if (process.client) {
  setTimeout(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, 400);
}

const onSearchRendered = () => {
  searchRendered.value = true;
};
</script>

<style></style>
