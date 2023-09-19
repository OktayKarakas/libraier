<template>
  <div class="w-[300px] mx-auto bg-[#111827] rounded-b-[5px] mb-[100px]">
    <div>
      <form @submit.prevent="sendForm">
        <div class="flex flex-col items-center gap-[20px] pt-[40px]">
          <label
            for="titleInput"
            class="text-white font-semibold text-[20px] leading-[20px] w-[253px]"
            >Title</label
          >
          <input
            id="titleInput"
            required
            name="titleInput"
            v-model="Title"
            class="bg-[#252525] border borderColor w-[253px] h-[28px] text-white rounded-[5px] px-[5px]"
          />
        </div>
        <div class="flex flex-col items-center gap-[20px] pt-[40px]">
          <label
            for="category"
            class="text-white font-semibold text-[20px] leading-[20px] w-[253px]"
            >Category</label
          >
          <div class="flex flex-col items-center">
            <div class="flex">
              <input
                id="category"
                name="category"
                class="bg-[#252525] border borderColor w-[226px] h-[28px] text-white rounded-[5px] rounded-tr-[0px] rounded-br-[0px] px-[5px]"
                @input="changeCategoryName"
                required
                :value="categoryName"
              />
              <div
                class="w-[27px] h-[28px] border borderColor flex items-center justify-center rounded-tr-[5px] rounded-br-[5px] bg-[#252525]"
              >
                <img src="~/assets/user/icons/ChevronDown.svg" />
              </div>
            </div>
            <div
              class="w-[251px] mx-auto bg-[#252525]"
              v-if="categoryName && !categoryPicked"
            >
              <div
                class="pl-[20px] py-[10px] border-b border-black cursor-pointer"
                v-if="!categoryExist"
                @click="createCategory"
              >
                <p class="text-white text-[8px] font-semibold">
                  Create "{{ categoryName }}" Category
                </p>
              </div>
              <div
                class="pl-[20px] py-[15px] border-b border-black"
                v-for="category in categories"
                :key="category.id"
                @click="handleCategoryClick(category.name)"
              >
                <p class="text-white text-[8px] font-semibold">
                  {{ category.name }}
                </p>
              </div>
            </div>
            <div class="flex flex-col items-center gap-[20px] pt-[40px]">
              <label
                for="tagInput"
                class="text-white font-semibold text-[20px] leading-[20px] w-[253px]"
                >Tags</label
              >
              <input
                id="tagInput"
                required
                name="tagInput"
                placeholder="CHAT GPT"
                disabled
                v-model="tags"
                class="bg-[#252525] border borderColor w-[253px] h-[28px] text-white rounded-[5px] px-[5px]"
              />
              <p class="text-white text-[9px]">
                For now prompts only available for chatgpt.
              </p>
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
            <div class="flex flex-col items-center gap-[20px] pt-[40px]">
              <label
                for="descriptionInput"
                class="text-white font-semibold text-[20px] leading-[20px] w-[253px]"
                >Description</label
              >
              <div
                class="bg-white border-b-4 border-black w-[253px]"
                @click="quillFocus(quillDescriptionRef)"
              >
                <QuillEditor
                  id="descriptionInput"
                  name="descriptionInput"
                  theme="snow"
                  class="bg-[#252525] text-white min-h-[300px]"
                  content-type="html"
                  v-model:content="description"
                  :options="toolbarOptions"
                  ref="quillDescriptionRef"
                />
              </div>
            </div>
            <div class="flex flex-col items-center gap-[20px] pt-[40px]">
              <label
                for="detailsInput"
                class="text-white font-semibold text-[20px] leading-[20px] w-[253px]"
                >Details</label
              >
              <div
                class="bg-white border-b-4 border-black w-[253px]"
                @click="quillFocus(quillDetailRef)"
              >
                <QuillEditor
                  id="detailsInput"
                  name="detailsInput"
                  theme="snow"
                  class="bg-[#252525] text-white min-h-[300px]"
                  content-type="html"
                  v-model:content="details"
                  :options="toolbarOptions"
                  ref="quillDetailRef"
                />
              </div>
            </div>
          </div>
        </div>
        <div
          class="flex gap-[12px] justify-end w-[253px] mx-auto mt-[19px] pb-[37px]"
        >
          <button
            class="text-white bg-[#900000] w-[87px] h-[25px] text-[10px] leading[20px] font-medium rounded-[5px] borderShadow textShadow"
            type="button"
            @click="handleReset"
          >
            Reset
          </button>
          <button
            class="text-white bg-[#0065FC] w-[87px] h-[25px] text-[10px] leading[20px] font-medium rounded-[5px] borderShadow textShadow"
            type="submit"
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
import { QuillEditor, Delta } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import "@vueup/vue-quill/dist/vue-quill.bubble.css";
const { status, data } = useAuth();

// const options = {
//   modules: {
//     toolbar: null,
//   },
//   readOnly: true,
//   theme: "bubble",
// };

const categoryName = ref("");
const categoryExistPost = ref(false);
const categoryExist = ref(false);
const categories = ref([]);
const Title = ref("");
const description = ref("");
const details = ref("");
const formError = ref(true);
const categoryPicked = ref(false);
const tags = ref("");
const postReqSuccess = ref(false);
const quillDetailRef = ref(null);
const quillDescriptionRef = ref(null);

const quillFocus = (quillData) => {
  if (quillData) {
    quillData.focus();
  }
};

const toolbarOptions = {
  modules: {
    toolbar: [
      ["bold", "italic", "underline", "strike"], // toggled buttons
      ["blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }], // superscript/subscript
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],
    ],
  },
};

async function sendForm() {
  if (!description.value || !Title.value || !categoryName.value) {
    formError.value = true;
  } else {
    formError.value = false;
  }
  if (!formError.value) {
    const trimmedName = categoryName.value.trim().toLowerCase();
    const nameWithoutMultipleSpaces = trimmedName.replace(/\s{2,}/g, " ");
    const nameArr = nameWithoutMultipleSpaces.split(" ");
    const name = nameArr.join("_");
    const { data: categoryData } = await useFetch("/api/user/prompts", {
      method: "GET",
      query: { getCategory: true, categoryTitle: name },
    });

    if (categoryData?.value?.result?.categories) {
      const categoryId = categoryData.value.result.categories.find((item) => {
        return item.name === name;
      });
      const sanitizedDescription = DOMPurify.sanitize(description.value);
      const sanitizedDetails = DOMPurify.sanitize(details.value);
      if (categoryId?.id) {
        const sendData = {
          title: Title.value,
          description: sanitizedDescription,
          price: 0,
          tagId: ["7e96c5ab-18e8-47bc-8ed8-bd01dce437d2"],
          details: sanitizedDetails,
          categoryName: categoryName.value,
          categoryId: categoryId.id,
        };
        const { status } = await useFetch("/api/user/prompts", {
          method: "POST",
          body: sendData,
          query: { email: data.value.user.email, postPrompt: true },
        });
        if (status.value === "success") {
          postReqSuccess.value = true;
          ElNotification({
            title: "Prompt has been created.",
            message: "Click to see your prompt",
            onClick: () => {
              console.log("toast clicked!");
              return;
            },
            duration: 2000,
            type: "success",
          });
          handleReset();
        } else {
          postReqSuccess.value = false;
        }
      }
    }
  }
}

const handleCategoryClick = (categoryParName) => {
  categoryPicked.value = true;
  categoryName.value = categoryParName;
};

function scrollToTop() {
  window.scrollTo(0, 0);
}

const handleReset = () => {
  if (!postReqSuccess.value) {
    ElNotification({
      title: "Info",
      message: "Data has been reset.",
      duration: 2000,
      type: "info",
    });
  }
  Title.value = "";
  description.value = `<p></p>`;
  categoryName.value = "";
  categoryPicked.value = false;
  categoryExist.value = false;
  categoryExistPost.value = false;
  categories.value = [];
  formError.value = true;
  details.value = "<p></p>";
  postReqSuccess.value = false;
  scrollToTop();
};

watchDebounced(
  categoryName,
  async () => {
    await fetchCategories();
    const categoryExists = categories.value.some((item) => {
      return item.name.toLowerCase() === categoryName.value.toLowerCase();
    });
    categoryExist.value = categoryExists;
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
  categoryPicked.value = false;
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
