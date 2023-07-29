export const useHeaderOpen = defineStore("headerOpen", () => {
  const isHeaderOpen = ref(false);

  function changeHeaderStatus() {
    isHeaderOpen.value = !isHeaderOpen.value;
  }

  return { changeHeaderStatus, isHeaderOpen };
});
