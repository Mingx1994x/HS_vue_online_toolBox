import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'

import { removeToken, setCookie } from '@/utils/cookieTools'
import { checkout, signIn, signOut, signUp } from '@/utils/authAPI'

export const useCheckout = () => {
  return useQuery({
    queryKey: ['auth'],
    queryFn: checkout,
    staleTime: 1000 * 60 * 5,
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