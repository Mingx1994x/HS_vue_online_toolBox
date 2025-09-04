<script setup>
import { useField, useForm } from 'vee-validate'
import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'

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

const { value: email } = useField('email')
const { value: password } = useField('password')

const onSubmit = handleSubmit((values) => {
  console.log(values)
})
</script>
<template>
  <form @submit="onSubmit">
    <label class="block mb-4">
      <span class="text-primary-500">Email</span>
      <input
        type="email"
        name="email"
        class="block w-full rounded-md bg-gray-100 border-transparent ring-0 focus:bg-white focus:ring-3 focus:ring-primary-500 text-slate-900"
        placeholder="example@gmail.com"
        v-model="email"
      />
      <span class="text-red-600">{{ errors.email }}</span>
    </label>
    <label class="block mb-4">
      <span class="text-primary-500">Password</span>
      <input
        type="password"
        name="password"
        class="block w-full rounded-md bg-gray-100 border-transparent ring-0 focus:bg-white focus:ring-3 focus:ring-primary-500 text-slate-900"
        placeholder="password"
        v-model="password"
      />
      <span class="text-red-600">{{ errors.password }}</span>
    </label>

    <button type="submit" class="btn-md rounded btn-primary">登入</button>
  </form>
</template>
