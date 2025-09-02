<script setup>
import { watch, computed, watchEffect, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import { useCheckout, useLogout } from '@/composable/useAuth'
import { useTodo } from '@/composable/useTodo'

// components
import DashBoardHeader from '@/components/DashBoardHeader.vue'
import TodoBox from '@/components/todos/TodoBox.vue'
import TodoAddInput from '@/components/todos/TodoAddInput.vue'

const { mutate: checkout, data: userState, isError: checkoutError } = useCheckout()
const { mutate: signOut, isSuccess: logoutState } = useLogout()

// 後台權限驗證
onMounted(() => {
  checkout()
})
const router = useRouter()
watch(checkoutError, () => {
  if (checkoutError.value) {
    router.push('/')
  }
})

watch(logoutState, () => {
  if (logoutState.value) {
    router.push('/')
  }
})

// 使用者狀態
const userLoginState = computed(() => userState.value?.status ?? false)

const userNickname = computed(() => (userState.value ? `${userState.value.nickname}` : ''))

// getTodo
const { data: todos, isLoading, isFetching } = useTodo({ enabled: userLoginState })

watchEffect(() => {
  if (isLoading.value || isFetching.value) {
    console.log('正在抓取資料')
  } else {
    console.log('新增料', todos.value)
  }
})
</script>
<template>
  <div class="sm:bg-linear-primary min-h-screen">
    <div class="mx-auto px-3 pt-4">
      <DashBoardHeader :user-nickname="userNickname" @sign_out="signOut" />
      <div class="w-full sm:w-2/3 lg:w-1/2 mx-auto mt-4 sm:mt-10 px-5">
        <TodoAddInput />
        <div class="mt-4">
          <TodoBox :todos="todos" />
        </div>
      </div>
    </div>
  </div>
</template>
