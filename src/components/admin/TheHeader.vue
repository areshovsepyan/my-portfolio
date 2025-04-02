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
    <BaseButton btn_class="btn-icon">
      <img src="/icons/admin/icon_sidebar-open.svg" alt="" />
    </BaseButton>
    <RouterLink to="/experience">
      <img src="/icons/admin/icon_home.svg" alt="Home icon" />
    </RouterLink>
    <h2 class="admin-header">{{ title }}</h2>
    <div class="header-actions">
      <BaseButton
        v-if="
          route.path.includes('testimonials') ||
          route.path.includes('experience') ||
          route.path.includes('projects')
        "
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

<style lang="scss" scoped>
.header-box {
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 0 1rem 1rem 0;
  margin-bottom: 2rem;
  border-bottom: 1px solid var(--vt-c-gray-400);

  a {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .header-actions {
    display: flex;
    gap: 0.4rem;
    margin-left: auto;

    button {
      &:hover {
        img {
          scale: 1;
        }
      }
    }
  }
}
</style>
