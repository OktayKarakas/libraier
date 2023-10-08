<template>
  <div>
    <div class="flex justify-between px-[15px] pt-[14px]">
      <!-- left -->
      <div class="flex items-center gap-[7px]">
        <img
          v-if="userData?.profilePhoto"
          :src="userData?.profilePhoto"
          class="w-[24px] h-[24px] rounded-full object-cover"
        />
        <img
          v-else-if="data?.user.image && userData?.profilePhoto !== ''"
          :src="data?.user?.image"
          class="w-[24px] h-[24px] rounded-full object-cover"
        />
        <img
          v-else
          src="~/assets/user/user-template-photo-setting.jpg"
          class="w-[24px] h-[24px] rounded-full object-cover"
        />
        <p class="text-[12px] font-normal leading-[15px] text-white">
          {{ userData?.username || "Loading..." }}
        </p>
      </div>
      <!-- right -->
      <div class="flex gap-[12px]">
        <div class="flex gap-[3px] items-center">
          <img src="~/assets/prompt/ChatOutline.svg" />
          <p class="text-white text-[12px] font-normal leading-[15px]">15</p>
        </div>
        <div class="flex gap-[3px] items-center">
          <img src="~/assets/prompt/HeartOutline.svg" />
          <p class="text-white text-[12px] font-normal leading-[15px]">16</p>
        </div>
      </div>
    </div>
    <!-- description -->
    <div class="pt-[17px] pb-[30px]">
      <p
        class="text-[#8B8B8B] text-[10px] font-normal leading-[12px] max-w-[274px] mx-auto"
      >
        {{ userData?.description || "..." }}
      </p>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const { data } = useAuth();
const userData = ref({});
userData.value = await fetchData();
async function fetchData() {
  if (route.params.id) {
    const {
      data: userFetchData,
      pending,
      error,
      status,
    } = await useFetch("/api/user", {
      method: "GET",
      query: {
        getUserWithoutAuth: true,
        id: route.params.id,
      },
    });
    return userFetchData.value?.user;
  } else {
    await navigateTo("/404");
  }
}
</script>

<style scoped></style>
