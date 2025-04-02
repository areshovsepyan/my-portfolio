<script setup>
import { ref, onMounted } from 'vue';
import { admin } from '../../../utils/axios';
import toast from '../../../utils/toast';
import BaseButton from '@/components/UI/BaseButton.vue';
import BaseLoader from '@/components/UI/BaseLoader.vue';
import TheHeader from '@/components/admin/TheHeader.vue';

const isLoading = ref(false);
const isRotating = ref(false);
const logs = ref([]);

const formatISO = function (iso) {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    day: 'numeric',
    weekday: 'short',
    month: 'short',
  })
    .format(new Date(iso))
    .replace(',', '');
};

onMounted(() => fetchData());

const fetchData = async () => {
  try {
    isLoading.value = true;
    logs.value.length = 0;

    const { data } = await admin.get('/data?category=logs');

    logs.value = [...data];
  } catch ({ error }) {
    toast.error(error);
  } finally {
    isLoading.value = false;
  }
};
const manualFetchData = async () => {
  try {
    if (isLoading.value) return;

    isRotating.value = true;

    await fetchData();
  } catch (error) {
    toast.error(error);
  } finally {
    isRotating.value = false;
  }
};
const deleteItem = async (timestamp) => {
  try {
    isLoading.value = true;

    const { data, message } = (await admin.delete(`/data?category=logs&timestamp=${timestamp}`))
      .data;

    logs.value = [...data];

    toast.success(message);
  } catch ({ error }) {
    toast.error(error);
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <TheHeader title="Error Logs" :onRefresh="manualFetchData" :isRotating="isRotating" />

  <div>
    <BaseLoader v-if="isLoading" :isLoading="isLoading" loader_type="code" />
    <div v-else>
      <ul v-if="logs.length">
        <li v-for="{ level, timestamp, message } in logs" :key="timestamp" class="log-item">
          <div class="dot-big" :class="`log-${level}`"></div>
          <span>{{ formatISO(timestamp) }}:</span>
          <span class="message">{{ message }}</span>
          <BaseButton @click="deleteItem(timestamp)" btn_class="btn-admin">Delete</BaseButton>
        </li>
      </ul>
      <p v-else class="no-items">No error logs found.</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.log-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-height: 50px;
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid var(--vt-c-gray-400);

  span {
    color: var(--vt-c-gray-300);
    font-size: 16px;
    font-weight: 500;
    font-family: 'Nunito';
  }

  button {
    margin-left: auto;
  }
}
</style>
