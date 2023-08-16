<template>
  <div>
    <UserSettingsSettingBlock />
    <UserSettingsCreatedPrompts />
    <UserSettingsOwnedPrompts />
    <div class="flex mb-[94px]">
      <button
        class="text-[#001C30] w-[134px] h-[40px] bg-white rounded-full text-[12px] font-bold leading-[20px] headingShadow py-[10px] px-[12px] mx-auto"
        @click="navigateUser"
      >
        See All Categories
      </button>
    </div>
  </div>
</template>

<script setup>
async function navigateUser() {
  await navigateTo({ path: "/prompts/categories" });
}
</script>

<style scoped>
.headingShadow {
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
</style>
