import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query'
import axios from 'axios'

import App from './App.vue'
import router from './router'
import { checkout } from './utils/auth'
import { getToken } from './utils/cookieTools'

const app = createApp(App)

app.use(createPinia())

const queryClient = new QueryClient()
app.use(VueQueryPlugin, { queryClient })
await queryClient.prefetchQuery({
  queryKey: ['auth'],
  queryFn: checkout,
  staleTime: 1000 * 60 * 5,
  onSuccess: () => {
    console.log('初始化 checkout 成功');

    axios.defaults.headers.common['Authorization'] = getToken()
  }
})
app.use(router)

app.mount('#app')
