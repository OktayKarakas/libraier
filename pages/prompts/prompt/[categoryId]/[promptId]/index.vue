<template>
  <div>
    <PromptsPromptTitle :promptData="promptData" v-if="!error" />
    <PromptsPromptPostHeader :promptData="promptData" v-if="!error" />
    <PromptsPromptPostBody :promptData="promptData" v-if="!error" />
    <PromptsPromptPostFooter :promptData="promptData" v-if="!error" />
    <PromptsPromptSuggesteds />
  </div>
</template>

<script setup>
const route = useRoute();
const error = ref(false);
const fetchPromptData = async () => {
  if (route.params?.promptId) {
    const { data: prompt } = await useFetch("/api/user/prompts", {
      method: "GET",
      query: {
        getPromptById: true,
        promptId: route.params.promptId,
      },
    });

    return prompt;
  }
};
error.value = false;
const promptData = await fetchPromptData();
if (!promptData?.value?.result?.prompts) {
  error.value = true;
  await navigateTo("/404");
}
</script>

<style scoped></style>
