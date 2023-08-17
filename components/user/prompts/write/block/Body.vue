<template>
  <div class="w-[300px] mx-auto bg-[#111827]">
    <div>
      <form>
        <div class="flex flex-col items-center gap-[20px] pt-[40px]">
          <label
            for="titleInput"
            class="text-white font-semibold text-[20px] leading-[20px] w-[253px]"
            >Title</label
          >
          <input
            id="titleInput"
            name="titleInput"
            class="bg-[#252525] border borderColor w-[253px] h-[28px] text-white rounded-[5px]"
          />
        </div>
        <div class="flex flex-col items-center gap-[20px] pt-[40px]">
          <label
            for="category"
            class="text-white font-semibold text-[20px] leading-[20px] w-[253px]"
            >Category</label
          >
          <div>
            <div class="flex">
              <input
                id="titleInput"
                name="category"
                class="bg-[#252525] border borderColor w-[226px] h-[28px] text-white rounded-[5px] rounded-tr-[0px] rounded-br-[0px]"
                @input="changeCategoryName"
              />
              <div
                class="w-[27px] h-[28px] border borderColor flex items-center justify-center rounded-tr-[5px] rounded-br-[5px] bg-[#252525]"
              >
                <img src="~/assets/user/icons/ChevronDown.svg" />
              </div>
            </div>
            <div class="w-[251px] mx-auto bg-[#252525]" v-if="categoryName">
              <div
                class="pl-[20px] py-[10px] border-b border-black"
                @click="createCategory"
              >
                <p class="text-white text-[8px] font-semibold">
                  Create "{{ categoryName }}" Category
                </p>
              </div>
              <div class="pl-[20px] py-[10px] border-b border-black">
                <p class="text-white text-[8px] font-semibold">
                  Smart Brain Solves
                </p>
              </div>
            </div>
            <div class="flex flex-col items-center gap-[20px] pt-[40px]">
              <p
                class="text-white font-semibold text-[20px] leading-[20px] w-[251px]"
              >
                Thumbnail Image
              </p>
              <label
                for="ThumbnailImage"
                class="w-[251px] h-[81px] bg-[#252525] border borderColor rounded-[5px]"
                @dragover.prevent="onDragOver"
                @drop.prevent="onDrop"
              >
              </label>
              <input
                ref="fileInput"
                id="ThumbnailImage"
                name="ThumbnailImage"
                type="file"
                accept="image/*"
                @change="handleFileInput"
                style="display: none"
              />
            </div>
            <img
              v-if="sanitizedImageUrl"
              :src="sanitizedImageUrl"
              alt="Uploaded Image"
            />
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import DOMPurify from "dompurify";

const categoryName = ref(false);

const changeCategoryName = (event) => {
  const element = event.target.value.trim();
  if (element !== "") {
    categoryName.value = element;
  } else {
    categoryName.value = false;
  }
};

const createCategory = () => {
  console.log(categoryName.value);
};

const imageUrl = ref("");
const sanitizedImageUrl = ref("");

const onDragOver = (event) => {
  event.preventDefault();
};

const onDrop = (event) => {
  event.preventDefault();
  const files = event.dataTransfer.files;
  handleImage(files[0]);
};

const handleFileInput = (event) => {
  const file = event.target.files[0];
  handleImage(file);
};

const handleImage = (file) => {
  if (!file) return;

  if (!file.type.startsWith("image/")) {
    console.error("Invalid file type. Please upload an image.");
    return;
  }

  const reader = new FileReader();
  reader.onload = (event) => {
    imageUrl.value = event.target.result;

    const sanitizedUrl = DOMPurify.sanitize(imageUrl.value);
    sanitizedImageUrl.value = sanitizedUrl;
  };
  reader.readAsDataURL(file);
};
</script>

<style scoped>
.borderColor {
  border: 1px solid rgba(255, 255, 255, 0.35);
}
</style>
