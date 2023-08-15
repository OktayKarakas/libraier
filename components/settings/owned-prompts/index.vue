<template>
  <div class="my-[58px]">
    <div class="border-b border-black mb-[7px] pb-[24px] borderOpacity">
      <h3
        class="text-[24px] font-bold leading-[28px] text-[#D9D9D9] ml-[17px] heading"
      >
        Related Prompts
      </h3>
    </div>
    <Carousel :items-to-show="2.6" :wrap-around="false">
      <Slide v-for="slides in 10" :key="slides">
        <div
          class="pt-[30px] pb-[50px] min-w-[113px] max-w-[113px] block carousel__item"
        >
          <p
            class="text-[18px] font-semibold leading-[21px] text-center text-white"
          >
            Creative Writing Prompts
          </p>
        </div>
      </Slide>
    </Carousel>
  </div>
</template>

<script>
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide } from "vue3-carousel";

export default {
  name: "WrapAround",
  components: {
    Carousel,
    Slide,
  },
};
</script>

<style scoped>
.block {
  background: linear-gradient(119.37deg, #09aead 32%, #3d3895 113.86%);
  box-shadow: 10px 8px 10px rgba(61, 56, 149, 0.2),
    -5px -4px 10px rgba(9, 174, 173, 0.2);
}
.borderOpacity {
  border-color: rgba(0, 0, 0, 0.3);
}
.heading {
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
</style>
