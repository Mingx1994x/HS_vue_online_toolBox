<script setup>
import { ref, computed, watch } from 'vue'
import TodoList from './TodoList.vue'

const props = defineProps({
  todos: {
    type: Object,
  },
})

watch(
  () => props.todos,
  (val) => {
    console.log('子元件TodoBox收到新資料', val)
  },
)

const listType = ref('all')
const handleListType = (type) => {
  console.log(type)
  listType.value = type
}
const todoList = computed(() => {
  switch (listType.value) {
    case 'isDone':
      return props.todos?.data.filter((todo) => todo.status) ?? []
    case 'undone':
      return props.todos?.data.filter((todo) => !todo.status) ?? []

    default:
      return props.todos?.data ?? []
  }
})
const listsCount = computed(() => props.todos?.data.length ?? 0)

const undoneListsCount = computed(
  () => props.todos?.data.filter((todo) => !todo.status).length ?? 0,
)

// tab 樣式
const tabClasses = (type) => ({
  'block p-4 border-b-2': true,
  'border-neutral-100 hover:border-gray-300': listType.value !== type,
  'text-neutral-500 border-neutral-500': listType.value === type,
})
</script>
<template>
  <template v-if="listsCount !== 0">
    <div class="bg-white text-sm rounded-[10px] px-4 pb-4 md:px-6 custom-drop-shadow">
      <ul
        class="text-neutral-300 dark:text-gray-400 text-center font-bold flex flex-wrap -mx-4 -mb-[2px]"
      >
        <li class="w-1/3">
          <a :class="tabClasses('all')" @click.prevent="handleListType('all')">全部</a>
        </li>
        <li class="w-1/3">
          <a
            :class="tabClasses('undone')"
            @click.prevent="handleListType('undone')"
            aria-current="page"
            >待完成</a
          >
        </li>
        <li class="w-1/3">
          <a :class="tabClasses('isDone')" @click.prevent="handleListType('isDone')">已完成</a>
        </li>
      </ul>

      <TodoList :mode="listType" :todo-list="todoList" />
      <p class="py-2">{{ undoneListsCount }} 個待完成項目</p>
    </div>
  </template>
  <template v-else>
    <div class="w-2/3 mx-auto mt-8 flex flex-col lg:mt-12">
      <p class="text-center mb-4">目前尚無待辦事項</p>
      <img src="/empty 1.svg" alt="目前尚無待辦事項" />
    </div>
  </template>
</template>
