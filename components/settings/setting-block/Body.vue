<template>
  <div class="w-[259px] mx-auto bg-[#111827] mb-[108px] rounded-b-[5px]">
    <div class="flex flex-col gap-[23px] items-center pt-[48px] pb-[26px]">
      <div class="flex flex-col gap-[14px]">
        <label
          class="text-white headingShadow text-[14px] font-semibold leading-[20px]"
          >Full Name</label
        >
        <input
          class="bg-[#252525] text-white w-[190px] h-[31px] headingShadow border borderColor rounded-[5px]"
          type="text"
        />
      </div>
      <div class="flex flex-col gap-[14px]">
        <label
          class="text-white headingShadow text-[14px] font-semibold leading-[20px]"
          >Username</label
        >
        <input
          class="bg-[#252525] text-white w-[190px] h-[31px] headingShadow border borderColor rounded-[5px]"
          type="text"
        />
      </div>
      <div class="flex flex-col gap-[14px]">
        <label
          class="text-white headingShadow text-[14px] font-semibold leading-[20px]"
          >Email</label
        >
        <input
          class="bg-[#252525] text-white w-[190px] h-[31px] headingShadow border borderColor rounded-[5px]"
          type="text"
        />
      </div>
      <div class="flex flex-col gap-[14px]">
        <label
          class="text-white headingShadow text-[14px] font-semibold leading-[20px]"
          >Patreon Connection</label
        >
        <input
          class="bg-[#252525] text-white w-[190px] h-[55px] headingShadow border borderColor rounded-[5px]"
          type="text"
        />
      </div>
      <div class="flex flex-col gap-[14px]">
        <label
          class="text-white headingShadow text-[14px] font-semibold leading-[20px]"
          >Description</label
        >
        <textarea
          class="bg-[#252525] text-white w-[190px] h-[176px] headingShadow border borderColor rounded-[5px] px-2"
        ></textarea>
      </div>

      <div class="flex flex-col items-center gap-[20px]">
        <button
          class="text-white w-[115px] h-[25px] bg-[#0065FC] text-[10px] leading-[20px] rounded-[5px] headingShadow buttonShadow"
        >
          Save
        </button>
        <button
          class="text-white w-[115px] h-[25px] bg-[#BF0000] text-[10px] leading-[20px] rounded-[5px] headingShadow buttonShadow"
        >
          Remove Account
        </button>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.headingShadow {
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.borderColor {
  border-color: rgba(255, 255, 255, 0.35);
}
.buttonShadow {
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3),
    0px 1px 3px 1px rgba(0, 0, 0, 0.15);
}
</style>
