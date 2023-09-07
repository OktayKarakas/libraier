<template>
  <div
    class="w-[300px] h-[105px] bg-[#121A2A] rounded-t-[5px] py-[17px] mx-auto"
  >
    <div class="flex flex-col gap-[15px] items-center">
      <img
        class="w-[37px] h-[37px] rounded-full"
        v-if="userData?.profilePhoto"
        :src="userData?.profilePhoto"
      />
      <img
        v-else
        src="~/assets/user/user-template-photo-setting.jpg"
        class="w-[37px] h-[37px] rounded-full"
      />
      <p class="text-white font-semibold text-[20px] leading-[24px]">
        {{ userData?.username }}
      </p>
    </div>
  </div>
</template>

<script setup>
const { status, data } = useAuth();
const userData = ref({});
async function fetchUserData() {
  if (status.value === "authenticated") {
    const {
      data: userData,
      pending,
      error,
    } = await useFetch("/api/user", {
      query: { email: data.value.user.email },
    });
    return userData.value.user.user;
  }
  if (error.value) {
    return;
  }
  return;
}

if (status.value === "authenticated") {
  userData.value = await fetchUserData();
}
</script>

<style scoped></style>
