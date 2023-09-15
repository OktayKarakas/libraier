<template>
  <NuxtLayout>
    <div>
      <NuxtLoadingIndicator />
      <div>
        <UiHeader />
        <NuxtPage />
        <UiFooter />
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
const nuxtApp = useNuxtApp();

nuxtApp.hook("page:finish", () => {
  window.scrollTo(0, 0);
});
</script>
