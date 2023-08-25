<template>
  <div>
    <LandingHero />
    <LandingEmpowerWithAi />
    <LandingTryItNow />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { initFlowbite } from "flowbite";
onMounted(() => {
  initFlowbite();
});
</script>

<style>
.paragraphColor {
  color: #111827;
}
</style>
