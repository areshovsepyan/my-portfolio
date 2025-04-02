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
</template>

<style lang="scss" scoped></style>
