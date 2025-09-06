import axios from "axios"

import { getToken } from "./cookieTools"

const { VITE_APP_BASEURL: baseUrl } = import.meta.env

export const checkout = async () => {
  const res = await axios.get(`${baseUrl}/users/checkout`, {
    headers: {
      authorization: getToken(),
    },
  })

  return res.data
}

export const signIn = (userField) => {
  return axios.post(`${baseUrl}/users/sign_in`, userField)
}

export const signUp = (userField) => {
  return axios.post(`${baseUrl}/users/sign_up`, userField)
}

export const signOut = () => {
  return axios.post(`${baseUrl}/users/sign_out`)
}
