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
        <label
          for="profile-photo-upload"
          class="bg-[#00CC99] py-[5px] px-[5px] rounded-[5px] min-w-[117px] cursor-pointer"
        >
          <input
            type="file"
            id="profile-photo-upload"
            accept="image/*"
            style="display: none"
            ref="fileInput"
            @change="handleImageUpload"
          />
          <p class="text-white text-[10px] font-semibold text-center">
            Change Profile Photo
          </p>
        </label>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const { data } = useAuth();
import { uuid } from "vue-uuid";
// Define a ref to store the Data URL
const dataUrl = ref(null);
const config = useRuntimeConfig();
const imgApiKey = config.public.imgAPI;

// Function to handle image upload
const handleImageUpload = (event) => {
  const selectedImageFile = event.target.files[0];

  if (selectedImageFile) {
    const reader = new FileReader();

    reader.onload = () => {
      const sendToImdbb = async () => {
        const formData = new FormData();
        formData.append("image", selectedImageFile); // Use the selected file directly

        try {
          const { data, error } = await useFetch(
            `https://api.imgbb.com/1/upload?key=${imgApiKey}&name=${uuid.v1()}`,
            {
              method: "POST",
              body: formData,
            }
          );
          if (!error.value) {
            dataUrl.value = data.value.data.display_url;
          } else {
            console.error("image error");
          }
        } catch (error) {
          console.error("Error Promise Image");
        }
      };
      sendToImdbb();
    };

    reader.readAsDataURL(selectedImageFile);
  }
};
</script>

<style scoped></style>
