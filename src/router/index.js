import { createRouter, createWebHashHistory } from 'vue-router'
import { useQueryClient } from '@tanstack/vue-query'
import axios from 'axios'

import LoginView from '../views/LoginView.vue'
import { getToken } from '@/utils/cookieTools'
import { checkout } from '@/utils/auth'
// import { useCheckout } from '@/composable/useAuth'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/todos-board',
      name: 'todos-board',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/TodoListView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../views/NotFoundView.vue')
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const queryClient = useQueryClient()
  const token = getToken()
  if (to.meta.requiresAuth) {
    if (!token) {
      next('/login')
      return
    }

    try {
      const userAuth = await queryClient.ensureQueryData({
        queryKey: ['auth'],
        queryFn: checkout,
        staleTime: 1000 * 60 * 10,
      })
      console.log('去往後台頁面 登入狀態', userAuth?.status);
      // if (!userAuth?.status) {
      //   alert('Token 遺失或過期，請重新登入')
      //   next('/login')
      //   return
      // }
      axios.defaults.headers.common['Authorization'] = token

    } catch (error) {
      console.log(error);
      alert('Token 遺失或過期，請重新登入')
      next('/login')
      return
    }

  } else if (to.path === '/login') {

    const userAuth = queryClient.getQueryData(['auth']);
    console.log(userAuth);
    if (userAuth?.status) {
      console.log('去往Login頁面 登入狀態', userAuth?.status);
      next('/todos-board')
      return
    }
  }
  next()
})

export default router
