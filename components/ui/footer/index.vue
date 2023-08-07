<template>
  <div class="bg-black">
    <img
      src="~/assets/ui/footer/footer-logo.svg"
      class="mx-auto pt-12 pb-[70px]"
    />
    <div class="flex flex-col gap-5 text-white text-[12px] pl-10 pb-20">
      <div class="flex flex-col gap-2.5">
        <h3 @click="changeOpenStatus('isProcutsOpen')">Products</h3>
        <div
          class="text-[10px] underline flex flex-col gap-2.5"
          v-if="getRefValue('isProcutsOpen')"
        >
          <p class="text-[10px] underline">Prompts</p>
        </div>
      </div>
      <div class="flex flex-col gap-2.5">
        <h3 @click="changeOpenStatus('isAboutOpen')">About</h3>
        <div
          class="text-[10px] underline flex flex-col gap-2.5"
          v-if="getRefValue('isAboutOpen')"
        >
          <p class="text-[10px] underline">Who we are</p>
          <p class="text-[10px] underline">Why libraier</p>
        </div>
      </div>
      <div class="flex flex-col gap-2.5">
        <h3 @click="changeOpenStatus('isToolsOpen')">Tools</h3>
        <div
          class="text-[10px] underline flex flex-col gap-2.5"
          v-if="getRefValue('isToolsOpen')"
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
          v-if="getRefValue('isSupportOpen')"
        >
          <p>Help Section</p>
          <p>libraier@gmail.com</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const reactiveVars = new Map([
  ["isProcutsOpen", ref(false)],
  ["isAboutOpen", ref(false)],
  ["isToolsOpen", ref(false)],
  ["isSupportOpen", ref(false)],
]);

function changeOpenStatus(refName) {
  const refVariable = reactiveVars.get(refName);
  if (refVariable !== undefined && refVariable) {
    refVariable.value = !refVariable.value;
  }
}

function getRefValue(refName) {
  const refVariable = reactiveVars.get(refName);
  return refVariable !== undefined ? refVariable.value : false;
}
</script>

<style></style>
