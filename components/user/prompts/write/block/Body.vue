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
                :value="categoryName"
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
                v-if="!categoryExist"
              >
                <p class="text-white text-[8px] font-semibold">
                  Create "{{ categoryName }}" Category
                </p>
              </div>
              <div
                class="pl-[20px] py-[10px] border-b border-black"
                v-for="category in categories"
                :key="category.id"
              >
                <p class="text-white text-[8px] font-semibold">
                  {{ category.name }}
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
                class="w-[251px] h-[81px] bg-[#252525] border borderColor rounded-[5px] cursor-pointer"
                @dragover.prevent="onDragOver"
                @drop.prevent="onDrop"
              >
                <div>
                  <div
                    class="mx-auto w-[122px] flex flex-col items-center pt-[18px] gap-[4px]"
                  >
                    <img src="~/assets/user/icons/Plus.svg" />
                    <p
                      class="font-semibold text-[8px] leading-[20px] text-center text-[#666666]"
                    >
                      Drag and Drop or Select Image
                    </p>
                  </div>
                </div>
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
import { watchDebounced } from "@vueuse/core";
const { status, data } = useAuth();

const categoryName = ref("");
const categoryExistPost = ref(false);
const categoryExist = ref(false);
const categories = ref([]);

watchDebounced(
  categoryName,
  () => {
    fetchCategories();
  },
  { debounce: 500, maxWait: 850 }
);

async function fetchCategories() {
  const { data: dbData, error } = await useFetch("/api/user/prompts", {
    method: "GET",
    query: { categoryTitle: categoryName.value, getCategory: true },
  });
  if (error.value) {
    return;
  }
  categories.value = dbData?.value?.result?.categories;
}

const changeCategoryName = (event) => {
  const element = event.target.value.trim();
  if (element !== "") {
    categoryName.value = element;
  } else {
    categoryName.value = "";
  }
};

const createCategory = async () => {
  if (status.value === "authenticated") {
    const { data: dbData, error } = await useFetch("/api/user/prompts", {
      method: "POST",
      query: { email: data.value.user.email, category_create: true },
      body: {
        name: categoryName.value,
      },
    });
    if (error.value) {
      categoryName.value = "";
      return;
    }
    if (dbData?.value?.result?.json?.error === "category_exist") {
      categoryExistPost.value = true;
      categoryName.value = "";
      return;
    }
    categoryName.value = "";
  }
  categoryExist.value = false;
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
