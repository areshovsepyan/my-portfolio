<script setup>
import { computed } from 'vue';

const props = defineProps({
  border_gradient: { type: Boolean, default: false },
  background_color: { type: Number, default: undefined },
  colored: { type: Boolean, default: false },
});

const getBackgroundColor = computed(() =>
  props.background_color ? `backgroundColor: var(--vt-c-accent-${props.background_color})` : '',
);
</script>

<template>
  <div class="card" :style="getBackgroundColor">
    <slot></slot>
  </div>
</template>
