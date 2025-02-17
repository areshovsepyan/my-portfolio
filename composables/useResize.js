import { ref, onMounted, onUnmounted } from 'vue'

export function useResize() {
  const innerWidth = ref(0)

  function onResize() {
    innerWidth.value = window.innerWidth
  }

  onResize()

  onMounted(() => window.addEventListener('resize', onResize))
  onUnmounted(() => window.removeEventListener('resize', onResize))

  return { innerWidth }
}
