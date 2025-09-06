import axios from "axios";

const { VITE_APP_BASEURL: baseUrl } = import.meta.env

export const getTodo = async () => {
  const res = await axios.get(`${baseUrl}/todos`)
  return res.data
}
export const addTodo = (newTodo) => (axios.post(`${baseUrl}/todos`, {
  content: newTodo
}))


export const patchTodo = (id) => (axios.patch(`${baseUrl}/todos/${id}/toggle`))


export const removeTodo = async (id) => {
  const res = await axios.delete(`${baseUrl}/todos/${id}`)
  return res.data
}

export const editTodo = async ({ id, content }) => {

  console.log("editTodo", id, content)

  const res = await axios.put(`${baseUrl}/todos/${id}`, {
    content,
  })
  return res.data
}