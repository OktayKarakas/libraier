<template>
  <div class="pt-[18px]">
    <div class="w-[208px] lg:w-[397px] h-[31px] bg-black mx-auto"></div>
    <div class="w-[208px] lg:w-[397px] h-[188px] background mx-auto">
      <p class="truncate px-5">{{ props.secondEl }}</p>
    </div>
  </div>
  <div class="pt-[14px] lg:pt-[18px]">
    <div class="w-[208px] lg:w-[397px] h-[31px] bg-black mx-auto"></div>
    <div class="w-[208px] lg:w-[397px] h-[188px] background mx-auto">
      <p class="truncate px-5">{{ props.firstEl }}</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["firstEl", "secondEl"]);
</script>

<style scoped>
.background {
  background-color: rgba(51, 51, 51, 0.53);
}
.truncate {
  max-height: 100%; /* Set your desired max height here */
  overflow-y: scroll;
  overflow-x: hidden;
  white-space: pre-wrap;
  text-overflow: ellipsis;
  word-wrap: break-word;
  scrollbar-width: thin;
  scrollbar-color: #000000 #f0f0f0;
}

.truncate::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #f5f5f5;
}

.truncate::-webkit-scrollbar {
  width: 6px;
  background-color: #f5f5f5;
}

.truncate::-webkit-scrollbar-thumb {
  background-color: #000000;
}
</style>
