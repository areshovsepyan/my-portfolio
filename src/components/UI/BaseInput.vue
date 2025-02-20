<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  id: String,
  name: String,
  label: { type: String, default: '' },
  type: { type: String, default: 'text' },
  textarea: Boolean,
  required: Boolean,
});

const emit = defineEmits(['update:error']);
const model = defineModel();
const error = ref('');

function capitalizeFirstLetter(val) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

const validate = () => {
  error.value = '';

  if (props.required && !model.value)
    error.value = capitalizeFirstLetter(props.name) + ' is required.';
  else {
    if (props.type === 'email' && model.value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(model.value)) error.value = 'Invalid email format.';
    }

    if (props.name === 'name' && (model.value.length < 3 || model.value.length > 20))
      error.value = 'Name must be between 3 and 20 characters.';

    if (props.name === 'message' && (model.value.length < 10 || model.value.length > 200))
      error.value = 'Message must be between 10 and 200 characters.';
  }
  emit('update:error', error.value);
  return !error.value;
};

watch(model, validate);

defineExpose({ validate });
</script>

<template>
  <div class="input-group">
    <label v-if="label" :for="id">{{ label }}</label>
    <textarea v-if="textarea" v-model="model" :name :id></textarea>
    <input v-else v-model="model" :type :name :id />
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
