<script setup>
const props = defineProps({
  userNickname: {
    type: String,
    required: true,
  },
})

const emits = defineEmits(['sign_out'])

const handleLogout = () => {
  emits('sign_out')
}
</script>
<template>
  <header class="w-full px-5">
    <div class="flex justify-between items-center">
      <img src="/logo_lg.svg" alt="logo" style="width: 242.51px" />
      <div class="flex">
        <h2 class="font-bold hidden sm:block me-6">{{ props.userNickname }}的代辦</h2>
        <a role="button" class="hover:text-red-700" @click="handleLogout">登出</a>
      </div>
    </div>
  </header>
</template>
