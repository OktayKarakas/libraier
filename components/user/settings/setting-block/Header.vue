<template>
  <div>
    <div
      class="pt-[15px] h-auto bg-[#121A2A] max-w-[259px] mx-auto rounded-t-[5px]"
    >
      <div class="flex flex-col gap-[20px] items-center">
        <!-- Display the user's profile image if available, else use a default image -->
        <img
          v-if="data?.user.image"
          :src="data?.user.image"
          class="w-[37px] h-[37px] rounded-full object-cover"
        />
        <img
          v-else
          src="~/assets/user/user-template-photo-setting.jpg"
          class="w-[37px] h-[37px] rounded-full object-cover"
        />
        <button
          class="bg-black py-[5px] px-[5px] rounded-[5px] min-w-[117px]"
          @click="handleRemoveButton"
        >
          <p class="text-white text-[10px] font-semibold text-center">
            Remove Profile Photo
          </p>
        </button>
        <!-- Use the label and input for image upload -->
        <button
          class="bg-[#00CC99] py-[5px] px-[5px] rounded-[5px] min-w-[117px] cursor-pointer text-white text-[10px] font-semibold text-center"
          @click="() => props.openModal()"
        >
          Change Profile Photo
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const { data } = useAuth();
const props = defineProps(["openModal", "closeModal"]);
</script>

<style scoped></style>
