<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useLogin, useRegister } from '@/composable/useAuth'

const mode = ref('sign_up')

const signInField = ref({
  email: 'dameow@hex.com',
  password: 'meow999',
})

const signUpField = ref({
  email: 'dameow@hex.com',
  password: 'meow999',
  nickname: 'meow',
})

const { mutate: signIn, isSuccess: signInState } = useLogin()
const { mutate: signUp } = useRegister()

const router = useRouter()
watch(signInState, () => {
  if (signInState.value) {
    router.push('/todos-board')
  }
})
</script>

<template>
  <main>
    <h1>登入 / 註冊</h1>
  </main>
  <div class="mx-auto px-3">
    <div class="flex flex-wrap -mx-3 gap-y-4">
      <div class="w-full md:w-1/2 px-3 pt-12">
        <div class="flex flex-col items-center">
          <img src="/logo_lg.svg" alt="logo" />
          <img class="hidden md:block" src="/img.svg" alt="picture" />
        </div>
      </div>
      <!-- login & register -->
      <template v-if="mode === 'sign_up'">
        <div class="w-full md:w-1/2 px-5 md:px-3">
          <h2 class="text-2xl text-bold text-center mb-8 md:mb-6">註冊帳號</h2>
          <form class="h-100" @submit.prevent="signUp(signInField)">
            <div class="mb-4 pe-[7px] md:pe-0">
              <label
                for="email"
                class="block mb-1 text-sm font-bold text-neutral-500 dark:text-white"
                >Email</label
              >
              <input
                type="email"
                id="email"
                class="bg-neutral-50 text-neutral-500 border-none rounded-[10px] focus:ring-neutral-500 focus:border-neutral-500 block w-full py-3 ps-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="請輸入Email"
                v-model.trim="signUpField.email"
                required
              />
            </div>
            <div class="mb-4 pe-[7px] md:pe-0">
              <label
                for="first_name"
                class="block mb-1 text-sm font-bold text-neutral-500 dark:text-white"
              >
                您的暱稱</label
              >
              <input
                type="text"
                id="first_name"
                class="bg-neutral-50 text-neutral-500 border-none rounded-[10px] focus:ring-neutral-500 focus:border-neutral-500 block w-full py-3 ps-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="請輸入您的暱稱"
                v-model.trim="signUpField.nickname"
                required
              />
            </div>
            <div class="mb-4 pe-[7px] md:pe-0">
              <label
                for="password"
                class="block mb-1 text-sm font-bold text-neutral-500 dark:text-white"
                >密碼</label
              >
              <input
                type="password"
                id="password"
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
            <div class="flex flex-col items-center">
              <button
                type="submit"
                class="btn btn-neutral hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-[10px] dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                註冊帳號
              </button>
              <button
                type="button"
                class="btn btn-primary hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-[10px] dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                登入
              </button>
            </div>
          </form>
        </div>
      </template>
      <template v-else>
        <div class="w-full md:w-1/2 px-5 md:px-3">
          <h2 class="text-2xl text-bold text-center mb-8 md:mb-6">最實用的線上代辦事項服務</h2>
        </div>
      </template>
    </div>
  </div>
</template>
<style scoped>
.d-flex {
  display: flex;
}

.flex-col {
  flex-direction: column;
}

.w-30 {
  width: 30%;
}

.mb-4 {
  margin-bottom: 16px;
}
</style>
