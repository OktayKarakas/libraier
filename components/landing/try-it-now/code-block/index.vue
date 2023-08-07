<template>
  <div>
    <div
      class="bg-black w-[275px] h-[28px] mx-auto mt-[50px] rounded-tr-[15px] rounded-tl-[15px] relative"
    >
      <div class="absolute top-0 right-0 flex gap-2 mr-[17px] mt-[7px]">
        <div class="w-[13px] h-[13px] rounded-full bg-[#00CA4E]"></div>
        <div class="w-[13px] h-[13px] rounded-full bg-[#FFBD44]"></div>
        <div class="w-[13px] h-[13px] rounded-full bg-[#FF605C]"></div>
      </div>
    </div>
    <div
      class="background-color w-[275px] h-[501px] mx-auto rounded-br-[15px] rounded-bl-[15px] code-block-shadow"
    >
      <LandingTryItNowCodeBlockInner />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.background-color {
  background-image: linear-gradient(
      307.26deg,
      rgba(141, 0, 102, 0.61) 0%,
      rgba(0, 0, 0, 0) 70.99%
    ),
    linear-gradient(
      163.39deg,
      rgba(255, 189, 68, 0.87) 5.17%,
      rgba(255, 189, 68, 0) 88.51%,
      rgba(255, 189, 68, 0) 88.51%
    );
  filter: drop-shadow(50px 30px 100px rgba(83, 11, 139, 0.37))
    drop-shadow(-33px -30px 100px rgba(222, 181, 73, 0.37));
}
</style>
