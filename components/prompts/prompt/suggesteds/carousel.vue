<template>
  <Carousel :items-to-show="2.6" :wrap-around="false">
    <Slide v-for="slide in data" :key="slide.id">
      <div
        class="pt-[30px] pb-[50px] min-w-[113px] max-w-[113px] min-h-[143px] max-h-[143px] block carousel__item overflow-hidden text-center flex-wrap items-center cursor-pointer"
        @click="handleClick(slide.categoryName, slide.id, slide.title)"
      >
        <p
          class="text-[18px] font-semibold leading-[21px] text-center text-white"
        >
          {{ handlePromptName(slide.title) }}
        </p>
      </div>
    </Slide>
  </Carousel>
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

<script setup>
const props = defineProps(["data"]);
const data = props.data.value.result.categories;

const handlePromptName = (name) => {
  const words = name.split(" ");
  const formattedName = words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return formattedName;
};

const handleClick = async (categoryName, promptId, promptName) => {
  await navigateTo(`/prompts/prompt/${categoryName}/${promptId}/${promptName}`);
};
</script>

<style scoped>
.block {
  background: linear-gradient(119.37deg, #09aead 32%, #3d3895 113.86%);
  box-shadow: 10px 8px 10px rgba(61, 56, 149, 0.2),
    -5px -4px 10px rgba(9, 174, 173, 0.2);
}
</style>
