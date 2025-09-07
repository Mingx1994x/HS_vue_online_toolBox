<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

import { useCheckout, useLogout } from '@/composable/useAuth'
import { useTodo } from '@/composable/useTodo'
import { confirmModal } from '@/utils/alertTools'

// components
import DashBoardHeader from '@/components/DashBoardHeader.vue'
import TodoBox from '@/components/todos/TodoBox.vue'
import TodoAddInput from '@/components/todos/TodoAddInput.vue'
import FullScreenLoading from '@/components/FullScreenLoading.vue'

const { data: checkoutState } = useCheckout()
const { mutate: signOut } = useLogout()
const router = useRouter()
const handleSignout = () => {
  confirmModal('warning', '確定要登出嗎').then((result) => {
    if (result.isConfirmed) {
      signOut(undefined, {
        onSuccess: () => {
          router.push('/login')
        },
      })
    }
  })
}

// 使用者狀態
const userLoginState = computed(() => checkoutState.value?.status ?? false)

const userNickname = computed(() => checkoutState.value?.nickname ?? '')

// getTodo
const { data: todos, isLoading, isFetching } = useTodo({ enabled: userLoginState })
</script>
<template>
  <div class="sm:bg-linear-primary min-h-screen">
    <div class="mx-auto px-3 pt-4">
      <DashBoardHeader :user-nickname="userNickname" @sign_out="handleSignout" />
      <div class="w-full sm:w-2/3 lg:w-1/2 mx-auto mt-4 sm:mt-10 px-5">
        <TodoAddInput />
        <div class="mt-4">
          <TodoBox :todos="todos" />
        </div>
      </div>
    </div>
    <FullScreenLoading :show-loading="isLoading || isFetching" />
  </div>
</template>
