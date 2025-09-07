import { ref } from 'vue'
import { defineStore } from 'pinia'

const historyTodosLimits = 3
export const useTodoStore = defineStore('todoStore', () => {
  // state
  const historyTodos = ref([])
  // actions
  function saveHistoryTodos(todo) {
    if (historyTodos.value.length < historyTodosLimits) {
      historyTodos.value.unshift(todo)
    } else {
      historyTodos.value.unshift(todo)
      historyTodos.value.pop()
    }
  }

  return { historyTodos, saveHistoryTodos }
})
