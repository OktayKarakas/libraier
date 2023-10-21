<template>
  <div class="h-[100px]">
    <nav class="bg-zinc-900 border-gray-200 dark:bg-gray-900 fixed w-full z-50">
      <div
        class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4"
      >
        <NuxtLink to="/">
          <img src="~/assets/ui/header/logo-mobile.svg" class="h-8 mr-3" />
        </NuxtLink>
        <div class="flex items-center lg:order-2 relative">
          <button
            type="button"
            class="flex mr-3 text-sm bg-gray-800 rounded-full lg:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 z-50"
            id="user-menu-button"
            @click="handleUserMenuOpen"
          >
            <img
              class="w-8 h-8 rounded-full bg-white"
              v-if="userData?.profilePhoto"
              :src="userData?.profilePhoto"
              alt="user photo"
            />
            <img
              class="w-8 h-8 rounded-full bg-white"
              v-else-if="data?.user.image && userData?.profilePhoto !== ''"
              :src="data?.user.image"
              alt="user photo"
            />
            <img
              class="w-8 h-8 rounded-full bg-white"
              v-else
              src="~/assets/user/user-template-login.svg"
              alt="user photo"
            />
          </button>
          <div
            class="fixed top-0 right-0 bottom-0 left-0 bg-black opacity-5 z-10"
            :class="[{ block: isUserMenuOpen, hidden: !isUserMenuOpen }]"
            @click="closeUserMenu"
          ></div>
          <!-- Dropdown menu -->
          <div
            class="z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 absolute w-[150px]"
            :class="[
              !isUserMenuOpen && 'hidden',
              loggedIn ? 'top-[30px] right-[0px]' : 'top-[30px] right-[0px]',
            ]"
          >
            <div class="px-4 py-3" v-if="loggedIn">
              <span class="block text-sm text-gray-900 dark:text-white">{{
                userData?.fullName ? userData.fullName : data?.user.name
              }}</span>
              <span
                class="block text-sm text-gray-500 truncate dark:text-gray-400"
                >{{
                  userData?.username ? userData.username : data?.user.email
                }}</span
              >
            </div>
            <ul class="py-2" aria-labelledby="user-menu-button">
              <li v-if="loggedIn">
                <NuxtLink
                  :to="`/user/${userData.id}/page`"
                  @click="
                    () => {
                      closeMenuOnNavigate();
                      handleMyPage('page');
                    }
                  "
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white cursor-pointer"
                  >My Page</NuxtLink
                >
              </li>
              <li v-if="loggedIn">
                <NuxtLink
                  :to="`/user/${userData.id}/favPrompts`"
                  @click="
                    () => {
                      closeMenuOnNavigate();
                      handleMyPage('favPrompts');
                    }
                  "
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white cursor-pointer"
                  >Favourite Prompts</NuxtLink
                >
              </li>
              <li v-if="loggedIn">
                <NuxtLink
                  :to="`/user/${userData.id}/ownedPrompts`"
                  @click="
                    () => {
                      closeMenuOnNavigate();
                      handleMyPage('ownedPrompts');
                    }
                  "
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white cursor-pointer"
                  >Owned Prompts</NuxtLink
                >
              </li>
              <li v-if="loggedIn">
                <NuxtLink
                  to="/user/prompts/write"
                  @click="closeMenuOnNavigate"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white cursor-pointer"
                  >Write Prompts</NuxtLink
                >
              </li>
              <li v-if="loggedIn">
                <NuxtLink
                  @click="closeMenuOnNavigate"
                  to="/user/settings"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white cursor-pointer"
                  >Settings</NuxtLink
                >
              </li>
              <li v-if="status === 'unauthenticated'">
                <button
                  v-if="status === 'unauthenticated'"
                  @click="handleSignIn"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white w-full cursor-pointer"
                >
                  Sign in
                </button>
              </li>
              <li v-if="status === 'authenticated'">
                <button
                  v-if="status === 'authenticated'"
                  @click="handleSignOut"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white w-full cursor-pointer"
                >
                  Sign out
                </button>
              </li>
            </ul>
          </div>
          <button
            type="button"
            class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden z-40"
            :class="
              isMenuOpen
                ? 'bg-white'
                : 'bg-transparent dark:hover:bg-gray-700 dark:focus:ring-gray-600 focus:outline-none dark:text-gray-400'
            "
            @click="handleNavbarMenu"
          >
            <svg
              class="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                :stroke="!isMenuOpen ? '#fff' : 'black'"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <!-- navbar -->
        <div
          class="fixed top-0 right-0 bottom-0 left-0 bg-black opacity-5 z-10"
          :class="[{ block: isMenuOpen, hidden: !isMenuOpen }]"
          @click="closeNavbar"
        ></div>
        <div
          class="items-center justify-between w-full lg:flex lg:w-auto lg:order-1 z-50"
          :class="[{ hidden: !isMenuOpen, block: isMenuOpen }]"
          id="navbar-user"
        >
          <ul
            class="flex flex-col font-medium p-4 lg:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 lg:flex-row lg:space-x-8 lg:mt-0 lg:border-0 lg:bg-transparent dark:bg-gray-800 lg:dark:bg-gray-900 dark:border-gray-700"
          >
            <li>
              <NuxtLink
                to="/"
                class="block py-2 pl-3 pr-4 text-gray-900 rounded lg:bg-transparent lg:text-gray-300 lg:p-0 lg:dark:text-white lg:hover:text-gray-200"
                aria-current="page"
                @click="closeMenuOnNavigate"
                >Home</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/about"
                class="block py-2 pl-3 pr-4 text-gray-900 lg:text-gray-300 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:hover:text-gray-200 lg:p-0 dark:text-white lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                @click="closeMenuOnNavigate"
                >About</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/help"
                class="block py-2 pl-3 pr-4 text-gray-900 lg:text-gray-300 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:hover:text-gray-200 lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                @click="closeMenuOnNavigate"
                >Help</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/prompts/categories"
                class="block py-2 pl-3 pr-4 text-gray-900 lg:text-gray-300 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:hover:text-gray-200 lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                @click="closeMenuOnNavigate"
                >Prompts</NuxtLink
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup>
const route = useRoute();
const { status, data, signIn, signOut } = useAuth();
const loggedIn = computed(() => status.value === "authenticated");
const currentRoute = computed(() => route.fullPath);
const isMenuOpen = ref(false);
const isUserMenuOpen = ref(false);
const userData = ref({});
const tokenMissing = ref(false);

function closeMenuOnNavigate() {
  isMenuOpen.value = false;
  isUserMenuOpen.value = false;
}

async function handleMyPage(route) {
  if (!userData?.value?.id) {
    userData.value = await fetchUserData();
    if (userData?.value?.id) {
      await navigateTo(`/user/${userData.value.id}/${route}`);
    }
  } else {
    await navigateTo(`/user/${userData.value.id}/${route}`);
  }
}

watch(currentRoute, async (newVal, oldVal) => {
  if (data?.value?.expires) {
    const expirationDate = new Date(data.value.expires);
    const currentDate = new Date();
    if (newVal === "/") {
      if (expirationDate <= currentDate) {
        signOut();
      }
    } else {
      if (expirationDate <= currentDate) {
        await navigateTo("/");
      }
    }
  }
});

onMounted(() => {
  if (data?.value?.expires) {
    const expirationDate = new Date(data.value.expires);
    const currentDate = new Date();
    if (currentRoute.value === "/") {
      if (expirationDate <= currentDate) {
        signOut();
      }
    } else {
      if (currentRoute.value <= currentDate) {
        navigateTo("/");
      }
    }
  }
});

async function fetchUserData() {
  if (status.value === "authenticated") {
    const {
      data: userData,
      pending,
      error,
    } = await useFetch("/api/user", {
      query: { email: data.value.user.email, getUser: true },
    });
    if (error.value) {
      return { error: true };
    }
    if (userData.value.user?.success === false) {
      return {
        error: true,
      };
    }
    return userData.value.user.user;
  }

  return;
}

if (status.value === "authenticated" && !userData.value?.id) {
  userData.value = await fetchUserData();
  if (userData.value?.error) {
    tokenMissing.value = true;
  }
}

if (tokenMissing.value) {
  if (process.client) {
    await navigateTo("/");
    await signOut();
  }
}

async function handleSignIn() {
  await signIn("google", "/");
}

function closeUserMenu() {
  isUserMenuOpen.value = false;
}

function closeNavbar() {
  isMenuOpen.value = false;
}

function handleUserMenuOpen() {
  if (!isMenuOpen.value) {
    isUserMenuOpen.value = !isUserMenuOpen.value;
  }
}

function handleMenuOpen() {
  isMenuOpen.value = !isMenuOpen.value;
}

function handleNavbarMenu() {
  closeUserMenu();
  handleMenuOpen();
}

async function handleSignOut() {
  await navigateTo("/");
  await signOut();
}
</script>

<style></style>
