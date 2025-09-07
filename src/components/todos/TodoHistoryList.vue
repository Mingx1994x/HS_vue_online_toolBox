<script setup>
import { storeToRefs } from 'pinia'
import { useTodoStore } from '@/stores/todos'

const props = defineProps({
  isShowHistory: {
    type: Boolean,
    required: true,
  },
})
const emits = defineEmits(['add-history'])

const todoStore = useTodoStore()
const { historyTodos } = storeToRefs(todoStore)

const handleInput = (todo) => {
  emits('add-history', todo)
}
</script>
<template>
  <template v-if="props.isShowHistory && historyTodos.length > 0">
    <div class="w-full absolute top-0 left-0 translate-y-[56px]">
      <div class="bg-white text-sm rounded-[10px] px-4 py-4 md:px-6 custom-drop-shadow">
        <ul class="font-normal -mx-4 flex flex-col gap-y-2">
          <li
            v-for="todo in historyTodos"
            :key="todo"
            class="px-3 py-2 flex items-center hover:bg-neutral-100"
            @mousedown.prevent="handleInput(todo)"
          >
            <span class="material-symbols-outlined me-4"> history_2 </span>
            {{ todo }}
          </li>
        </ul>
      </div>
    </div>
  </template>
</template>
