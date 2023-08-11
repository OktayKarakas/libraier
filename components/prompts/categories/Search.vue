<template>
  <div>
    <h3 class="heading text-[32px] font-bold text-center mb-[40px]">
      Categories
    </h3>
    <div class="flex flex-col items-center mb-[50px]">
      <div
        class="w-[281px] h-[45px] bg-white gap-5 flex items-center rounded-[10px] mx-auto"
      >
        <img
          src="~/assets/categories/SearchIcon.svg"
          class="w-[12px] h-[12px] ml-[12px]"
        />
        <input
          type="text"
          placeholder="Search"
          class="text-[14px] my-auto outline-none focus:ring-0"
        />
      </div>
      <div class="w-[281px] flex mt-[10px] mb-[3px] gap-[10px]">
        <div
          class="flex gap-[11px] items-center bg-white rounded-[5px] px-[10px] pt-[4px] pb-[2px] cursor-pointer"
        >
          <p class="text-[12px]">Top</p>
          <img
            src="~/assets/categories/downArrow.svg"
            alt="downArrow"
            class="w-[10px] h-[10px]"
          />
        </div>
        <div
          class="flex gap-[11px] items-center bg-white rounded-[5px] px-[10px] pt-[4px] pb-[2px] cursor-pointer"
        >
          <p class="text-[12px]">All Time</p>
          <img
            src="~/assets/categories/downArrow.svg"
            alt="downArrow"
            class="w-[10px] h-[10px]"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.heading {
  background: linear-gradient(103.68deg, #001c30 40.21%, #458782 101.71%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
</style>
