<template>
  <div class="mb-[29px]">
    <div class="flex flex-col items-center">
      <div class="w-[200px]">
        <h3 class="text-[12px] font-bold italic leading-[14px] categoryHeading">
          {{ routeBasedTitle }} /
        </h3>
      </div>
      <h1
        class="w-[210px] max-w-[210px] max-h-[200px] text-[32px] font-bold text-center leading-[38px] heading text"
      >
        {{ handlePromptName(promptName) }}
      </h1>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["promptData"]);
const route = useRoute();

const promptName = route.params.promptName;

const handlePromptName = (name) => {
  const words = name.split(" ");
  const formattedName = words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return formattedName;
};

const routeBasedTitle = computed(() => {
  const words = route.params.categoryId.split("_");
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );
  return capitalizedWords.join(" ");
});
</script>

<style scoped>
.heading {
  background: linear-gradient(103.68deg, #001c30 40.21%, #458782 101.71%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.text {
  text-overflow: ellipsis;
  word-wrap: break-word;
  overflow: hidden;
}
.categoryHeading {
  background: linear-gradient(103.68deg, #001c30 40.21%, #458782 101.71%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style>
