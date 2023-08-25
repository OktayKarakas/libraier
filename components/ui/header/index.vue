<template>
  <div class="h-[100px]">
    <nav class="bg-zinc-900 border-gray-200 dark:bg-gray-900 fixed w-full z-50">
      <div
        class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4"
      >
        <NuxtLink to="/">
          <img src="~/assets/ui/header/logo-mobile.svg" class="h-8 mr-3" />
        </NuxtLink>
        <div class="flex items-center md:order-2 relative">
          <button
            type="button"
            class="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            id="user-menu-button"
            @click="handleUserMenuOpen"
          >
            <img
              class="w-8 h-8 rounded-full bg-white"
              src="~/assets/user/user-template-login.svg"
              alt="user photo"
            />
          </button>
          <!-- Dropdown menu -->
          <div
            class="z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 absolute w-[150px]"
            :class="[
              !isUserMenuOpen && 'hidden',
              loggedIn ? 'top-[30px] right-[0px]' : 'top-[30px] right-[0px]',
            ]"
          >
            <div class="px-4 py-3" v-if="loggedIn">
              <span class="block text-sm text-gray-900 dark:text-white"
                >User Name</span
              >
              <span
                class="block text-sm text-gray-500 truncate dark:text-gray-400"
                >User Email</span
              >
            </div>
            <ul class="py-2" aria-labelledby="user-menu-button">
              <li v-if="loggedIn">
                <NuxtLink
                  to="/user/1234/page"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >My Page</NuxtLink
                >
              </li>
              <li v-if="loggedIn">
                <NuxtLink
                  href="/user/1234/page"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >Favourite Prompts</NuxtLink
                >
              </li>
              <li v-if="loggedIn">
                <NuxtLink
                  to="/user/1234/page"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >Owned Prompts</NuxtLink
                >
              </li>
              <li v-if="loggedIn">
                <NuxtLink
                  to="/user/1234/page"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >Created Prompts</NuxtLink
                >
              </li>
              <li v-if="loggedIn">
                <NuxtLink
                  to="/user/settings"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >Settings</NuxtLink
                >
              </li>
              <li v-if="status === 'unauthenticated'">
                <button
                  v-if="status === 'unauthenticated'"
                  @click="handleSignIn"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Sign in
                </button>
              </li>
              <li v-if="status === 'authenticated'">
                <button
                  v-if="status === 'authenticated'"
                  @click="handleSignOut"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Sign out
                </button>
              </li>
            </ul>
          </div>
          <button
            data-collapse-toggle="navbar-user"
            type="button"
            class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden"
            :class="
              isMenuOpen
                ? 'bg-white'
                : 'bg-transparent dark:hover:bg-gray-700 dark:focus:ring-gray-600 focus:outline-none dark:text-gray-400'
            "
            aria-controls="navbar-user"
            aria-expanded="false"
            @click="handleMenuOpen"
          >
            <span class="sr-only">Open main menu</span>
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
        <div
          class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-user"
        >
          <ul
            class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
          >
            <li>
              <NuxtLink
                to="/"
                class="block py-2 pl-3 pr-4 text-gray-900 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                aria-current="page"
                >Home</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/about"
                class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >About</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/help"
                class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >Help</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/prompts/categories"
                class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >Prompts</NuxtLink
              >
            </li>
            <li>
              <p>Current Route:</p>
              <p>{{ currentRoute }}</p>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { useHeaderOpen } from "~/stores/ui/header.ts";
const route = useRoute();
const { status, signIn, signOut } = useAuth();
const loggedIn = computed(() => status.value === "authenticated");
const currentRoute = computed(() => route.fullPath);
const isMenuOpen = ref(false);
const isUserMenuOpen = ref(false);

async function handleSignIn() {
  await signIn("google");
}

function handleUserMenuOpen() {
  isUserMenuOpen.value = !isUserMenuOpen.value;
}

function handleMenuOpen() {
  isMenuOpen.value = !isMenuOpen.value;
}

async function handleSignOut() {
  await signOut();
}
const store = useHeaderOpen();
const isHeaderOpen = computed(() => store.isHeaderOpen);
</script>

<style></style>
