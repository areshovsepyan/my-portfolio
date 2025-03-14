<script setup>
import { computed } from 'vue';

const props = defineProps({
  options: { type: Array, required: true },
  selectedOption: { type: [String, Number], required: true },
  disabled: Boolean,
});
const emit = defineEmits(['update:selectedOption']);

const selectedValue = computed({
  get: () => props.selectedOption,
  set: (newValue) => emit('update:selectedOption', newValue),
});
</script>

<template>
  <select v-model="selectedValue" :disabled="disabled">
    <option
      v-for="option in options"
      :key="option"
      :value="option"
      :selected="selectedOption === option"
    >
      {{ option }}
    </option>
  </select>
</template>

<style lang="scss" scoped></style>
