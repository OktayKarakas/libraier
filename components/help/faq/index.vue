<template>
  <div class="mt-[55px] mb-[80px]">
    <div class="w-[265px] lg:w-[746px] mx-auto">
      <div>
        <h3
          class="w-[186px] lg:w-auto text-[18px] font-bold leading-[21px] heading lg:text-[24px]"
        >
          Frequently asked questions
        </h3>
      </div>

      <div class="w-[264px] lg:w-[648px]">
        <div v-for="(faq, index) in faqs" :key="index">
          <div class="heading-container">
            <div
              class="flex items-center justify-between"
              @click="handleClick(index)"
            >
              <h4
                class="heading text-[14px] font-semibold leading-[17px] w-[85%] lg:text-[16px] lg:font-semibold"
              >
                {{ faq.question }}
              </h4>
              <div
                class="w-[20px] h-[1px] bg-black opacity-[44%]"
                v-if="!reactiveElements[index].showPlus"
              ></div>
              <div v-if="reactiveElements[index].showPlus" class="relative">
                <div
                  class="center-line border-black border-1 rounded-md opacity-[44%]"
                ></div>
                <div
                  class="w-[14px] h-[1px] bg-black rotate-90 border-black border-1 rounded-md opacity-[44%]"
                ></div>
              </div>
            </div>
            <p
              class="w-full text-[12px] leading-[14px] mt-[18px] lg:text-[16px] lg:leading-none"
              v-if="reactiveElements[index].showAnswer"
            >
              {{ faq.answer }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const faqs = [
  {
    question: "What is the best thing about turkey?",
    answer:
      "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  },
  {
    question: "What is the best thing about Germany?",
    answer:
      "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  },
  // Add more FAQ objects as needed
];

const reactiveElements = faqs.map(() =>
  reactive({
    showPlus: false,
    showAnswer: false,
  })
);

function handleClick(index) {
  reactiveElements[index].showAnswer = !reactiveElements[index].showAnswer;
  reactiveElements[index].showPlus = !reactiveElements[index].showPlus;
}
</script>

<style scoped>
.heading {
  background: linear-gradient(103.68deg, #001c30 40.21%, #458782 101.71%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.heading-container::before {
  content: "";
  display: block;
  width: 100%;
  height: 1px;
  background-color: #000;
  opacity: 44%;
  margin-top: 15px;
  margin-bottom: 10px;
}

.center-line {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  width: 14px;
  height: 1px;
  background-color: black;
}
</style>
