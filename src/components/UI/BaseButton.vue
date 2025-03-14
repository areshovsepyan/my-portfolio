<script setup>
defineProps({
  btn_class: { String, default: 'btn-primary' },
  btn_type: { String, default: 'button' },
  loader_type: { String, default: 'spinner' },
  isLoading: { Boolean, default: false },
  disabled: { Boolean, default: false },
});
</script>

<template>
  <button :class="btn_class" :type="btn_type" :disabled="isLoading || disabled">
    <span v-if="isLoading" :class="loader_type"></span>
    <span v-else>
      <slot></slot>
    </span>
  </button>
</template>
