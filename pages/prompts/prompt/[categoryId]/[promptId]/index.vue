<template>
  <div>
    <PromptsPromptTitle :promptData="promptData" />
    <PromptsPromptPostHeader :promptData="promptData" />
    <PromptsPromptPostBody :promptData="promptData" />
    <PromptsPromptPostFooter :promptData="promptData" />
    <PromptsPromptSuggesteds />
  </div>
</template>

<script setup>
const route = useRoute();
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

const promptData = await fetchPromptData();
if (!promptData?.value?.result?.prompts) {
  navigateTo("/404");
}
</script>

<style scoped></style>
