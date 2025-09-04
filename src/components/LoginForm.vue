<script setup>
import { toTypedSchema } from '@vee-validate/zod'
import { useField, useForm } from 'vee-validate'
import { z } from 'zod'

// 表單驗證
const signInSchema = toTypedSchema(
  z.object({
    email: z
      .string({ message: '請輸入信箱' })
      .min(1, { message: '信箱欄位為必填' })
      .email({ message: '信箱格式錯誤' }),
    password: z.string({ message: '請輸入密碼' }).min(1, { message: '密碼欄位為必填' }),
  }),
)
const { handleSubmit, errors } = useForm({
  validationSchema: signInSchema,
})
const { value: loginEmail } = useField('email')
const { value: loginPassword } = useField('password')

const emits = defineEmits(['switch-mode', 'submit-form'])
const handleSwitchMode = (mode) => {
  emits('switch-mode', mode)
}

const onSubmit = handleSubmit((values) => {
  console.log(values)
  emits('submit-form', values)
})
</script>
<template>
  <div class="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 mx-auto px-5 md:px-3">
    <div class="flex flex-col justify-center">
      <h2 class="text-2xl text-bold text-center mb-8 md:text-start md:mb-6">
        最實用的線上代辦事項服務
      </h2>
      <form @submit="onSubmit">
        <div class="mb-4 pe-[7px] md:pe-0">
          <label
            for="login_email"
            class="block mb-1 text-sm font-bold text-neutral-500 dark:text-white"
            >Email</label
          >
          <input
            type="email"
            id="login_email"
            name="email"
            class="bg-neutral-50 text-neutral-500 border-none rounded-[10px] focus:ring-neutral-500 focus:border-neutral-500 block w-full py-3 ps-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="請輸入Email"
            v-model="loginEmail"
          />
          <p class="text-sm text-alert-500 font-bold mt-1">{{ errors.email }}</p>
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
            name="password"
            class="bg-neutral-50 text-neutral-500 border-none rounded-[10px] focus:ring-neutral-500 focus:border-neutral-500 block w-full py-3 ps-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="請輸入密碼"
            v-model="loginPassword"
          />
          <p class="text-sm text-alert-500 font-bold mt-1">{{ errors.password }}</p>
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
