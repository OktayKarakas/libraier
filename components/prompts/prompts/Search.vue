<template>
  <div>
    <div class="lg:hidden">
      <h3 class="heading text-[32px] font-bold text-center mb-[40px] mx-5">
        {{ routeBasedTitle }}
      </h3>
      <div class="flex flex-col items-center mb-[50px]">
        <div
          class="w-[281px] h-[45px] bg-white gap-5 flex items-center rounded-[10px] mx-auto"
        >
          <img
            src="~/assets/categories/searchIcon.svg"
            class="w-[12px] h-[12px] ml-[12px]"
          />
          <input
            type="text"
            placeholder="Search"
            class="text-[14px] my-auto outline-none border-0 focus:ring-0"
            v-model="searchInput"
          />
        </div>
        <div class="w-[281px] flex mt-[10px] mb-[3px] gap-[10px]">
          <select
            class="custom-select text-[12px] bg-white rounded-[5px] pl-[10px] pt-[4px] pb-[2px] cursor-pointer"
            v-model="selectOptionOne"
          >
            <option value="top">Top</option>
            <option value="newest">Newest</option>
            <option value="popular">Popular</option>
          </select>
          <select
            class="text-[12px] bg-white rounded-[5px] pl-[10px] pt-[4px] pb-[2px] cursor-pointer"
            v-model="selectOptionTwo"
          >
            <option value="all time">All Time</option>
            <option value="past month">Past Month</option>
            <option value="past week">Past Week</option>
            <option value="past day">Past Day</option>
          </select>
        </div>
      </div>
    </div>
    <div class="hidden lg:flex mt-[15px]">
      <div>
        <div
          class="w-[307px] h-[59px] bg-white gap-5 flex items-center rounded-[10px]"
        >
          <img
            src="~/assets/categories/searchIcon.svg"
            class="w-[12px] h-[12px] ml-[12px]"
          />
          <input
            type="text"
            placeholder="Search"
            class="text-[14px] my-auto outline-none focus:ring-0 border-0"
            v-model="searchInput"
          />
        </div>
        <div
          class="pl-[22px] pr-[80px] py-[40px] bg-black bg-opacity-10 w-[203px] rounded-[15px] border-black border border-opacity-30 mt-[50px]"
        >
          <h3 class="text-white">Sort By</h3>
          <ul class="list-none">
            <li>
              <input
                type="radio"
                id="top"
                name="sorting"
                value="top"
                v-model="selectOptionOne"
              />
              <label for="top"> Top</label>
            </li>
            <li>
              <input
                type="radio"
                id="newest"
                name="sorting"
                value="newest"
                v-model="selectOptionOne"
              />
              <label for="newest"> Newest</label>
            </li>
            <li>
              <input
                type="radio"
                id="popular"
                name="sorting"
                value="popular"
                v-model="selectOptionOne"
              />
              <label for="popular"> Popular</label>
            </li>
          </ul>
          <h3 class="mt-5 text-white whitespace-nowrap">Last Updated</h3>
          <ul class="list-none whitespace-nowrap">
            <li>
              <input
                type="radio"
                id="all time"
                name="time_sorting"
                value="all time"
                v-model="selectOptionTwo"
              />
              <label for="top"> All time</label>
            </li>
            <li>
              <input
                type="radio"
                id="past month"
                name="time_sorting"
                value="past month"
                v-model="selectOptionTwo"
              />
              <label for="newest"> Past month</label>
            </li>
            <li>
              <input
                type="radio"
                id="past week"
                name="time_sorting"
                value="past week"
                v-model="selectOptionTwo"
              />
              <label for="popular"> Past week</label>
            </li>
            <li>
              <input
                type="radio"
                id="past day"
                name="time_sorting"
                value="past day"
                v-model="selectOptionTwo"
              />
              <label for="popular"> Yesterday</label>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useFetchPrompts } from "@/stores/prompts/index.ts";
import { watchDebounced } from "@vueuse/core";
const route = useRoute();
const prompts = useFetchPrompts();
const selectOptionOne = ref("top");
const selectOptionTwo = ref("all time");
const searchInput = ref("");
const isSearchInputCleared = ref("");
const emit = defineEmits(["searchRendered"]);
const routeBasedTitle = computed(() => {
  const words = route.params.categoryName.split("_");
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );
  return capitalizedWords.join(" ");
});

const getFirstPrompts = async () => {
  const promptsVal = await prompts.getPrompts(
    "all time",
    "top",
    "",
    false,
    route.params.categoryName
  );
  return promptsVal;
};

if (route.fullPath) {
  prompts.resetShowMore();
}

watch(searchInput, async (newVal) => {
  if (newVal === "") {
    isSearchInputCleared.value = true;
    prompts.handleisSearchCleared(isSearchInputCleared.value);
  } else {
    isSearchInputCleared.value = false;
    prompts.handleisSearchCleared(isSearchInputCleared.value);
  }
});

watchDebounced(
  searchInput,
  async () => {
    const getPromptsVal = async () => {
      await prompts.getPrompts(
        selectOptionTwo.value,
        selectOptionOne.value,
        searchInput.value?.toLowerCase(),
        isSearchInputCleared.value,
        route.params.categoryName
      );
    };
    await getPromptsVal();
  },
  { debounce: 500, maxWait: 850 }
);

watch([selectOptionOne, selectOptionTwo], async (newX) => {
  const getPromptsVal = async () => {
    await prompts.getPrompts(
      newX[1],
      newX[0],
      searchInput.value?.toLowerCase(),
      false,
      route.params.categoryName
    );
  };
  await getPromptsVal();
});

await getFirstPrompts();
emit("searchRendered");
</script>

<style scoped>
.heading {
  background: linear-gradient(103.68deg, #001c30 40.21%, #458782 101.71%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.no-appearance {
  appearance: none;
  -webkit-appearance: none;
  background: transparent;
  background-image: none;
}
</style>
