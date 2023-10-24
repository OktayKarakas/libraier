<template>
  <div
    class="bg-black w-[299px] lg:w-[1000px] h-auto mx-auto text-white pt-[16px] pb-[20px] px-[10px] mb-[120px]"
  >
    <!-- top -->
    <div class="flex justify-between">
      <p class="font-bold text-[18px] leading-[21px]">Free</p>
      <div class="flex gap-[18px]">
        <img
          src="~/assets/prompt/HeartFilled.svg"
          v-if="isUserFavoritePrompt"
          class="w-[24px] h-[24px] lg:w-[36px] lg:h-[36px] cursor-pointer"
          @click="triggeredUnFavorite"
        />
        <img
          src="~/assets/prompt/HeartOutline.svg"
          v-else
          class="w-[24px] h-[24px] lg:w-[36px] lg:h-[36px] cursor-pointer"
          @click="triggeredFavorite"
        />
      </div>
    </div>
    <!-- mid -->
    <button
      class="py-[14px] px-[24px] bg-white text-black font-bold text-[12px] leading-[14px] my-[10px] lg:text-[24px] lg:w-[186px] lg:h-[56px] whitespace-nowrap"
      @click="handleGetPrompt"
      v-if="!isUserHasPrompt"
    >
      Get Prompt
    </button>
    <button
      class="py-[14px] px-[24px] bg-white text-black font-bold text-[12px] leading-[14px] my-[10px] lg:text-[24px] lg:w-[186px] lg:h-[56px] whitespace-nowrap"
      @click="store.modalHandler('open')"
      v-else
    >
      See Prompt
    </button>
    <!-- bottom -->
    <p
      class="text-[8px] font-bold leading-[9px] text-[#AAAAAA] max-w-[258px] lg:text-[12px] lg:leading-none lg:max-w-[453px]"
    >
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

const { data, status, signIn } = useAuth();
const route = useRoute();
const isUserHasPrompt = ref(false);
const isUserFavoritePrompt = ref(false);
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

async function triggeredFavorite() {
  const { data: prompt } = await useFetch("/api/user/prompts", {
    method: "PATCH",
    query: {
      favoritePrompt: true,
      userEmail: data.value.user.email,
      promptId: route.params.promptId,
      promptTitle: props?.promptData?.result?.prompts?.title
        ? props.promptData.result.prompts.title
        : "_",
    },
  });
  if (prompt) {
    if (prompt.value.result.success) {
      isUserFavoritePrompt.value = true;
    }
  }
  return prompt;
}

async function triggeredUnFavorite() {
  const { data: prompt } = await useFetch("/api/user/prompts", {
    method: "DELETE",
    query: {
      unFavoritePrompt: true,
      userEmail: data.value.user.email,
      promptId: route.params.promptId,
    },
  });

  if (prompt.value.result.success) {
    isUserFavoritePrompt.value = false;
  }
  return;
}

async function checkUserFavoritePrompt() {
  const { data: prompt } = await useFetch("/api/user/prompts", {
    method: "GET",
    query: {
      checkIfUserHasFavoritedPrompt: true,
      userEmail: data.value.user.email,
      promptId: route.params.promptId,
    },
  });
  return prompt;
}

async function handleGetPrompt() {
  try {
    if (status.value !== "unauthenticated") {
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
    } else {
      await signIn("google");
    }
  } catch (e) {
    console.error(e);
  }
}

if (status.value !== "unauthenticated") {
  const userHasPromptValue = await checkUserHasPrompt();
  const userHasFavroiteValue = await checkUserFavoritePrompt();
  if (userHasPromptValue.value?.result?.success === false) {
    isUserHasPrompt.value = false;
  } else {
    isUserHasPrompt.value = true;
  }
  if (userHasFavroiteValue.value?.result?.success === false) {
    isUserFavoritePrompt.value = false;
  } else {
    isUserFavoritePrompt.value = true;
  }
}
</script>

<style scoped></style>
