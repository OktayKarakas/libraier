<template>
  <div class="w-[300px] mx-auto bg-[#111827]">
    <div>
      <form>
        <div class="flex flex-col items-center gap-[20px] pt-[40px]">
          <label
            for="titleInput"
            class="text-white font-semibold text-[20px] leading-[20px] w-[253px]"
            >Title</label
          >
          <input
            id="titleInput"
            name="titleInput"
            class="bg-[#252525] border borderColorShadow w-[253px] h-[28px] text-white rounded-[5px]"
          />
        </div>
        <div class="flex flex-col items-center gap-[20px] pt-[40px]">
          <label
            for="titleInput"
            class="text-white font-semibold text-[20px] leading-[20px] w-[253px]"
            >Category</label
          >
          <div class="flex">
            <input
              id="titleInput"
              name="titleInput"
              class="bg-[#252525] border borderColorShadow w-[226px] h-[28px] text-white rounded-[5px] rounded-tr-[0px] rounded-br-[0px]"
            />
            <div
              class="w-[27px] h-[28px] border borderColor flex items-center justify-center rounded-tr-[5px] rounded-br-[5px] bg-[#252525]"
            >
              <img src="~/assets/user/icons/ChevronDown.svg" />
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.borderColorShadow {
  border: 1px solid rgba(255, 255, 255, 0.35);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
.borderColor {
  border: 1px solid rgba(255, 255, 255, 0.35);
}
</style>
