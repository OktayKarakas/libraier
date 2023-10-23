<template>
  <div class="mt-14 mx-[51px]">
    <div class="w-[231px] lg:w-[1176px] mx-auto">
      <!-- first part -->
      <div class="mb-[50px] lg:flex lg:flex-row-reverse lg:items-center">
        <img
          src="~/assets/about/first-image.jpg"
          alt="book-1"
          class="h-[329px] w-[231px] mx-auto mb-[33px] lg:w-[444px] lg:h-[633px]"
        />
        <div>
          <h3
            class="text-[32px] font-bold text-center heading leading-9 mb-[22px] lg:text-[60px] lg:text-left lg:font-bold lg:leading-none"
          >
            We’re creating the library of future humanity.
          </h3>
          <p
            class="text-[14px] font-normal text-center lg:text-left lg:text-[18px] lg:max-w-[642px] leading-6 text-[#111827]"
          >
            <span class="shadow">
              Welcome to the Library of Future Humanity, an innovative app
              designed to harness the limitless potential of ChatGPT in guiding
              and assisting users in every aspect of their lives. This app
              serves as a gateway to a vast repository of knowledge, wisdom, and
              personalized insights, specifically tailored to meet the diverse
              needs of individuals and communities.
            </span>
          </p>
        </div>
      </div>
      <!-- second part -->
      <div class="mb-[50px] lg:flex lg:items-center lg:gap-8">
        <img
          src="~/assets/about/second-image.jpg"
          alt="book-1"
          class="h-[329px] w-[231px] mx-auto mb-[33px] lg:w-[455px] lg:h-[702px]"
        />
        <div>
          <h3
            class="text-[32px] font-bold text-center heading leading-9 mb-[22px] lg:text-left lg:text-[42px]"
          >
            Our Mission
          </h3>
          <p
            class="text-[14px] font-normal text-center leading-6 text-[#111827] lg:text-left lg:text-[18px]"
          >
            <span class="shadow">
              Welcome to the Library of Future Humanity, an innovative app
              designed to harness the limitless potential of ChatGPT in guiding
              and assisting users in every aspect of their lives. This app
              serves as a gateway to a vast repository of knowledge, wisdom, and
              personalized insights, specifically tailored to meet the diverse
              needs of individuals and communities.
            </span>
          </p>
        </div>
      </div>
      <!-- third part -->
      <div>
        <div class="mb-[30px]">
          <h3
            class="text-[32px] font-bold text-center heading leading-9 mb-[22px] lg:text-[42px]"
          >
            Our Team
          </h3>
          <p
            class="text-[14px] font-normal text-center leading-6 text-[#111827] lg:text-[18px] lg:max-w-[627px] lg:text-center lg:mx-auto"
          >
            Sit facilis neque ab nulla vel. Cum eos in laudantium. Temporibus
            eos totam in dolorum. Nemo vel facere repellendus ut eos dolores
            similique.
          </p>
        </div>
        <div class="mb-[70px]">
          <div
            class="bg-[#D9D9D9] rounded-full w-[90px] h-[90px] mx-auto mb-[18px]"
          ></div>
          <!-- later you need to check if img exists.if it does then use it instead of div.Use div as loading indicator. -->
          <p
            class="text-[18px] leading-[30px] text-center text-white font-medium mb-[18px]"
          >
            Oktay Karakaş
          </p>
          <p class="text-center font-medium text-[#D9D9D9] leading-[30px]">
            Founder / CTO
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: "Libraier | About",
});
</script>

<style coped>
.heading {
  background: linear-gradient(103.68deg, #001c30 40.21%, #458782 101.71%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.shadow {
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
</style>
