import { useLoading } from "vue3-loading-overlay"

export const useFullScreenLoader = () => {
  return useLoading({
    color: '#ffd370',
    loader: 'spinner',
    width: 64,
    height: 64,
    backgroundColor: '#ffffff',
    opacity: 0.5,
    zIndex: 999,
  })
}