<template>
  <div class="w-[299px] h-auto min-h-[82px] bg-black mx-auto">
    <div class="py-[17px] px-[14px]">
      <!-- top -->
      <div class="w-full flex justify-between items-center">
        <!-- top left -->
        <div class="flex flex-wrap gap-[5px] max-w-[140px]">
          <div
            class="flex gap-[6px] bg-white px-[5px] py-[1px] rounded-[2px] items-center w-[71px] h-[16px]"
            v-if="props.promptData.result.prompts.approved"
          >
            <p class="text-[10px]">Approved</p>
            <img
              src="~/assets/prompt/approved.svg"
              class="w-[10px] h-[10px] mb-[1px]"
            />
          </div>
          <div
            class="flex gap-[6px] bg-white px-[5px] py-[1px] rounded-[2px] items-center w-[71px] h-[16px]"
          >
            <p class="text-[10px]">Approved</p>
            <img
              src="~/assets/prompt/approved.svg"
              class="w-[10px] h-[10px] mb-[1px]"
            />
          </div>
        </div>
        <!-- top right -->
        <div>
          <p class="text-white text-[10px]">Updated: 1 week ago</p>
        </div>
      </div>
      <!-- bottom -->
      <div class="flex justify-between mt-[15px]">
        <!-- bottom left -->
        <div class="flex gap-[6px] items-center">
          <img
            src="~/assets/user/user-template-photo.svg"
            class="w-[24px] h-[24px] rounded-full bg-white"
            v-if="!userFetch.user.profilePhoto"
          />
          <img
            :src="userFetch.user.profilePhoto"
            class="w-[24px] h-[24px] rounded-full bg-white"
            v-else
          />
          <p class="text-white text-[12px]">
            {{ userFetch.user.username }}
          </p>
        </div>
        <!-- bottom right -->
        <div class="flex gap-[10px]">
          <div class="flex items-center gap-[4px]">
            <img
              src="~/assets/prompt/ChatOutline.svg"
              class="w-[12px] h-[12px]"
            />
            <p class="text-white text-[12px] font-normal leading-[15px]">15</p>
          </div>
          <div class="flex gap-[10px]">
            <div class="flex items-center gap-[4px]">
              <img
                src="~/assets/prompt/EyeOutline.svg"
                class="w-[12px] h-[12px]"
              />
              <p class="text-white text-[12px] font-normal leading-[15px]">
                160
              </p>
            </div>
          </div>
          <div class="flex gap-[10px]">
            <div class="flex items-center gap-[4px]">
              <img
                src="~/assets/prompt/HeartOutline.svg"
                class="w-[12px] h-[12px]"
              />
              <p class="text-white text-[12px] font-normal leading-[15px]">
                16
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["promptData"]);
async function fetchTagData(promptData) {
  const { data: tagData } = useFetch("/api/user/prompts", {
    method: "GET",
    query: {
      getPromptTagById: true,
      tagId: promptData?.result?.prompts?.tagId,
    },
  });
  return tagData;
}
async function fetchUserData() {
  const { data: userData } = useFetch("/api/user", {
    method: "GET",
    query: {
      getUserWithoutAuth: true,
      id: props.promptData.result.prompts.writerId,
    },
  });
  return userData;
}
const userFetch = await fetchUserData();
const tagFetch = await fetchTagData(props.promptData);
console.log(tagFetch.value);
</script>

<style scoped></style>
