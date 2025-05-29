<script setup>
import { useResize } from '@/composables/useResize';
const { isOnMobile } = useResize();

defineProps({
  disabled: { Boolean, default: false },
});
</script>

<template>
  <button class="tab-primary" :disabled="disabled">
    <span>
      <slot></slot>
      <img v-if="isOnMobile" src="/public/icons/icon_arrow-left.svg" alt="Arrow left" />
    </span>
  </button>
</template>
