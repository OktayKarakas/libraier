<template>
  <div
    class="w-full pl-2 pr-2.5 pt-5 flex justify-between mb-[63px] items-center"
  >
    <img
      src="~/assets/ui/header/logo-mobile.svg"
      @click="async () => await navigateTo('/')"
      class="cursor-pointer"
    />
    <img
      v-if="!isHeaderOpen"
      @click="store.changeHeaderStatus"
      src="~/assets/ui/header/menu-mobile.svg"
      class="w-[24px] cursor-pointer fixed top-[25px] right-2"
    />
    <img
      v-if="isHeaderOpen"
      @click="store.changeHeaderStatus"
      src="~/assets/ui/header/menu-mobile-close.svg"
      class="w-[24px] cursor-pointer fixed top-[25px] right-2"
    />
  </div>
</template>

<script setup>
import { useHeaderOpen } from "~/stores/ui/header.ts";
const store = useHeaderOpen();
const isHeaderOpen = computed(() => store.isHeaderOpen);
</script>

<style></style>
