<template>
  <div>
    <UserSettingsSettingBlock />
  </div>
</template>

<script setup>
definePageMeta({
  middleware: [
    function (to, from) {
      const { status } = useAuth();
      if (status.value !== "authenticated") {
        return navigateTo("/");
      }
    },
  ],
});
async function navigateUser() {
  await navigateTo({ path: "/prompts/categories" });
}
</script>

<style scoped>
.headingShadow {
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
</style>
