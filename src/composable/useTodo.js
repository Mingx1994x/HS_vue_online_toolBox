import { addTodo, editTodo, getTodo, patchTodo, removeTodo } from "@/utils/todosAPI";
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";

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