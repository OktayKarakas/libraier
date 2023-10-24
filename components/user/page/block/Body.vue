<template>
  <div class="lg:max-w-[1250px] mx-auto">
    <UserPageBlockSearch
      @searchInputUserPrompt="(e) => handleSearch(e)"
      @searchInputEmpty="(e) => handleInputEmpty(e)"
      v-if="!noPrompts"
    />
    <h3
      class="text-[#D9D9D9] font-bold text-[24px] leading-[28px] pb-[25px] pl-[10px]"
    >
      Created Prompts
    </h3>
    <div class="px-3 grid grid-cols-3 lg:grid-cols-4 gap-3 gap-y-5 pb-[50px]">
      <div
        class="pt-[30px] pb-[50px] min-w-[113px] max-w-[113px] max-h-[143px] min-h-[143px] lg:max-w-none lg:w-[205px] lg:h-[125px] lg:max-h-[125px] lg:cursor-pointer lg:min-h-[106px]"
        :style="`background: ${generate()}`"
        v-for="prompt in userPrompts"
        @click="async () => await handlePromptClick(prompt.id)"
        :key="prompt.id"
      >
        <p
          class="text-[18px] font-semibold leading-[21px] text-center text-white text-ellipsis mt-2 lg:w-full lg:h-full text lg:px-2"
        >
          {{ prompt.title }}
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

const skipPag = ref(0);
const takePag = ref(10);
const isShowButtonActive = ref(true);
const noPrompts = ref(true);
const searchNoPrompts = ref(false);
const navigatePromptVal = ref();
async function fetchPrompts() {
  if (route.params?.id) {
    const { data } = await useFetch("/api/user/prompts", {
      method: "GET",
      query: {
        getPromptByUserId: true,
        writerId: route.params.id,
        skip: Number(skipPag.value),
        take: Number(takePag.value),
      },
    });
    searchNoPrompts.value = false;
    noPrompts.value = false;
    if (data.value.result.prompts.length <= 0) {
      isShowButtonActive.value = false;
      noPrompts.value = true;
      return;
    } else if (arraysAreEqual(userPrompts.value, data.value.result.prompts)) {
      isShowButtonActive.value = false;
      return;
    } else {
      userPrompts.value = userPrompts.value.concat(data.value.result.prompts);
      if (userPrompts.value.length < takePag.value) {
        isShowButtonActive.value = false;
      }
    }
    if (userPrompts.value.length >= data.value.result.totalCount) {
      isShowButtonActive.value = false;
    } else {
      isShowButtonActive.value = true;
      noPrompts.value = false;
    }
  }

  return userPrompts.value;
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
  isShowButtonActive.value = false;
  userPrompts.value = e.prompts;
  skipPag.value = 0;
  takePag.value = 10;
  if (e.prompts.length <= 0) {
    searchNoPrompts.value = true;
  }
  if (e.searchInput.value === "") {
    userPrompts.value = [];
    skipPag.value = 0;
    takePag.value = 10;
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
.text {
  display: -webkit-box;
  -webkit-line-clamp: 2; /* Limit to a maximum of two lines */
  -webkit-box-orient: vertical;
  white-space: normal; /* Allow text to wrap within the container */
  overflow: hidden;
  text-overflow: ellipsis; /* Add ellipsis (...) for truncated text */
}
</style>
