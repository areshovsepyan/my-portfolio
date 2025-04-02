<script setup>
import { ref } from 'vue';
import { admin } from '../../../utils/axios';
import toast from '../../../utils/toast';
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

    const { data, message } = (await admin.delete(`/data?category=testimonials&id=${id}`)).data;

    dataList.value = [...data];

    toast.success(message);
  } catch ({ error }) {
    toast.error(error);
  } finally {
    isLoading.value = false;
  }
};

const editItem = async (id) => {
  if (!id) return;
};
</script>

<template>
  <TheHeader
    title="Testimonials"
    :onAdd="addNew"
    :onRefresh="manualFetchData"
    :isRotating="isRotating"
  />

  <div>
    <BaseLoader v-if="isLoading" :isLoading="isLoading" loader_type="code" />
    <div v-else>
      <ul v-if="dataList.length" class="items-list">
        <li v-for="item in dataList" :key="item.id" class="item-card">
          <div class="row"></div>
          <div class="row">
            <b>ID:</b>
            <p>{{ item.id }}</p>
          </div>
          <div class="row">
            <b>Stars:</b>
            <p>{{ item.stars }}</p>
          </div>
          <div class="row">
            <b>Name:</b>
            <p>{{ item.from.name }}</p>
          </div>
          <div class="row">
            <b>Position:</b>
            <p>{{ item.from.position }}</p>
          </div>
          <div class="row">
            <b>Image URL:</b>
            <p>{{ item.from.image.url }}</p>
          </div>
          <div class="row">
            <b>Text:</b>
            <p>{{ item.text }}</p>
          </div>

          <BaseButton @click="deleteItem(id)" btn_class="btn-icon">
            <img src="/icons/base/icon_delete.svg" alt="Delete icon" />
          </BaseButton>
          <BaseButton @click="editItem(id)" btn_class="btn-icon">
            <img src="/icons/base/icon_edit.svg" alt="Edit icon" />
            <img src="/icons/base/icon_cancel.svg" alt="Cancel icon" />
          </BaseButton>
        </li>
      </ul>
      <p v-else class="no-items">No testimonials found.</p>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
