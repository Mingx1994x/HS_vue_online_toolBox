<script setup>
import { ref } from 'vue'
import { useLogin, useRegister } from '@/composable/useAuth'

const signInField = ref({
  email: 'dameow@hex.com',
  password: 'meow999',
})

const signUpField = ref({
  email: 'dameow@hex.com',
  password: 'meow999',
  nickname: 'meow',
})

const { mutate: signIn } = useLogin()
const { mutate: signUp } = useRegister()
const handleLogin = (data) => {
  signIn(data)
}

const handleRegister = (data) => {
  signUp(data)
}
</script>

<template>
  <main>
    <h1>登入 / 註冊</h1>
    <div class="flex flex-col">
      <form @submit.prevent="handleLogin(signInField)" class="w-30 mb-4">
        <div class="d-flex flex-col">
          <span>Email</span>
          <input type="email" placeholder="example@gmail.com" v-model.trim="signInField.email" />
        </div>
        <div class="d-flex flex-col">
          <span>Password</span>
          <input type="password" placeholder="password" v-model="signInField.password" />
        </div>
        <button type="submit" class="btn-md rounded btn-primary">登入</button>
      </form>
      <form @submit.prevent="handleRegister(signUpField)" class="w-30">
        <div class="d-flex flex-col">
          <span>Email</span>
          <input type="email" placeholder="example@gmail.com" v-model.trim="signUpField.email" />
        </div>
        <div class="d-flex flex-col">
          <span>Nickname</span>
          <input type="text" placeholder="nickname" v-model.trim="signUpField.nickname" />
        </div>
        <div class="d-flex flex-col">
          <span>Password</span>
          <input type="password" placeholder="password" v-model="signUpField.password" />
        </div>
        <button type="submit">註冊</button>
      </form>
    </div>
  </main>
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
