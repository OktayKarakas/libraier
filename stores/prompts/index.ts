export const useNoPromptsStore = defineStore("noPrompts", {
  state: () => {
    return {
      noPrompts: false,
    };
  },
  actions: {
    noPromptsHandle(val = true) {
      this.noPrompts = val;
    },
  },
});

export const useFetchPrompts = defineStore("fetchPrompts", () => {
  const promptsArr: any = ref([]);
  const noPrompts = useNoPromptsStore();
  const limit = ref(2);
  const skip = ref(0);
  const showMoreClicked = ref(false);
  const pastTimeRangeVal = ref();
  const pastQueryTypeVal = ref();
  const pastSearchCategory = ref();
  const isSearchCleared = ref(false);
  const isLimitHit = ref(false);
  const isSearchInput = ref(false);
  const isLoading = ref(false);

  const handleisSearchCleared = (a: boolean) => {
    isSearchCleared.value = a;
  };

  const resetShowMore = () => {
    skip.value = 0;
    showMoreClicked.value = false;
  };

  const increaseLimit = async () => {
    showMoreClicked.value = true;
    if (isSearchCleared.value) {
      skip.value = 0;
      isSearchCleared.value = false;
      skip.value += 2;
    } else {
      skip.value += 2;
    }
    await getPrompts(
      pastTimeRangeVal.value,
      pastQueryTypeVal.value,
      "",
      false,
      pastSearchCategory.value
    );
  };

  const getPrompts = async (
    timeRange: any,
    queryType: any,
    searchPrompt: String = "",
    isSearchInputCleared: Boolean = false,
    categoryName: string
  ) => {
    isLoading.value = true;
    if (
      pastTimeRangeVal.value !== timeRange ||
      pastQueryTypeVal.value !== queryType
    ) {
      promptsArr.value = [];
      skip.value = 0;
    }
    pastTimeRangeVal.value = timeRange;
    pastQueryTypeVal.value = queryType;
    pastSearchCategory.value = categoryName;
    isLimitHit.value = false;

    if (searchPrompt) {
      isSearchInput.value = true;
    } else {
      isSearchInput.value = false;
    }
    try {
      const { data } = await useFetch("/api/user/prompts", {
        method: "GET",
        query: {
          getPrompts: true,
          timeRange: timeRange,
          queryType: queryType,
          searchPrompt: searchPrompt,
          limit: Number(limit.value),
          skip: Number(skip.value),
          isSearchInputCleared: isSearchInputCleared,
          categoryName: categoryName,
        },
      });

      if (searchPrompt || isSearchInputCleared) {
        showMoreClicked.value = false;
      }

      interface Result {
        prompts: Object[];
        count: number;
      }

      const result = data.value && (data.value.result as Result);

      if (
        pastQueryTypeVal.value === queryType &&
        pastTimeRangeVal.value === timeRange
      ) {
        if (showMoreClicked.value) {
          if (result?.prompts) {
            promptsArr.value.push(...result?.prompts);
            if (promptsArr.value.length === result?.count) {
              isLimitHit.value = true;
            }
            isLoading.value = false;
            return result?.prompts;
          } else {
            isLoading.value = false;
            return undefined;
          }
        }
      }

      if (result?.prompts) {
        promptsArr.value = result?.prompts;
        if (promptsArr.value.length === result?.count) {
          isLimitHit.value = true;
        }
        if (promptsArr.value.length === 0) {
          noPrompts.noPromptsHandle();
        } else {
          noPrompts.noPromptsHandle(false);
        }
        isLoading.value = false;
        return result?.prompts;
      } else {
        isLoading.value = false;
        return undefined;
      }
    } catch (e) {
      console.error(e);
    }
  };

  return {
    getPrompts,
    promptsArr,
    increaseLimit,
    limit,
    handleisSearchCleared,
    resetShowMore,
    isLimitHit,
    isSearchInput,
    isLoading,
  };
});
