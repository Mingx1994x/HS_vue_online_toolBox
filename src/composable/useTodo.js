import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";

import { addTodo, editTodo, getTodo, patchTodo, removeTodo } from "@/utils/todosAPI";
import { alertModal } from "@/utils/alertTools";


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
      alertModal('error', err.response.data.message || '新增失敗，請重試或是洽詢客服')
    }
  })
}

export const useRemoveTodo = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: removeTodo,
    onSuccess: () => {
      queryClient.invalidateQueries(['todos'])
    },
    onError: (err) => {
      alertModal('error', err.response.data.message || '移除失敗，請重試或是洽詢客服')
    }
  })
}

export const useToggleTodo = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: patchTodo,
    onSuccess: () => {
      queryClient.invalidateQueries(['todos'])
    },
    onError: (err) => {
      alertModal('error', err.response.data.message || '完成勾選失敗，請重試或是洽詢客服')
    }
  })
}

export const useEditTodo = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: editTodo,
    onSuccess: () => {
      queryClient.invalidateQueries(['todos'])
    },
    onError: (err) => {
      alertModal('error', err.response.data.message || '編輯失敗，請重試或是洽詢客服')
    }
  })
}