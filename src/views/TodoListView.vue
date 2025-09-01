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
const listNumber = computed(() => todos.value?.data.length ?? 0)

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
// removeTodo
const { mutate: removeTodo } = useRemoveTodo()

// toggleTodo
const { mutate: toggleTodo } = useToggleTodo()

// editTodo
const { mutate: editTodo } = useEditTodo()
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
  if (!content) {
    alert('請輸入代辦事項')
    return
  }
  editTodo(
    { id, content },
    {
      onSuccess: () => {
        handleEditMode(id)
      },
    },
  )
}

const listType = ref('all')
const handleListType = (type) => {
  console.log(type)
  listType.value = type
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
      <template v-if="todoList.length !== 0">
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
          <ul class="font-normal py-4 flex flex-col gap-y-4">
            <li v-for="todo in todoList" :key="todo.id">
              <template v-if="!editModeTodos[todo.id]?.isEditing">
                <div class="border-b-2 border-neutral-100 -mb-[2px] pb-4 flex items-center">
                  <button type="button" v-if="todo.status" @click="toggleTodo(todo.id)">
                    <span class="material-symbols-outlined check-icon text-primary-500">
                      check
                    </span>
                  </button>
                  <button type="button" v-else @click="toggleTodo(todo.id)">
                    <span class="material-symbols-outlined checkbox-icon text-neutral-300">
                      check_box_outline_blank
                    </span>
                  </button>
                  <p class="ms-4" :class="todo.status ? 'text-neutral-300 line-through' : ''">
                    {{ todo.content }}
                  </p>
                  <div class="ms-auto flex items-center gap-x-2">
                    <button type="button" @click="handleEditMode(todo.id, todo.content)">
                      <span class="material-symbols-outlined edit-icon text-neutral-500">
                        edit_square
                      </span>
                    </button>
                    <button type="button" @click="removeTodo(todo.id)">
                      <span class="material-symbols-outlined delete-icon text-neutral-500">
                        delete
                      </span>
                    </button>
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="flex items-center">
                  <input
                    type="text"
                    class="bg-neutral-100 text-neutral-500 leading-none border-b-1 border-neutral-300 rounded-[10px] focus:ring-neutral-500 focus:border-neutral-500 block w-[80%] py-2 ps-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    v-model="editModeTodos[todo.id].content"
                  />
                  <div class="ms-auto flex items-center gap-x-2">
                    <button type="button" @click="handleEditMode(todo.id)">
                      <span class="material-symbols-outlined close-icon text-alert-500">
                        close
                      </span>
                    </button>
                    <button
                      type="button"
                      @click="handleEditTodo(todo.id, editModeTodos[todo.id].content)"
                    >
                      <span class="material-symbols-outlined circle-icon text-lime-600">
                        circle
                      </span>
                    </button>
                  </div>
                </div>
              </template>
            </li>
          </ul>
          <p class="py-2">{{ listNumber }} 個待完成項目</p>
        </div>
      </template>
      <div v-else>
        <p>目前尚無待辦事項</p>
        <img src="/empty 1.svg" alt="目前尚無待辦事項" />
      </div>
    </div>
  </div>
</template>
