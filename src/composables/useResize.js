import { ref, computed, onMounted, onUnmounted } from 'vue';

export function useResize() {
  const innerWidth = ref(0);

  function onResize() {
    innerWidth.value = window.innerWidth;
  }

  onResize();

  const isOnDesktop = computed(() => innerWidth.value > 1024);
  const isOnTablet = computed(() => innerWidth.value > 768 && innerWidth.value < 1024);
  const isOnMobile = computed(() => innerWidth.value < 768);

  onMounted(() => window.addEventListener('resize', onResize));
  onUnmounted(() => window.removeEventListener('resize', onResize));

  return { innerWidth, isOnDesktop, isOnTablet, isOnMobile };
}
