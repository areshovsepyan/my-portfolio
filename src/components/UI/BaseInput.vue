<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  id: String,
  name: String,
  label: { type: String, default: '' },
  type: { type: String, default: 'text' },
  textarea: Boolean,
  required: Boolean,
  resetTrigger: Number,
});

const emit = defineEmits(['update:error']);
const model = defineModel();
const error = ref('');

const capitalizeFirstLetter = (val) => {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
};

const onBlur = () => {
  if (typeof model.value === 'string') {
    model.value = model.value.trim();
  }
};

const validate = () => {
  error.value = '';
  const inputValue = model.value?.trim?.() || '';

  if (props.required && !inputValue)
    error.value = capitalizeFirstLetter(props.name) + ' is required.';
  else {
    if (props.type === 'email' && inputValue) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(inputValue)) error.value = 'Invalid email format.';
    }

    if (props.name === 'name' && (inputValue.length < 3 || inputValue.length > 20))
      error.value = 'Name must be between 3 and 20 characters.';

    if (props.name === 'message' && (inputValue.length < 10 || inputValue.length > 200))
      error.value = 'Message must be between 10 and 200 characters.';
  }
  emit('update:error', error.value);
  return !error.value;
};

watch(model, validate);
watch(
  () => props.resetTrigger,
  () => (error.value = ''),
);

defineExpose({ validate });
</script>

<template>
  <div class="input-group">
    <label v-if="label" :for="id">
      {{ label }}
      <span v-if="required" class="required-asterisk">*</span>
    </label>
    <textarea v-if="textarea" @blur="onBlur" v-model="model" :name :id></textarea>
    <input v-else v-model="model" @blur="onBlur" :type :name :id />
    <span v-if="error" class="error">{{ error }}</span>
  </div>
</template>

<style lang="scss" scoped>
.input-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;

  @media (min-width: 1024px) {
    margin-bottom: 3rem;
  }
}
</style>
