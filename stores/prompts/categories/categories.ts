export const useNoCategoriesStore = defineStore("noCategories", {
  state: () => {
    return {
      noCategories: false,
    };
  },
  actions: {
    noCategoriesHandle(val = true) {
      this.noCategories = val;
    },
  },
});

export const useFetchCategories = defineStore("fetchCategories", () => {
  const categoriesArr: any = ref([]);
  const noCategories = useNoCategoriesStore();
  const limit = ref(2);
  const skip = ref(0);
  const showMoreClicked = ref(false);
  const pastTimeRangeVal = ref();
  const pastQueryTypeVal = ref();
  const isSearchCleared = ref(false);
  const isLimitHit = ref(false);
  const isSearchInput = ref(false);

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
    await getCategories(pastTimeRangeVal.value, pastQueryTypeVal.value);
  };

  const getCategories = async (
    timeRange: any,
    queryType: any,
    searchCategory: String = "",
    isSearchInputCleared: Boolean = false
  ) => {
    if (
      pastTimeRangeVal.value !== timeRange ||
      pastQueryTypeVal.value !== queryType
    ) {
      categoriesArr.value = [];
      skip.value = 0;
    }
    pastTimeRangeVal.value = timeRange;
    pastQueryTypeVal.value = queryType;
    isLimitHit.value = false;
    if (searchCategory) {
      isSearchInput.value = true;
    } else {
      isSearchInput.value = false;
    }
    try {
      const { data } = await useFetch("/api/user/prompts", {
        method: "GET",
        query: {
          getCategories: true,
          timeRange: timeRange,
          queryType: queryType,
          searchCategory: searchCategory,
          limit: Number(limit.value),
          skip: Number(skip.value),
          isSearchInputCleared: isSearchInputCleared,
        },
      });

      if (searchCategory || isSearchInputCleared) {
        showMoreClicked.value = false;
      }

      if (
        pastQueryTypeVal.value === queryType &&
        pastTimeRangeVal.value === timeRange
      ) {
        if (showMoreClicked.value) {
          if (data.value?.result?.categories) {
            categoriesArr.value.push(...data.value.result?.categories);
            if (categoriesArr.value.length === data.value?.result?.count) {
              isLimitHit.value = true;
            }
            return data.value.result.categories;
          } else {
            return undefined;
          }
        }
      }

      if (data.value?.result?.categories) {
        categoriesArr.value = data.value.result.categories;
        if (categoriesArr.value.length === 0) {
          noCategories.noCategoriesHandle();
        } else {
          noCategories.noCategoriesHandle(false);
        }
        return data.value.result.categories;
      } else {
        return undefined;
      }
    } catch (e) {
      console.error(e);
    }
  };

  return {
    getCategories,
    categoriesArr,
    increaseLimit,
    limit,
    handleisSearchCleared,
    resetShowMore,
    isLimitHit,
    isSearchInput,
  };
});
