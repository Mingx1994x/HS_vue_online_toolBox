import axios from 'axios'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'

import { getToken, removeToken, setCookie } from '@/utils/cookieTools'
import { checkout } from '@/utils/auth'

const { VITE_APP_BASEURL: baseUrl } = import.meta.env

const signIn = (userField) => (axios.post(`${baseUrl}/users/sign_in`, userField))

const signUp = (userField) => (axios.post(`${baseUrl}/users/sign_up`, userField))

const signOut = () => (axios.post(`${baseUrl}/users/sign_out`))

export const useCheckout = () => {
  return useQuery({
    queryKey: ['auth'],
    queryFn: checkout,
    staleTime: 1000 * 60 * 5,
    onSuccess: (data) => {
      console.log('驗證成功', data)
      axios.defaults.headers.common['Authorization'] = getToken()
    },
    onError: (error) => {
      console.log('驗證失敗', error)
    },
  })
}

export const useLogin = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: signIn,
    onSuccess: async (res) => {
      // 儲存 token
      const { token, exp } = res.data
      setCookie(token, exp)
      // 重新驗證 
      await queryClient.refetchQueries(['auth'])
    },
    onError: (err) => {
      alert(err.response.data.message || '登入失敗，請重試或是洽詢客服')
    }
  })
}

export const useRegister = () => {
  return useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      alert('註冊成功')
    },
    onError: (err) => {
      alert(err.response.data.message || '註冊失敗，請重試或是洽詢客服')
    }
  })
}

export const useLogout = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      removeToken()
      queryClient.removeQueries(['auth'])
      alert('登出成功')
    },
    onError: (err) => {
      alert(err.response.data.message || '登出失敗，請重試或是洽詢客服')
    }
  })
}