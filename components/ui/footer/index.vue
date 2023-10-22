<template>
  <div class="bg-black lg:flex">
    <img
      src="~/assets/ui/footer/footer-logo.svg"
      class="mx-auto lg:mx-[60px] lg:pt-[40px] pt-12 pb-[70px]"
    />
    <div
      class="flex flex-col lg:flex-row lg:gap-[120px] lg:pt-[55px] lg:mx-auto lg:pl-0 gap-5 text-white text-[12px] pl-10 pb-20"
    >
      <div class="flex flex-col gap-2.5">
        <h3 class="lg:text-[16px]" @click="changeOpenStatus('isProductsOpen')">
          Products
        </h3>
        <div
          class="text-[10px] underline flex flex-col gap-2.5 lg:hidden"
          v-if="reactiveVars.isProductsOpen.value"
        >
          <NuxtLink to="/prompts/categories" class="text-[10px] underline"
            >Prompts</NuxtLink
          >
        </div>
        <div class="underline flex-col gap-2.5 hidden lg:flex">
          <NuxtLink
            to="/prompts/categories"
            class="text-[12px] underline cursor-pointer"
            >Prompts</NuxtLink
          >
        </div>
      </div>
      <div class="flex flex-col gap-2.5">
        <h3 class="lg:text-[16px]" @click="changeOpenStatus('isAboutOpen')">
          About
        </h3>
        <div
          class="text-[10px] underline flex flex-col gap-2.5 lg:hidden"
          v-if="reactiveVars.isAboutOpen.value"
        >
          <NuxtLink to="/about" class="text-[10px] underline"
            >Who we are</NuxtLink
          >
          <NuxtLink to="/about" class="text-[10px] underline"
            >Why libraier</NuxtLink
          >
        </div>
        <div class="underline flex-col gap-2.5 hidden lg:flex">
          <NuxtLink to="/about" class="text-[12px] underline cursor-pointer"
            >Who we are</NuxtLink
          >
          <NuxtLink to="/about" class="text-[12px] underline cursor-pointer"
            >Why libraier</NuxtLink
          >
        </div>
      </div>
      <div class="flex flex-col gap-2.5">
        <h3 class="lg:text-[16px]" @click="changeOpenStatus('isToolsOpen')">
          Tools
        </h3>
        <div
          class="text-[10px] underline flex flex-col gap-2.5 lg:hidden"
          v-if="reactiveVars.isToolsOpen.value"
        >
          <NuxtLink to="/prompts/categories" class="text-[10px] underline"
            >Categorize Prompts</NuxtLink
          >
          <NuxtLink to="/user/prompts/write" class="text-[10px] underline"
            >Write Prompts</NuxtLink
          >
          <NuxtLink to="/prompts/categories" class="text-[10px] underline"
            >Search Prompts</NuxtLink
          >
        </div>
        <div class="text-[12px] underline flex-col gap-2.5 hidden lg:flex">
          <NuxtLink
            to="/prompts/categories"
            class="text-[12px] underline cursor-pointer"
            >Categorize Prompts</NuxtLink
          >
          <NuxtLink to="/user/prompts/write" class="text-[12px] underline"
            >Write Prompts</NuxtLink
          >
          <NuxtLink to="/prompts/categories" class="text-[12px] underline"
            >Search Prompts</NuxtLink
          >
        </div>
      </div>
      <div class="flex flex-col gap-2.5">
        <h3 class="lg:text-[16px]" @click="changeOpenStatus('isSupportOpen')">
          Support
        </h3>
        <div
          class="text-[10px] underline flex flex-col gap-2.5 lg:hidden"
          v-if="reactiveVars.isSupportOpen.value"
        >
          <p>Help Section</p>
          <p>libraier@gmail.com</p>
        </div>
        <div class="text-[12px] flex-col gap-2.5 hidden lg:flex">
          <NuxtLink to="/help" class="cursor-pointer underline"
            >Help Section</NuxtLink
          >
          <p>libraier@gmail.com</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface ReactiveVars {
  isProductsOpen: Ref<boolean>;
  isAboutOpen: Ref<boolean>;
  isToolsOpen: Ref<boolean>;
  isSupportOpen: Ref<boolean>;
}
const reactiveVars: ReactiveVars = {
  isProductsOpen: ref(false),
  isAboutOpen: ref(false),
  isToolsOpen: ref(false),
  isSupportOpen: ref(false),
};

function changeOpenStatus(refName: keyof ReactiveVars) {
  const refVariable = reactiveVars[refName];
  if (refVariable !== undefined) {
    refVariable.value = !refVariable.value;
  }
}
</script>

<style></style>
