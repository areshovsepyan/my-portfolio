<script setup>
defineProps({
  loader_type: { String, default: 'spinner' },
  isLoading: { Boolean, default: false },
});
</script>

<template>
  <div class="loader-wrapper">
    <span v-if="isLoading" :class="loader_type"></span>
  </div>
</template>

<style lang="scss" scoped>
.loader-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
