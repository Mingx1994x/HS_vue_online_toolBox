<script setup>
import { watch, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import { useCheckout, useLogout } from '@/composable/useAuth'

const { mutate: checkout, data: userInfo, isError: checkoutState } = useCheckout()
const { mutate: signOut, isSuccess: logoutState } = useLogout()

onMounted(() => {
  checkout()
})
const router = useRouter()
watch(checkoutState, () => {
  if (checkoutState.value) {
    router.push('/')
  }
})

watch(logoutState, () => {
  if (logoutState.value) {
    router.push('/')
  }
})

const userNickname = computed(() => {
  return userInfo.value ? `${userInfo.value.nickname}'s` : ''
})
</script>
<template>
  <div class="about">
    <h1>{{ userNickname }} TodoList</h1>
    <button type="button" @click="signOut">登出</button>
  </div>
</template>

<style></style>
