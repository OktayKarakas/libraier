<template>
  <div>
    <UserPromptsWriteTitle />
    <UserPromptsWriteBlock />
  </div>
</template>

<script setup>
definePageMeta({ middleware: "auth" });
</script>

<style scoped></style>
