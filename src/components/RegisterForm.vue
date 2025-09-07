<script setup>
import { useForm, useField } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import z from 'zod'

import FunctionalButton from './FunctionalButton.vue'

// 表單驗證
const signUpSchema = toTypedSchema(
  z
    .object({
      email: z
        .string({ message: '請輸入信箱' })
        .min(1, { message: '信箱欄位不可為空' })
        .email({ message: '信箱格式錯誤' }),
      nickname: z.string({ message: '請輸入暱稱' }).min(1, { message: '暱稱欄位不可為空' }),
      password: z.string({ message: '請輸入密碼' }).min(1, { message: '密碼欄位不可為空' }),
      confirmPassword: z.string({ message: '請再次輸入密碼' }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: '密碼不一致',
      path: ['confirmPassword'],
    }),
)

const { handleSubmit, errors } = useForm({
  validationSchema: signUpSchema,
})

const { value: registerEmail } = useField('email')
const { value: registerNickname } = useField('nickname')
const { value: registerPassword } = useField('password')
const { value: confirmPassword } = useField('confirmPassword')

const emits = defineEmits(['switch-mode', 'submit-form'])

const onSubmit = handleSubmit((values) => {
  console.log(values)
  const { email, nickname, password } = values
  emits('submit-form', { email, nickname, password })
})
</script>
<template>
  <div class="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 mx-auto px-5 md:px-3">
    <div class="flex flex-col justify-center">
      <h2 class="text-2xl text-bold text-center mb-8 md:text-start md:mb-6">註冊帳號</h2>
      <form @submit="onSubmit">
        <div class="mb-4 pe-[7px] md:pe-0">
          <label
            for="register_email"
            class="block mb-1 text-sm font-bold text-neutral-500 dark:text-white"
            >Email</label
          >
          <input
            type="email"
            id="register_email"
            name="email"
            class="bg-neutral-50 text-neutral-500 border-none rounded-[10px] focus:ring-neutral-500 focus:border-neutral-500 block w-full py-3 ps-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="請輸入Email"
            v-model.trim="registerEmail"
          />
          <p class="text-sm text-alert-500 font-bold mt-1">{{ errors.email }}</p>
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
            name="nickname"
            class="bg-neutral-50 text-neutral-500 border-none rounded-[10px] focus:ring-neutral-500 focus:border-neutral-500 block w-full py-3 ps-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="請輸入您的暱稱"
            v-model.trim="registerNickname"
          />
          <p class="text-sm text-alert-500 font-bold mt-1">{{ errors.nickname }}</p>
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
            name="password"
            class="bg-neutral-50 text-neutral-500 border-none rounded-[10px] focus:ring-neutral-500 focus:border-neutral-500 block w-full py-3 ps-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="請輸入密碼"
            v-model="registerPassword"
          />
          <p class="text-sm text-alert-500 font-bold mt-1">{{ errors.password }}</p>
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
            name="confirmPassword"
            class="bg-neutral-50 text-neutral-500 border-none rounded-[10px] focus:ring-neutral-500 focus:border-neutral-500 block w-full py-3 ps-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="請再次輸入密碼"
            v-model="confirmPassword"
          />
          <p class="text-sm text-alert-500 font-bold mt-1">{{ errors.confirmPassword }}</p>
        </div>
        <div class="flex flex-col items-center gap-y-3">
          <button
            type="submit"
            class="btn btn-neutral focus:ring-2 focus:outline-none focus:ring-neutral-300 font-medium rounded-[10px]"
          >
            註冊帳號
          </button>

          <FunctionalButton
            custom-class="btn btn-primary focus:ring-2 focus:outline-none focus:ring-neutral-500 font-medium rounded-[10px]"
            text="登入"
            action-mode="sign_in"
            @click-function="emits('switch-mode', $event)"
          />
        </div>
      </form>
    </div>
  </div>
</template>
