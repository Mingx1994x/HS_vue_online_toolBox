<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const countDown = ref(7)
const router = useRouter()

let timer
onMounted(() => {
  timer = setInterval(() => {
    countDown.value--

    if (countDown.value === 0) router.push('/')
  }, 1000)
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>
<template>
  <div class="mx-auto px-3">
    <div class="h-screen flex flex-wrap -mx-3 justify-center">
      <div class="w-full md:w-2/3 mx-auto">
        <div class="h-full flex flex-col justify-center mt-12 md:mt-0">
          <h3 class="text-5xl text-center font-bold mb-4">迷路了唷～～</h3>
          <p class="text-xl md:text-3xl text-center font-semibold">
            系統將在
            <span class="text-alert-500">{{ countDown }}</span>
            秒後為您挑轉首頁
          </p>
          <div class="shake-box mx-auto">
            <img src="/vehicle-pirate.png" class="object-cover" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.shake-box {
  width: 300px;
  height: 300px;
  animation: shake 1.5s infinite;
}

@keyframes shake {
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(15deg);
  }
  50% {
    transform: rotate(0deg);
  }
  75% {
    transform: rotate(-20deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
</style>
