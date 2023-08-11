<template>
  <div class="flex flex-col items-center">
    <div class="grid grid-cols-2 gap-[20px] w-[281px] mx-auto mb-[60px]">
      <div
        class="w-[130px] h-[143px] promptBlock text-center flex items-center cursor-pointer"
        v-for="prompt in filteredArr"
        :key="prompt.id"
      >
        <h3 class="text-white w-[103px] mx-auto promptText">
          {{ prompt.title }}
        </h3>
      </div>
    </div>
    <button
      class="bg-white rounded-full buttonParagraph px-[15px] py-[4px] mb-[50px]"
      @click="handleClick"
      v-if="limit < promptsArr.length - 1"
    >
      Show More
    </button>
  </div>
</template>

<script setup>
const promptsArr = [
  { id: 0, title: "Create Writing Prompts" },
  { id: 1, title: "Read Prompts" },
  { id: 2, title: "Create Writing Prompts" },
  { id: 3, title: "Read Prompts" },
  { id: 4, title: "Create Writing Prompts" },
  { id: 5, title: "Read Prompts" },
];
const limit = ref(1);
const filteredArr = computed(() => {
  return promptsArr.filter((item) => {
    return item.id <= limit.value;
  });
});
const handleClick = () => {
  limit.value += 2;
  console.log(limit.value);
};
</script>

<style scoped>
.promptBlock {
  background: linear-gradient(119.37deg, #09aead 32%, #3d3895 113.86%);
  box-shadow: 10px 8px 10px rgba(61, 56, 149, 0.4),
    -5px -4px 10px rgba(9, 174, 173, 0.4);
}
.promptText {
  font-family: "Rubik";
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 21px;
  text-align: center;
  color: #ffffff;
}
</style>
