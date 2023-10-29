<template>
  <div>
    <div
      class="bg-black w-[275px] lg:w-[871px] h-[28px] mx-auto mt-[50px] rounded-tr-[15px] rounded-tl-[15px] relative"
    >
      <div class="absolute top-0 right-0 flex gap-2 mr-[17px] mt-[7px]">
        <div class="w-[13px] h-[13px] rounded-full bg-[#00CA4E]"></div>
        <div class="w-[13px] h-[13px] rounded-full bg-[#FFBD44]"></div>
        <div class="w-[13px] h-[13px] rounded-full bg-[#FF605C]"></div>
      </div>
    </div>
    <div
      class="background-color w-[275px] lg:w-[871px] h-[501px] mx-auto rounded-br-[15px] rounded-bl-[15px] code-block-shadow flex flex-col lg:hidden"
    >
      <LandingTryItNowCodeBlockInner
        firstEl="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        secondEl="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
      />
    </div>
    <div
      class="background-color hidden w-[275px] lg:w-[871px] h-[501px] mx-auto rounded-br-[15px] rounded-bl-[15px] code-block-shadow lg:grid lg:grid-cols-2"
    >
      <LandingTryItNowCodeBlockInner
        firstEl="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        secondEl="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
      />
      <LandingTryItNowCodeBlockInner
        firstEl="There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, "
        secondEl=" making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc"
      />
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
