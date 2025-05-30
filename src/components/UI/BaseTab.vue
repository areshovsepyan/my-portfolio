<script setup>
import { useResize } from '@/composables/useResize';
const { isOnDesktop } = useResize();

defineProps({
  disabled: { Boolean, default: false },
});
</script>

<template>
  <button class="tab-primary" :disabled="disabled">
    <span>
      <slot></slot>
      <img
        v-if="!isOnDesktop"
        class="arrow-icon"
        src="/icons/base/icon_down-arrow.svg"
        alt="Down arrow"
      />
    </span>
  </button>
</template>
