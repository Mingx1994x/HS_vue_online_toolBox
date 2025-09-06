<script setup>
import { ref } from 'vue'
import { useAddTodo } from '@/composable/useTodo'
import { alertModal, showToast } from '@/utils/alertTools'

//  addTodo
const newTodo = ref('')
const { mutate: addTodo } = useAddTodo()
const handleAddTodo = (newTodoData) => {
  if (!newTodoData) {
    alertModal('error', '請輸入代辦事項')
    return
  }
  addTodo(newTodoData, {
    onSuccess: () => {
      showToast('success', '新增成功')
      newTodo.value = ''
    },
  })
}
</script>
<template>
  <form class="relative" @submit.prevent="handleAddTodo(newTodo)">
    <input
      type="text"
      id="register_nickname"
      class="bg-neutral-50 text-neutral-500 border-none rounded-[10px] focus:ring-neutral-500 focus:border-neutral-500 block w-full py-3 ps-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 custom-drop-shadow"
      placeholder="新增待辦事項"
      v-model.trim="newTodo"
    />
    <button
      type="submit"
      class="btn-square btn-neutral rounded-[10px] absolute bottom-0 right-0 -translate-[4px]"
    >
      <span class="material-symbols-outlined add-icon"> add </span>
    </button>
  </form>
</template>
