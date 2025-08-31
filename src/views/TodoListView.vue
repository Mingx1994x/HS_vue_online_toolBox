<script setup>
import { ref, watch, computed, watchEffect, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import { useCheckout, useLogout } from '@/composable/useAuth'
import {
  useAddTodo,
  useEditTodo,
  useRemoveTodo,
  useTodo,
  useToggleTodo,
} from '@/composable/useTodo'

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

const todoList = computed(() => todos.value?.data ?? [])

watchEffect(() => {
  if (isLoading.value || isFetching.value) {
    console.log('正在抓取資料')
  } else {
    console.log(todos.value?.data)
  }
})

//  addTodo
const newTodo = ref('')
const { mutate: addTodo } = useAddTodo()

// removeTodo
const { mutate: removeTodo } = useRemoveTodo()

// toggleTodo
const { mutate: toggleTodo } = useToggleTodo()

// editTodo
const { mutate: editTodo, isPending } = useEditTodo()
const editModeTodos = ref({})
const handleEditMode = (id, content = '') => {
  if (!editModeTodos.value[id]) {
    editModeTodos.value[id] = {
      isEditing: true,
      content,
    }
  } else {
    editModeTodos.value[id].isEditing = !editModeTodos.value[id].isEditing
    editModeTodos.value[id].content = content
  }

  console.log('handle', editModeTodos.value[id])
}

const handleEditTodo = (id, content) => {
  console.log('content', id, content)
  editTodo({ id, content })
  handleEditMode(id)
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
          @click="addTodo(newTodo)"
        >
          <span class="material-symbols-outlined add-icon"> add </span>
        </button>
      </div>
      <!-- {{ todos }} -->
      <ul v-if="todoList.length !== 0">
        <template v-for="todo in todoList" :key="todo.id">
          <li>
            <template v-if="!editModeTodos[todo.id]?.isEditing">
              <div class="d-flex content-start center items-center">
                <button type="button" v-if="todo.status" @click="toggleTodo(todo.id)">勾</button>
                <button type="button" v-else @click="toggleTodo(todo.id)">口</button>
                <p v-if="isPending">取得資料中...</p>
                <p v-else>{{ todo.content }}</p>
                <button type="button" @click="handleEditMode(todo.id, todo.content)">編輯</button>
                <button type="button" @click="removeTodo(todo.id)">刪除</button>
              </div>
            </template>
            <template v-else>
              <input type="text" v-model="editModeTodos[todo.id].content" />
              <button type="button" @click="handleEditMode(todo.id)">取消</button>
              <button
                type="button"
                @click="handleEditTodo(todo.id, editModeTodos[todo.id].content)"
              >
                確認編輯
              </button>
            </template>
          </li>
        </template>
      </ul>
      <div v-else>
        <p>目前尚無待辦事項</p>
        <img src="/empty 1.svg" alt="目前尚無待辦事項" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.d-flex {
  display: flex;
}

.content-start {
  justify-content: flex-start;
}

.items-center {
  align-items: center;
}
</style>
