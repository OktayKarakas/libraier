<template>
  <div class="w-[300px] mx-auto bg-[#111827] rounded-b-[5px] mb-[100px]">
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
            <div class="flex flex-col items-center gap-[20px] pt-[40px]">
              <label
                for="descriptionInput"
                class="text-white font-semibold text-[20px] leading-[20px] w-[253px]"
                >Description</label
              >
              <textarea
                id="descriptionInput"
                name="descriptionInput"
                class="bg-[#252525] border borderColor w-[253px] h-[419px] text-white rounded-[5px] resize-none"
              ></textarea>
            </div>
            <img
              v-if="sanitizedImageUrl"
              :src="sanitizedImageUrl"
              alt="Uploaded Image"
            />
          </div>
        </div>
        <div
          class="flex gap-[12px] justify-end w-[253px] mx-auto mt-[19px] pb-[37px]"
        >
          <button
            class="text-white bg-[#900000] w-[87px] h-[25px] text-[10px] leading[20px] font-medium rounded-[5px] borderShadow textShadow"
          >
            Reset
          </button>
          <button
            class="text-white bg-[#0065FC] w-[87px] h-[25px] text-[10px] leading[20px] font-medium rounded-[5px] borderShadow textShadow"
          >
            Post
          </button>
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
.borderShadow {
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3),
    0px 1px 3px 1px rgba(0, 0, 0, 0.15);
}
.textShadow {
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
</style>

/* Frame 71 */ /* Auto layout */ display: flex; flex-direction: row;
justify-content: center; align-items: center; padding: 10px; gap: 10px;
position: absolute; width: 87px; height: 25px; left: 180px; top: 1033px;
background: #0065FC; border-radius: 5px; /* Post */ width: 77px; height: 20px;
font-family: 'Rubik'; font-style: normal; font-weight: 500; font-size: 10px;
line-height: 20px; /* identical to box height, or 200% */ display: flex;
align-items: center; text-align: center; letter-spacing: 0.1px; color: #FFFFFF;
text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25); /* Inside auto layout */ flex:
none; order: 0; flex-grow: 0;
