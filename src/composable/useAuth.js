import { setCookie } from '@/utils/cookieTools'
import { useMutation } from '@tanstack/vue-query'
import axios from 'axios'

const { VITE_APP_BASEURL: baseUrl } = import.meta.env

const signIn = (userField) => (axios.post(`${baseUrl}/users/sign_in`, userField))

const signUp = (userField) => (axios.post(`${baseUrl}/users/sign_up`, userField))


export const useLogin = () => {
  return useMutation({
    mutationFn: signIn,
    onSuccess: (res) => {
      console.log(res);
      const { token, exp } = res.data
      setCookie(token, exp)
    },
    onError: (err) => {
      console.log(err.response.data.message || '登入失敗，請重試或是洽詢客服');
    }
  })
}

export const useRegister = () => {
  return useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      // console.log(res);
      alert('註冊成功')
    },
    onError: (err) => {
      console.log(err.response.data.message || '註冊失敗，請重試或是洽詢客服');
    }
  })
}