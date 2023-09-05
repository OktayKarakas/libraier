<template>
  <div
    class="h-[250px] fixed top-[33%] left-0 right-0 bottom-0 z-50"
    :class="[isOpen ? 'block' : 'hidden']"
  >
    <div class="relative w-full max-w-2xl max-h-full mx-auto">
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <!-- Modal header -->
        <div
          class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600"
        >
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            Terms of Service
          </h3>
          <button
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            @click="() => closeModal()"
            data-modal-hide="defaultModal"
          >
            <svg
              class="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <div class="overflow-scroll h-[200px] w-full">
          <div class="p-6 space-y-6 z-50">
            <p
              class="text-base leading-relaxed text-gray-500 dark:text-gray-400"
            >
              1) Your photo will be uploaded to imgbb libraier's private
              account.
            </p>
            <p
              class="text-base leading-relaxed text-gray-500 dark:text-gray-400"
            >
              2) Private Photos should not be uploaded.Only upload the photos
              you would not mind people see.
            </p>
            <p
              class="text-base leading-relaxed text-gray-500 dark:text-gray-400"
            >
              3) Eventhough you remove your photo from the website your photo
              will still be on our image hosting server.If you accidentally
              uploaded a private photo contact us from the help page.
            </p>
            <p
              class="text-base leading-relaxed text-gray-500 dark:text-gray-400"
            >
              4) After you accept these conditions you can upload your photo.We
              are not responsible of privacy of your photo.
            </p>
            <p
              class="text-base leading-relaxed text-gray-500 dark:text-gray-400"
            >
              5) If you download a photo which is not belongs to you that photo
              might be removed.
            </p>
          </div>
        </div>
        <!-- Modal footer -->
        <div
          class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600"
        >
          <label
            for="profile-photo-upload"
            class="focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 text-white"
            :class="[loading ? 'bg-green-500' : 'bg-blue-800']"
          >
            <input
              type="file"
              id="profile-photo-upload"
              accept="image/*"
              style="display: none"
              ref="fileInput"
              @change="handleImageUpload"
            />
            <p>{{ loading ? "Loading" : "Accept" }}</p>
          </label>
          <button
            data-modal-hide="defaultModal"
            type="button"
            class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            @click="() => props.closeModal()"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { uuid } from "vue-uuid";
const { status, data } = useAuth();
// Define a ref to store the Data URL
const dataUrl = ref(null);

const config = useRuntimeConfig();
const imgApiKey = config.public.imgAPI;
const props = defineProps(["isOpen", "closeModal"]);
const loading = ref(false);

const handleImageUpload = (event) => {
  const selectedImageFile = event.target.files[0];

  if (selectedImageFile) {
    const reader = new FileReader();

    reader.onload = () => {
      const sendToImdbb = async () => {
        const formData = new FormData();
        formData.append("image", selectedImageFile); // Use the selected file directly
        loading.value = true;
        try {
          const { data, error, pending } = await useFetch(
            `https://api.imgbb.com/1/upload?key=${imgApiKey}&name=${uuid.v1()}`,
            {
              method: "POST",
              body: formData,
            }
          );
          if (!error.value) {
            if (data.value) {
              dataUrl.value = data.value.data.display_url;
              loading.value = false;
              await sendPatchReq(dataUrl.value);
              props.closeModal();
              window.location.reload();
            }
          } else {
            loading.value = false;
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
  async function sendPatchReq(url) {
    if (status.value === "authenticated") {
      const email = data.value.user.email;
      const { error } = await useFetch("/api/user/settings", {
        method: "PATCH",
        query: { email: email },
        body: {
          profilePhoto: url,
        },
      });
      if (error.value) {
        return;
      }
      return;
    }
  }
};
</script>

<style scoped></style>
