import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query'

import { checkout } from './utils/authAPI'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
// 初始驗證是否有登入權限並存取 auth query 快取資料
const queryClient = new QueryClient()
app.use(VueQueryPlugin, { queryClient })
await queryClient.prefetchQuery({
  queryKey: ['auth'],
  queryFn: checkout,
  staleTime: 1000 * 60 * 5
})
app.use(router)

app.mount('#app')
