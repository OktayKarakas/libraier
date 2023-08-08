<template>
  <div class="bg-black">
    <img
      src="~/assets/ui/footer/footer-logo.svg"
      class="mx-auto pt-12 pb-[70px]"
    />
    <div class="flex flex-col gap-5 text-white text-[12px] pl-10 pb-20">
      <div class="flex flex-col gap-2.5">
        <h3 @click="changeOpenStatus('isProductsOpen')">Products</h3>
        <div
          class="text-[10px] underline flex flex-col gap-2.5"
          v-if="reactiveVars.isProductsOpen.value"
        >
          <p class="text-[10px] underline">Prompts</p>
        </div>
      </div>
      <div class="flex flex-col gap-2.5">
        <h3 @click="changeOpenStatus('isAboutOpen')">About</h3>
        <div
          class="text-[10px] underline flex flex-col gap-2.5"
          v-if="reactiveVars.isAboutOpen.value"
        >
          <p class="text-[10px] underline">Who we are</p>
          <p class="text-[10px] underline">Why libraier</p>
        </div>
      </div>
      <div class="flex flex-col gap-2.5">
        <h3 @click="changeOpenStatus('isToolsOpen')">Tools</h3>
        <div
          class="text-[10px] underline flex flex-col gap-2.5"
          v-if="reactiveVars.isToolsOpen.value"
        >
          <p class="text-[10px] underline">Categorize Prompts</p>
          <p class="text-[10px] underline">Write Prompts</p>
          <p class="text-[10px] underline">Search Prompts</p>
        </div>
      </div>
      <div class="flex flex-col gap-2.5">
        <h3 @click="changeOpenStatus('isSupportOpen')">Support</h3>
        <div
          class="text-[10px] underline flex flex-col gap-2.5"
          v-if="reactiveVars.isSupportOpen.value"
        >
          <p>Help Section</p>
          <p>libraier@gmail.com</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const reactiveVars = {
  isProductsOpen: ref(false),
  isAboutOpen: ref(false),
  isToolsOpen: ref(false),
  isSupportOpen: ref(false),
};

function changeOpenStatus(refName) {
  const refVariable = reactiveVars[refName];
  if (refVariable !== undefined) {
    refVariable.value = !refVariable.value;
  }
}
</script>

<style></style>
