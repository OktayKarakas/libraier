<template>
  <NuxtLayout>
    <UiHeader />
    <NuxtPage />

    <UiFooter />
  </NuxtLayout>
</template>

<script setup>
const nuxtApp = useNuxtApp();

nuxtApp.hook("page:finish", () => {
  window.scrollTo(0, 0);
});
</script>
