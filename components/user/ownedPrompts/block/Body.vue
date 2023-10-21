<template>
  <div>
    <UserOwnedPromptsBlockSearch
      @searchInputUserPrompt="(e) => handleSearch(e)"
      @searchInputEmpty="(e) => handleInputEmpty(e)"
      v-if="!noPrompts"
    />
    <h3
      class="text-[#D9D9D9] font-bold text-[24px] leading-[28px] pb-[25px] pl-[10px]"
    >
      Owned Prompts
    </h3>
    <div class="px-3 grid grid-cols-3 gap-3 gap-y-5 pb-[50px]">
      <div
        class="pt-[30px] pb-[50px] min-w-[113px] max-w-[113px] max-h-[143px] min-h-[143px] carousel__item"
        :style="`background: ${generate()}`"
        v-for="prompt in userPrompts"
        @click="async () => await handlePromptClick(prompt.promptId)"
        :key="prompt.id"
      >
        <p
          class="text-[18px] font-semibold leading-[21px] text-center text-white h-full overflow-hidden text-ellipsis mt-2"
        >
          {{ prompt.promptTitle }}
        </p>
      </div>
    </div>
    <p class="text-white text-center pb-24" v-if="noPrompts || searchNoPrompts">
      There is no prompts.
    </p>

    <div class="flex pb-[50px]" v-if="isShowButtonActive">
      <el-button type="primary" class="mx-auto" @click="handleShowMore" plain
        >Show more</el-button
      >
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const userPrompts = ref([]);
const searchNoPrompts = ref(false);
const navigatePromptVal = ref();

const skipPag = ref(0);
const takePag = ref(10);
const fetchedAlreadyData = ref(false);
const isShowButtonActive = ref(true);
const noPrompts = ref(false);
async function fetchPrompts() {
  if (route.params?.id) {
    const { data } = await useFetch("/api/user/prompts", {
      method: "GET",
      query: {
        getPromptByOwnedUserId: true,
        userId: route.params.id,
        skip: Number(skipPag.value),
        take: Number(takePag.value),
      },
    });
    noPrompts.value = false;

    if (data.value.result.totalCount <= 0) {
      isShowButtonActive.value = false;
      noPrompts.value = true;
      return;
    } else if (arraysAreEqual(userPrompts.value, data.value.result)) {
      isShowButtonActive.value = false;
      return;
    } else {
      if (fetchedAlreadyData.value) {
        userPrompts.value = userPrompts.value.concat(
          ...data.value.result.prompt
        );
        if (data.value.result.totalCount === userPrompts.value.length) {
          isShowButtonActive.value = false;
          return;
        }
      } else {
        userPrompts.value = userPrompts.value.concat(data.value.result);

        if (userPrompts.value[0]?.prompt?.length < takePag.value) {
          isShowButtonActive.value = false;
        }
      }
    }
    if (userPrompts.value[0]?.prompt?.length >= data.value.result.totalCount) {
      isShowButtonActive.value = false;
    } else {
      isShowButtonActive.value = true;
      noPrompts.value = false;
    }
  }
  fetchedAlreadyData.value = true;
  return userPrompts.value[0]?.prompt;
}

function arraysAreEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }

  return true;
}

function handleShowMore() {
  skipPag.value += takePag.value;
  fetchPrompts();
}

function createHex() {
  let hexCode1 = "";
  let hexValues1 = "0123456789abcdef";

  for (var i = 0; i < 6; i++) {
    hexCode1 += hexValues1.charAt(
      Math.floor(Math.random() * hexValues1.length)
    );
  }
  return hexCode1;
}

function generate() {
  let deg = Math.floor(Math.random() * 360);

  let gradient =
    "linear-gradient(" +
    deg +
    "deg, " +
    "#" +
    createHex() +
    ", " +
    "#" +
    createHex() +
    ")";

  return gradient;
}

const handleSearch = async (e) => {
  searchNoPrompts.value = false;
  isShowButtonActive.value = false;
  userPrompts.value = e.prompts;
  if (userPrompts.value.length <= 0) {
    searchNoPrompts.value = true;
  }
  skipPag.value = 0;
  takePag.value = 10;
  if (e.searchInput.value === "") {
    userPrompts.value = [];
    skipPag.value = 0;
    takePag.value = 10;
    fetchedAlreadyData.value = false;
    userPrompts.value = await fetchPrompts();
  }
};

userPrompts.value = await fetchPrompts();

const handlePromptClick = async (PROMPT_ID) => {
  const { data } = await useFetch("/api/user/prompts", {
    method: "GET",
    query: {
      getPromptById: true,
      promptId: PROMPT_ID,
    },
  });

  if (data?.value?.result?.prompts) {
    navigatePromptVal.value = data.value.result.prompts;

    if (navigatePromptVal.value) {
      await navigateTo(
        `/prompts/prompt/${navigatePromptVal.value.categoryName}/${navigatePromptVal.value.id}/${navigatePromptVal.value.title}`
      );
    }
  }

  return data;
};
</script>

<style scoped>
.block {
  background: linear-gradient(119.37deg, #09aead 32%, #3d3895 113.86%);
}
</style>
