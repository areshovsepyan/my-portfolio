<script setup>
import { admin } from '../../../utils/axios';
import toast from '../../../utils/toast';
import { ref } from 'vue';
import { useFetchData } from '@/composables/useFetchData';
import BaseButton from '@/components/UI/BaseButton.vue';
import BaseLoader from '@/components/UI/BaseLoader.vue';
import TheHeader from '@/components/admin/TheHeader.vue';

const { isLoading, isRotating, dataList, generateId, manualFetchData } = useFetchData();

const newExperience = ref({});

const addNew = () => {
  newExperience.value.id = generateId();
  dataList.value.unshift(newExperience);
};

const deleteItem = async (id) => {
  try {
    if (!id) return;

    isLoading.value = true;

    const { data, message } = (await admin.delete(`/data?category=experience&id=${id}`)).data;

    dataList.value = [...data];

    toast.success(message);
  } catch ({ error }) {
    toast.error(error);
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="settings">
    <TheHeader
      title="Experience"
      :onAdd="addNew"
      :onRefresh="manualFetchData"
      :isRotating="isRotating"
    />

    <div>
      <BaseLoader v-if="isLoading" :isLoading="isLoading" loader_type="code" />
      <div v-else>
        <ul v-if="dataList.length">
          <li v-for="item in dataList" :key="item.id" class="ip-item">
            <span>{{ item.company }}</span>
            <BaseButton @click="deleteItem(id)" btn_class="btn-admin">Delete</BaseButton>
          </li>
        </ul>
        <p v-else class="no-items">No experience data found.</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.settings {
  .ip-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    height: 50px;
    margin-bottom: 1rem;
    padding: 0 1rem;
    border-radius: 8px;
    position: relative;

    &:before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: 8px;
      padding: 2px;
      background: var(--vt-c-to-right-gradient);
      -webkit-mask:
        linear-gradient(var(--vt-c-white) 0 0) content-box,
        linear-gradient(var(--vt-c-white) 0 0);
      mask:
        linear-gradient(var(--vt-c-white) 0 0) content-box,
        linear-gradient(var(--vt-c-white) 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
      pointer-events: none;
    }

    span {
      color: var(--vt-c-gray-300);
      font-size: 18px;
      font-weight: 700;
      font-family: 'Nunito';
    }

    button {
      min-width: 80px;
      max-height: 35px;
      margin-left: auto;
    }
  }
}
</style>
