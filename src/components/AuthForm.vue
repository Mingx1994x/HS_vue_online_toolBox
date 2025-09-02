<script setup>
import { ref } from 'vue'
const props = defineProps({
  mode: {
    type: String,
    required: true,
  },
})

const signInField = ref({
  email: 'dameow@hex.com',
  password: 'meow999',
})

const signUpField = ref({
  email: 'dameow@hex.com',
  password: 'meow999',
  nickname: 'meow',
})

const emits = defineEmits(['switch-mode', 'submit-form'])
const handleSwitchMode = (mode) => {
  emits('switch-mode', mode)
}

const handleSubmit = (userData) => {
  emits('submit-form', { mode: props.mode, userData })
}
</script>
<template>
  <template v-if="props.mode === 'sign_up'">
    <div class="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 mx-auto px-5 md:px-3">
      <div class="flex flex-col justify-center">
        <h2 class="text-2xl text-bold text-center mb-8 md:text-start md:mb-6">註冊帳號</h2>
        <form @submit.prevent="handleSubmit(signUpField)">
          <div class="mb-4 pe-[7px] md:pe-0">
            <label
              for="register_email"
              class="block mb-1 text-sm font-bold text-neutral-500 dark:text-white"
              >Email</label
            >
            <input
              type="email"
              id="register_email"
              class="bg-neutral-50 text-neutral-500 border-none rounded-[10px] focus:ring-neutral-500 focus:border-neutral-500 block w-full py-3 ps-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="請輸入Email"
              v-model.trim="signUpField.email"
              required
            />
          </div>
          <div class="mb-4 pe-[7px] md:pe-0">
            <label
              for="register_nickname"
              class="block mb-1 text-sm font-bold text-neutral-500 dark:text-white"
            >
              您的暱稱</label
            >
            <input
              type="text"
              id="register_nickname"
              class="bg-neutral-50 text-neutral-500 border-none rounded-[10px] focus:ring-neutral-500 focus:border-neutral-500 block w-full py-3 ps-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="請輸入您的暱稱"
              v-model.trim="signUpField.nickname"
              required
            />
          </div>
          <div class="mb-4 pe-[7px] md:pe-0">
            <label
              for="register_password"
              class="block mb-1 text-sm font-bold text-neutral-500 dark:text-white"
              >密碼</label
            >
            <input
              type="password"
              id="register_password"
              class="bg-neutral-50 text-neutral-500 border-none rounded-[10px] focus:ring-neutral-500 focus:border-neutral-500 block w-full py-3 ps-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="請輸入密碼"
              v-model="signUpField.password"
              required
            />
          </div>
          <div class="mb-4 pe-[7px] md:pe-0">
            <label
              for="confirm_password"
              class="block mb-1 text-sm font-bold text-neutral-500 dark:text-white"
              >再次輸入密碼</label
            >
            <input
              type="password"
              id="confirm_password"
              class="bg-neutral-50 text-neutral-500 border-none rounded-[10px] focus:ring-neutral-500 focus:border-neutral-500 block w-full py-3 ps-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="請再次輸入密碼"
              required
            />
          </div>
          <div class="flex flex-col items-center gap-y-3">
            <button
              type="submit"
              class="btn btn-neutral hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-[10px] dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              註冊帳號
            </button>
            <button
              type="button"
              class="btn btn-primary hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-[10px] dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              @click="handleSwitchMode('sign_in')"
            >
              登入
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
  <template v-else>
    <div class="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 mx-auto px-5 md:px-3">
      <div class="flex flex-col justify-center">
        <h2 class="text-2xl text-bold text-center mb-8 md:text-start md:mb-6">
          最實用的線上代辦事項服務
        </h2>
        <form @submit.prevent="handleSubmit(signInField)">
          <div class="mb-4 pe-[7px] md:pe-0">
            <label
              for="login_email"
              class="block mb-1 text-sm font-bold text-neutral-500 dark:text-white"
              >Email</label
            >
            <input
              type="email"
              id="login_email"
              class="bg-neutral-50 text-neutral-500 border-none rounded-[10px] focus:ring-neutral-500 focus:border-neutral-500 block w-full py-3 ps-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="請輸入Email"
              v-model.trim="signInField.email"
              required
            />
          </div>
          <div class="mb-4 pe-[7px] md:pe-0">
            <label
              for="login_password"
              class="block mb-1 text-sm font-bold text-neutral-500 dark:text-white"
              >密碼</label
            >
            <input
              type="password"
              id="login_password"
              class="bg-neutral-50 text-neutral-500 border-none rounded-[10px] focus:ring-neutral-500 focus:border-neutral-500 block w-full py-3 ps-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="請輸入密碼"
              v-model="signInField.password"
              required
            />
          </div>
          <div class="flex flex-col items-center gap-y-3">
            <button
              type="submit"
              class="btn btn-neutral hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-[10px] dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              登入
            </button>
            <button
              type="button"
              class="btn btn-primary hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-[10px] dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              @click="handleSwitchMode('sign_up')"
            >
              註冊帳號
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
</template>
