<script setup>
import { ref } from 'vue'
import { useEditTodo, useRemoveTodo, useToggleTodo } from '@/composable/useTodo'
import { alertModal, confirmModal, showToast } from '@/utils/alertTools'

const props = defineProps({
  mode: {
    type: String,
    default: 'all',
  },
  todoList: {
    type: Array,
    required: true,
  },
})

// removeTodo
const { mutate: removeTodo } = useRemoveTodo()
const handleRemoveTodo = (id) => {
  confirmModal('warning', '確定要刪除此代辦嗎').then((result) => {
    if (result.isConfirmed) {
      removeTodo(id, {
        onSuccess: () => {
          showToast('success', '刪除代辦成功')
        },
      })
    }
  })
}

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
}

const handleEditTodo = (id, content) => {
  if (!content) {
    alertModal('error', '請輸入代辦事項')
    return
  }
  const targetTodo = props.todoList.filter((todo) => todo.id === id)

  if (targetTodo.length !== 0 && targetTodo[0]?.content === content) {
    alertModal('error', '代辦事項內容並未修改')
    return
  }
  editTodo(
    { id, content },
    {
      onSuccess: () => {
        showToast('success', '編輯成功')
        handleEditMode(id)
      },
    },
  )
}
</script>
<template>
  <ul class="font-normal py-4 flex flex-col gap-y-4">
    <template v-if="todoList.length">
      <li v-for="todo in props.todoList" :key="todo.id">
        <template v-if="!editModeTodos[todo.id]?.isEditing">
          <div class="border-b-2 border-neutral-100 -mb-[2px] pb-4 flex items-center">
            <button type="button" v-if="todo.status" @click="toggleTodo(todo.id)">
              <span
                class="material-symbols-outlined check-icon text-primary-500 hover:text-alert-500"
              >
                check
              </span>
            </button>
            <button type="button" v-else @click="toggleTodo(todo.id)">
              <span
                class="material-symbols-outlined checkbox-icon text-neutral-300 hover:text-alert-500"
              >
                check_box_outline_blank
              </span>
            </button>
            <p class="ms-4" :class="todo.status ? 'text-neutral-300 line-through' : ''">
              {{ todo.content }}
            </p>
            <div class="ms-auto flex items-center gap-x-2">
              <button type="button" @click="handleEditMode(todo.id, todo.content)">
                <span
                  class="material-symbols-outlined edit-icon text-neutral-500 hover:text-alert-500"
                >
                  edit_square
                </span>
              </button>
              <button type="button" @click="handleRemoveTodo(todo.id)">
                <span
                  class="material-symbols-outlined delete-icon text-neutral-500 hover:text-alert-500"
                >
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
                <span class="material-symbols-outlined close-icon text-alert-500"> close </span>
              </button>
              <button
                type="button"
                @click="handleEditTodo(todo.id, editModeTodos[todo.id].content)"
              >
                <span class="material-symbols-outlined circle-icon text-lime-600"> circle </span>
              </button>
            </div>
          </div>
        </template>
      </li>
    </template>
    <template v-else>
      <li>目前並無{{ mode === 'isDone' ? '已完成' : '待完成' }}代辦事項</li>
    </template>
  </ul>
</template>
