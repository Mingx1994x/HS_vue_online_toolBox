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

const userNickname = computed(() => (userState.value ? `${userState.value.nickname}'s'` : ''))

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
const newTodo = ref('備份專案資料')
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
  <div class="about">
    <h1>{{ userNickname }} TodoList</h1>
    <button type="button" @click="signOut">登出</button>
  </div>
  <div>
    <input type="text" v-model="newTodo" />
    <button @click="addTodo(newTodo)">新增</button>
  </div>
  {{ todos }}
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
          <button type="button" @click="handleEditTodo(todo.id, editModeTodos[todo.id].content)">
            確認編輯
          </button>
        </template>
      </li>
    </template>
  </ul>
  <div v-else>沒有資料</div>
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
