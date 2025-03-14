<script setup>
import { computed } from 'vue';
import BaseButton from './BaseButton.vue';
import BaseSelect from './BaseSelect.vue';

const props = defineProps({
  page: { Number, required: true },
  itemsPerPage: { Number, required: true },
  isLastPage: { Boolean, required: true },
  disabled: { Number, required: false },
});

const emit = defineEmits(['page-changed', 'items-changed']);

const itemsPerPage = computed({
  get: () => props.itemsPerPage,
  set: (newValue) => {
    emit('items-changed', newValue), emit('page-changed', 1);
  },
});

function goToPage(page) {
  if (page <= 0 || props.disabled) return;

  emit('page-changed', page);
}
</script>

<template>
  <div class="paginator">
    <BaseButton @click="goToPage(page - 1)" :disabled="page === 1" btn_class="btn-icon">
      <img src="/icons/base/icon_prev.svg" alt="Previous icon" />
    </BaseButton>

    <span>Page {{ page }}</span>

    <BaseButton @click="goToPage(page + 1)" :disabled="isLastPage" btn_class="btn-icon">
      <img src="/icons/base/icon_next.svg" alt="Next icon" />
    </BaseButton>

    <BaseSelect
      v-model:selectedOption="itemsPerPage"
      :options="[1, 3, 5, 10]"
      :disabled="disabled"
    />
  </div>
</template>

<style scoped>
.paginator {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  position: relative;

  span {
    font-size: 16px;
    color: var(--vt-c-purple-400);
  }

  select {
    position: absolute;
    right: 0;
  }
}
</style>
