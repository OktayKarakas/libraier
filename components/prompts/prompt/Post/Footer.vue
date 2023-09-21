<template>
  <div
    class="bg-black w-[299px] h-auto mx-auto text-white pt-[16px] pb-[20px] px-[10px] mb-[120px]"
  >
    <!-- top -->
    <div class="flex justify-between">
      <p class="font-bold text-[18px] leading-[21px]">Free</p>
      <div class="flex gap-[18px]">
        <img
          src="~/assets/prompt/HeartOutline.svg"
          class="w-[24px] h-[24px] cursor-pointer"
        />
        <img
          src="~/assets/prompt/ChatOutline.svg"
          class="w-[24px] h-[24px] cursor-pointer"
        />
      </div>
    </div>
    <!-- mid -->
    <button
      class="py-[14px] px-[24px] bg-white text-black font-bold text-[12px] leading-[14px] my-[10px]"
      @click="handleGetPrompt"
      v-if="!isUserHasPrompt"
    >
      Get Prompt
    </button>
    <button
      class="py-[14px] px-[24px] bg-white text-black font-bold text-[12px] leading-[14px] my-[10px]"
      @click="store.modalHandler('open')"
      v-else
    >
      See Prompt
    </button>
    <!-- bottom -->
    <p class="text-[8px] font-bold leading-[9px] text-[#AAAAAA] max-w-[258px]">
      After purchasing, you will gain access to the prompt file, which you can
      use with ChatGPT. You must already have access to ChatGPT to use this
      prompt.
    </p>
  </div>
</template>

<script setup>
import { useFooterModalOpenStore } from "@/stores/prompts/footer/modal.ts";
const store = useFooterModalOpenStore();
const props = defineProps(["promptData"]);
const { data } = useAuth();
const route = useRoute();
const isUserHasPrompt = ref(false);
async function checkUserHasPrompt() {
  const { data: prompt } = await useFetch("/api/user/prompts", {
    method: "GET",
    query: {
      checkUserHasPrompt: true,
      userEmail: data.value.user.email,
      promptId: route.params.promptId,
    },
  });
  return prompt;
}

async function handleGetPrompt() {
  try {
    const { data: fetchData, error } = await useFetch("/api/user/prompts", {
      method: "POST",
      body: {
        promptId: route.params.promptId,
        promptTitle: props.promptData.result.prompts.title,
      },
      query: {
        getPrompt: true,
        email: data.value.user.email,
      },
    });
    if (fetchData.value.result.error) {
      isUserHasPrompt.value = false;
      return;
    } else {
      ElNotification({
        title: "Success",
        message: "Prompt added to your account.",
        type: "success",
      });
      isUserHasPrompt.value = true;
    }
  } catch (e) {
    console.error(e);
  }
}

const userHasPromptValue = await checkUserHasPrompt();
if (userHasPromptValue.value?.result?.success === false) {
  isUserHasPrompt.value = false;
} else {
  isUserHasPrompt.value = true;
}
</script>

<style scoped></style>
