<script setup>
import { ref } from 'vue'

import { useAddTodo } from '@/composable/useTodo'
import { alertModal, showToast } from '@/utils/alertTools'
import { useTodoStore } from '@/stores/todos'

// components
import TodoHistoryList from './TodoHistoryList.vue'

//  addTodo
const newTodo = ref('')
const { mutate: addTodo } = useAddTodo()
const todoStore = useTodoStore()
const { saveHistoryTodos } = todoStore
const handleAddTodo = (newTodoData) => {
  if (!newTodoData) {
    alertModal('error', '請輸入代辦事項')
    return
  }
  addTodo(newTodoData, {
    onSuccess: () => {
      saveHistoryTodos(newTodoData)
      showToast('success', '新增成功')
      newTodo.value = ''
    },
  })
}

// historyTodo
const showHistory = ref(false)

// 失焦時關閉（延遲避免點擊選項時立即關閉）
const handleBlur = () => {
  setTimeout(() => {
    showHistory.value = false
  }, 150)
}

const handleInput = (todo) => {
  newTodo.value = todo
  showHistory.value = false
}
</script>
<template>
  <form class="relative" @submit.prevent="handleAddTodo(newTodo)">
    <input
      type="text"
      id="register_nickname"
      class="bg-neutral-50 text-neutral-500 border-none rounded-[10px] focus:ring-neutral-500 focus:border-neutral-500 block w-full py-3 ps-4 custom-drop-shadow"
      placeholder="新增待辦事項"
      v-model.trim="newTodo"
      @focus="() => (showHistory = true)"
      @blur="handleBlur"
    />
    <button
      type="submit"
      class="btn-square btn-neutral rounded-[10px] absolute bottom-0 right-0 -translate-[4px]"
    >
      <span class="material-symbols-outlined add-icon"> add </span>
    </button>
    <TodoHistoryList :is-show-history="showHistory" @add-history="handleInput" />
  </form>
</template>
