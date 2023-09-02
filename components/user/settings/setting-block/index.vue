<template>
  <div>
    <UserSettingsSettingBlockHeader
      :openModal="openModal"
      :closeModal="closeModal"
    />
    <UserSettingsSettingBlockBody />
    <UserSettingsSettingBlockModal
      :isOpen="isModalOpen"
      :closeModal="closeModal"
    />
  </div>
</template>

<script setup>
const isModalOpen = ref(false);

function openModal() {
  isModalOpen.value = true;
}

function closeModal() {
  isModalOpen.value = false;
}
</script>

<style scoped></style>
