<script setup>
import { useRoute } from 'vue-router';
import BaseButton from '@/components/UI/BaseButton.vue';

const route = useRoute();

defineProps({
  title: String,
  onAdd: Function,
  onRefresh: Function,
  isRotating: Boolean,
});
</script>

<template>
  <div class="header-box">
    <h2 class="admin-header">{{ title }}</h2>
    <div class="header-actions">
      <BaseButton
        v-if="route.path.includes('education') || route.path.includes('experience')"
        @click="onAdd"
        btn_class="btn-icon"
      >
        <img src="/icons/base/icon_add.svg" alt="Add icon" />
      </BaseButton>
      <BaseButton @click="onRefresh" btn_class="btn-icon">
        <img
          src="/icons/base/icon_refresh.svg"
          :class="{ rotating: isRotating }"
          alt="Refresh icon"
        />
      </BaseButton>
    </div>
  </div>
</template>
