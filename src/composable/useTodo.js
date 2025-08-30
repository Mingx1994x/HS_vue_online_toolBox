import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";

const { VITE_APP_BASEURL: baseUrl } = import.meta.env

const getTodo = async () => {
  const res = await axios.get(`${baseUrl}/todos`)
  return res.data
}
const addTodo = (newTodo) => (axios.post(`${baseUrl}/todos`, {
  content: newTodo
}))


const patchTodo = (id) => (axios.patch(`${baseUrl}/todos/${id}/toggle`))


const removeTodo = async (id) => {
  const res = await axios.delete(`${baseUrl}/todos/${id}`)
  return res.data
}

const editTodo = async ({ id, content }) => {

  console.log("editTodo", id, content)

  const res = await axios.put(`${baseUrl}/todos/${id}`, {
    content,
  })
  return res.data
}

export const useTodo = (options = {}) => {
  return useQuery({
    queryKey: ['todo'],
    queryFn: getTodo,
    enabled: options.enabled ?? false,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 30
  })
}

export const useAddTodo = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries(['todos'])
    },
    onError: (err) => {
      alert(err.response.data.message || '新增失敗，請重試或是洽詢客服')
    }
  })
}

export const useRemoveTodo = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: removeTodo,
    onSuccess: (res) => {
      alert(res.message)
      queryClient.invalidateQueries(['todos'])
    },
    onError: (err) => {
      alert(err.response.data.message || '移除失敗，請重試或是洽詢客服')
    }
  })
}

export const useToggleTodo = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: patchTodo,
    onSuccess: (res) => {
      console.log('toggle', res);
      queryClient.invalidateQueries(['todos'])
    },
    onError: (err) => {
      alert(err.response.data.message || '完成勾選失敗，請重試或是洽詢客服')
    }
  })
}

export const useEditTodo = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: editTodo,
    onSuccess: (res) => {
      console.log('edit', res);
      alert(res.message)
      queryClient.invalidateQueries(['todos'])
    },
    onError: (err) => {
      alert(err.response.data.message || '編輯失敗，請重試或是洽詢客服')
    }
  })
}