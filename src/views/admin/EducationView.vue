<script setup>
import { ref } from 'vue';
import { admin } from '../../../utils/axios';
import toast from '../../../utils/toast';
import { useFetchData } from '@/composables/useFetchData';
import BaseButton from '@/components/UI/BaseButton.vue';
import BaseLoader from '@/components/UI/BaseLoader.vue';
import TheHeader from '@/components/admin/TheHeader.vue';

const { isLoading, isRotating, dataList, generateId, manualFetchData } = useFetchData();

const newEducation = ref({});

const addNew = () => {
  newEducation.value.id = generateId();
  dataList.value.unshift(newEducation);
};

const deleteItem = async (id) => {
  try {
    if (!id) return;

    isLoading.value = true;

    const { data, message } = (await admin.delete(`/data?category=education&id=${id}`)).data;

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
  <div class="education">
    <TheHeader
      title="Education"
      :onAdd="addNew"
      :onRefresh="manualFetchData"
      :isRotating="isRotating"
    />

    <div>
      <BaseLoader v-if="isLoading" :isLoading="isLoading" loader_type="code" />
      <div v-else>
        <ul v-if="dataList.length">
          <li v-for="item in dataList" :key="item.id">
            <span>{{ item.title }}</span>
            <BaseButton @click="deleteItem(id)" btn_class="btn-admin">Delete</BaseButton>
          </li>
        </ul>
        <!-- SHOW EMPTY FIELDS -->
        <p v-else class="no-items">No education data found.</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.education {
  ul {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    li {
      padding: 1rem 2.5rem;
      border-radius: 24px;
      box-shadow:
        0px 1px 2px rgba(0, 0, 0, 0.04),
        0px 3px 8px rgba(0, 0, 0, 0.12),
        0px 3px 8px rgba(0, 0, 0, 0.6);
    }
  }
}
</style>
