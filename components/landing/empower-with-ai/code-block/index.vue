<template>
  <div>
    <!-- code-block-header -->
    <div
      class="bg-black w-[275px] h-[28px] mx-auto mt-[50px] rounded-tr-[5px] rounded-tl-[5px] relative"
    >
      <div class="absolute top-0 right-0 flex gap-2 mr-[17px] mt-[7px]">
        <div class="w-[13px] h-[13px] rounded-full bg-[#00CA4E]"></div>
        <div class="w-[13px] h-[13px] rounded-full bg-[#FFBD44]"></div>
        <div class="w-[13px] h-[13px] rounded-full bg-[#FF605C]"></div>
      </div>
    </div>
    <!-- code-block-body -->
    <div
      class="bg-[#333333] opacity-[53%] w-[275px] h-[544px] mx-auto rounded-br-[5px] rounded-bl-[5px] code-block-shadow"
    ></div>
    <div
      class="custom-bg w-[228px] h-[410px] mx-auto rounded-br-[5px] rounded-bl-[5px] z-10 mt-[-445px] code-block-shadow relative"
    >
      <div
        class="bg-black w-[228px] h-[26px] mx-auto mt-[50px] rounded-tr-[5px] rounded-tl-[5px] relative"
      >
        <div class="absolute top-0 right-0 flex gap-2 mr-[17px] mt-[7px]">
          <div class="w-[13px] h-[13px] rounded-full bg-[#00CA4E]"></div>
          <div class="w-[13px] h-[13px] rounded-full bg-[#FFBD44]"></div>
          <div class="w-[13px] h-[13px] rounded-full bg-[#FF605C]"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.code-block-shadow {
  -webkit-box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  -moz-box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
}
.custom-bg {
  background-color: rgba(0, 28, 48, 0.45);
}
</style>
