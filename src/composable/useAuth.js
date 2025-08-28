import axios from 'axios'
import { useMutation } from '@tanstack/vue-query'

import { getToken, removeToken, setCookie } from '@/utils/cookieTools'

const { VITE_APP_BASEURL: baseUrl } = import.meta.env

const signIn = (userField) => (axios.post(`${baseUrl}/users/sign_in`, userField))

const signUp = (userField) => (axios.post(`${baseUrl}/users/sign_up`, userField))

const signOut = () => (axios.post(
  `${baseUrl}/users/sign_out`,
  {},
  {
    headers: {
      authorization: getToken(),
    },
  },
))

const checkout = async () => {
  const res = await axios.get(`${baseUrl}/users/checkout`, {
    headers: {
      authorization: getToken(),
    },
  })
  return res.data
}

export const useLogin = () => {
  return useMutation({
    mutationFn: signIn,
    onSuccess: (res) => {
      const { token, exp } = res.data
      // 儲存 token
      setCookie(token, exp)
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

export const useCheckout = () => {
  return useMutation({
    mutationFn: checkout,
    onSuccess: () => {
      axios.defaults.headers['authorization'] = getToken()

    },
    onError: () => {
      alert('token 錯誤或是已過期，請重新登入')
    }
  })
}

export const useLogout = () => {
  return useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      removeToken()
      alert('登出成功')
    },
    onError: (err) => {
      alert(err.response.data.message || '登出失敗，請重試或是洽詢客服')
    }
  })
}