<script setup>
defineProps({
  id: String,
  label: { type: String, default: '' },
});
const model = defineModel();
</script>

<template>
  <div class="input-group">
    <input v-model="model" type="checkbox" :id />
    <label v-if="label" :for="id">{{ label }}</label>
  </div>
</template>

<style lang="scss" scoped>
.input-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;

  @media (min-width: 1024px) {
    margin-bottom: 3rem;
  }

  label {
    padding: 0;
  }
}
</style>
