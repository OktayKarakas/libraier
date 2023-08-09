<template>
  <div class="px-[15px]">
    <div class="flex justify-between">
      <div class="pb-[27px] flex flex-col gap-[10px]">
        <label class="text-white text-[14px] font-normal" for="firstName"
          >First Name</label
        >
        <input
          type="text"
          name="firstName"
          id="firstName"
          v-model="formObj.firstName"
          class="w-[112px] border text-white border-[rgba(255,255,255,0.35)] bg-[#252525] rounded-[5px]"
        />
      </div>
      <div class="pb-[27px] flex flex-col gap-[10px]">
        <label class="text-white text-[14px] font-normal" for="firstName"
          >Last Name</label
        >
        <input
          type="text"
          name="lastName"
          id="lastName"
          v-model="formObj.lastName"
          class="w-[112px] border text-white border-[rgba(255,255,255,0.35)] bg-[#252525] rounded-[5px]"
        />
      </div>
    </div>
    <div class="flex flex-col gap-[10px] pb-[27px]">
      <label for="email" class="text-white text-[14px] font-normal"
        >Email</label
      >
      <input
        type="text"
        name="email"
        for="email"
        v-model="formObj.email"
        class="border text-white border-[rgba(255,255,255,0.35)] bg-[#252525] rounded-[5px]"
      />
    </div>
    <div class="flex flex-col gap-[10px] pb-[27px]">
      <label for="email" class="text-white text-[14px] font-normal"
        >Phone number</label
      >
      <input
        type="number"
        name="phoneNumber"
        for="phoneNumber"
        v-model="formObj.phoneNumber"
        class="border text-white border-[rgba(255,255,255,0.35)] bg-[#252525] rounded-[5px]"
      />
    </div>
    <div class="flex flex-col gap-[10px] pb-[25px]">
      <label for="message" class="text-white text-[14px] font-normal"
        >Message</label
      >
      <textarea
        id="message"
        name="message"
        v-model="formObj.message"
        class="h-[100px] resize-none border border-[rgba(255,255,255,0.35)] bg-[#252525] rounded-[5px] text-white"
      ></textarea>
    </div>
    <div class="flex justify-end">
      <button
        class="text-white text-[10px] px-[10px] py-[5px] text-center bg-[#0065FC] mb-5 rounded-[5px]"
        @click="Submit()"
      >
        Send Message
      </button>
    </div>
  </div>
</template>

<script setup>
const formObj = reactive({
  firstName: null,
  lastName: null,
  email: null,
  phoneNumber: null,
  message: null,
});
function Submit() {
  const plainFormObj = {};

  const formRefs = toRefs(formObj);
  //we need ref to access reactive elements value.

  for (const key in formRefs) {
    plainFormObj[key] = formRefs[key].value;
  }

  console.log(plainFormObj);
}
</script>

<style scoped></style>
