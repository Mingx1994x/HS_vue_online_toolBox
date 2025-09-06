<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useLogin, useRegister } from '@/composable/useAuth'
import RegisterForm from '@/components/RegisterForm.vue'
import LoginForm from '@/components/LoginForm.vue'

// 切換 登入/註冊表單
const currentMode = ref('sign_in')
const switchMode = (mode) => {
  currentMode.value = mode
}

const router = useRouter()

const { mutate: signUp } = useRegister()
const handleSignUp = (data) => {
  signUp(data, {
    onSuccess: () => {
      switchMode('sign_in')
    },
  })
}
const { mutate: signIn } = useLogin()
const handleSignIn = (data) => {
  signIn(data, {
    onSuccess: () => {
      router.push('/todos-board')
    },
  })
}

const handleSubmitForm = (userData) => {
  return currentMode.value === 'sign_up' ? handleSignUp(userData) : handleSignIn(userData)
}
</script>

<template>
  <main>
    <div class="mx-auto px-3">
      <div class="h-screen flex flex-col -mx-3 items-start gap-y-4 md:flex-row md:items-center">
        <div class="w-full md:w-1/2 lg:w-5/12 mx-auto px-3">
          <div class="mt-12 md:mt-0">
            <div class="flex flex-col items-center">
              <img src="/logo_lg.svg" alt="logo" />
              <img class="hidden md:block mt-4" src="/img.svg" alt="picture" />
            </div>
          </div>
        </div>
        <!-- login & register -->
        <template v-if="currentMode === 'sign_in'">
          <LoginForm @switch-mode="switchMode" @submit-form="handleSubmitForm" />
        </template>
        <template v-else>
          <RegisterForm @switch-mode="switchMode" @submit-form="handleSubmitForm" />
        </template>
      </div>
    </div>
  </main>
</template>
