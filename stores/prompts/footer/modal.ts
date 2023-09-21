export const useFooterModalOpenStore = defineStore("promptFooterModalOpen", {
  state: () => {
    return {
      isModalOpen: false,
    };
  },
  actions: {
    modalHandler(statusVal: String) {
      if (statusVal.toLowerCase() === "close") {
        this.isModalOpen = false;
      } else {
        this.isModalOpen = true;
      }
    },
  },
});
