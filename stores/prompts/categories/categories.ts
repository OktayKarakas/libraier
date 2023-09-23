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
  const categoriesArr = ref([]);

  const getCategories = async (timeRange: any, queryType: any) => {
    try {
      const { data } = await useFetch("/api/user/prompts", {
        method: "GET",
        query: {
          getCategories: true,
          timeRange: timeRange,
          queryType: queryType,
        },
      });

      if (data.value?.result?.categories) {
        categoriesArr.value = data.value.result.categories;
        return data.value.result.categories;
      } else {
        return undefined;
      }
    } catch (e) {
      console.error(e);
    }
  };

  return { getCategories, categoriesArr };
});
