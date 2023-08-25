<template>
  <div>
    <h3 class="heading text-[32px] font-bold text-center mb-[40px] mx-5">
      {{ routeBasedTitle }}
    </h3>
    <div class="flex flex-col items-center mb-[50px]">
      <div
        class="w-[281px] h-[45px] bg-white gap-5 flex items-center rounded-[10px] mx-auto"
      >
        <img
          src="~/assets/categories/searchIcon.svg"
          class="w-[12px] h-[12px] ml-[12px]"
        />
        <input
          type="text"
          placeholder="Search"
          class="text-[14px] my-auto outline-none border-0 focus:ring-0"
        />
      </div>
      <div class="w-[281px] flex mt-[10px] mb-[3px] gap-[10px]">
        <select
          class="custom-select text-[12px] bg-white rounded-[5px] pl-[10px] pt-[4px] pb-[2px] cursor-pointer"
        >
          <option value="top">Top</option>
          <option value="newest">Newest</option>
          <option value="popular">Popular</option>
        </select>
        <select
          class="text-[12px] bg-white rounded-[5px] pl-[10px] pt-[4px] pb-[2px] cursor-pointer"
        >
          <option value="all-time">All Time</option>
          <option value="past-month">Past Month</option>
          <option value="past-week">Past Week</option>
          <option value="past-day">Past Day</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const routeBasedTitle = computed(() => {
  const words = route.params.categoryId.split("-");
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

.no-appearance {
  appearance: none;
  -webkit-appearance: none;
  background: transparent;
  background-image: none;
}
</style>
