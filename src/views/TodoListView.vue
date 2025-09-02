<script setup>
import { ref, watch, computed, watchEffect, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import { useCheckout, useLogout } from '@/composable/useAuth'
import { useAddTodo, useTodo } from '@/composable/useTodo'

import TodoList from '@/components/TodoList.vue'

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

const listType = ref('all')
const handleListType = (type) => {
  console.log(type)
  listType.value = type
}
const todoList = computed(() => {
  switch (listType.value) {
    case 'isDone':
      return todos.value?.data.filter((todo) => todo.status) ?? []
    case 'undone':
      return todos.value?.data.filter((todo) => !todo.status) ?? []

    default:
      return todos.value?.data ?? []
  }
})
const listsCount = computed(() => todos.value?.data.length ?? 0)

const undoneListsCount = computed(
  () => todos.value?.data.filter((todo) => !todo.status).length ?? 0,
)

watchEffect(() => {
  if (isLoading.value || isFetching.value) {
    console.log('正在抓取資料')
  } else {
    console.log('新增料', todoList.value)
  }
})

//  addTodo
const newTodo = ref('')
const { mutate: addTodo } = useAddTodo()
const handleAddTodo = (newTodoData) => {
  if (!newTodoData) {
    alert('請輸入代辦事項')
    return
  }
  addTodo(newTodoData, {
    onSuccess: () => {
      alert('新增成功')
      newTodo.value = ''
    },
  })
}
</script>
<template>
  <div class="mx-auto px-3 pt-4">
    <div class="w-full md:w-1/2 lg:w-1/3 mx-auto px-5">
      <div class="flex justify-between items-center mb-4">
        <img src="/logo_lg.svg" alt="logo" style="width: 242.51px" />
        <div class="flex">
          <h2 class="hidden md:block">{{ userNickname }}的代辦</h2>
          <a role="button" @click="signOut">登出</a>
        </div>
      </div>
      <div class="relative mb-4">
        <input
          type="text"
          id="register_nickname"
          class="bg-neutral-50 text-neutral-500 border-none rounded-[10px] focus:ring-neutral-500 focus:border-neutral-500 block w-full py-3 ps-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 drop-shadow"
          placeholder="新增待辦事項"
          v-model.trim="newTodo"
        />
        <button
          class="btn-square btn-neutral rounded-[10px] absolute bottom-0 right-0 -translate-[4px]"
          @click="handleAddTodo(newTodo)"
        >
          <span class="material-symbols-outlined add-icon"> add </span>
        </button>
      </div>
      <template v-if="listsCount !== 0">
        <div class="bg-white text-sm rounded-[10px] px-4 pb-4 md:px-6 drop-shadow">
          <ul
            class="text-neutral-300 dark:text-gray-400 text-center font-bold flex flex-wrap -mx-4 -mb-[2px]"
          >
            <li class="w-1/3">
              <a
                :class="
                  listType === 'all'
                    ? 'block p-4 text-neutral-500 border-b-2 border-neutral-500 dark:text-blue-500 dark:border-blue-500'
                    : 'block p-4 border-b-2 border-neutral-100 hover:border-gray-300'
                "
                @click.prevent="handleListType('all')"
                >全部</a
              >
            </li>
            <li class="w-1/3">
              <a
                :class="
                  listType === 'undone'
                    ? 'block p-4 text-neutral-500 border-b-2 border-neutral-500 dark:text-blue-500 dark:border-blue-500 active'
                    : 'block p-4 border-b-2 border-neutral-100 hover:border-gray-300'
                "
                @click.prevent="handleListType('undone')"
                aria-current="page"
                >待完成</a
              >
            </li>
            <li class="w-1/3">
              <a
                :class="
                  listType === 'isDone'
                    ? 'block p-4 text-neutral-500 border-b-2 border-neutral-500 dark:text-blue-500 dark:border-blue-500 active'
                    : 'block p-4 border-b-2 border-neutral-100 hover:border-gray-300'
                "
                @click.prevent="handleListType('isDone')"
                >已完成</a
              >
            </li>
          </ul>

          <TodoList :mode="listType" :todo-list="todoList" />
          <p class="py-2">{{ undoneListsCount }} 個待完成項目</p>
        </div>
      </template>
      <div v-else>
        <p>目前尚無待辦事項</p>
        <img src="/empty 1.svg" alt="目前尚無待辦事項" />
      </div>
    </div>
  </div>
</template>
