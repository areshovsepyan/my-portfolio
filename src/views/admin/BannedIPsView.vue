<script setup>
import { ref, onMounted } from 'vue';
import { admin } from '../../../utils/axios';
import toast from '../../../utils/toast';
import BaseButton from '@/components/UI/BaseButton.vue';
import BaseLoader from '@/components/UI/BaseLoader.vue';
import TheHeader from '@/components/admin/TheHeader.vue';

const isLoading = ref(false);
const isRotating = ref(false);
const bannedIPs = ref([]);

onMounted(() => fetchData());

const fetchData = async () => {
  try {
    isLoading.value = true;
    bannedIPs.value.length = 0;

    const { data } = await admin.get('/data?category=banned-ips');

    bannedIPs.value = [...data];
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
  } catch ({ error }) {
    toast.error(error);
  } finally {
    isRotating.value = false;
  }
};

const deleteItem = async (ip) => {
  try {
    isLoading.value = true;

    const { data, message } = (await admin.delete(`/data?category=banned-ips&ip=${ip}`)).data;

    bannedIPs.value = [...data];

    toast.success(message);
  } catch ({ error }) {
    toast.error(error);
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <TheHeader title="Banned IPs" :onRefresh="manualFetchData" :isRotating="isRotating" />

  <div>
    <BaseLoader v-if="isLoading" :isLoading="isLoading" loader_type="code" />
    <div v-else>
      <ul v-if="bannedIPs.length">
        <li v-for="ip in bannedIPs" :key="ip" class="ip-item">
          <div class="dot-green"></div>
          <span>{{ ip }}</span>
          <BaseButton @click="deleteItem(ip)" btn_class="btn-secondary">Unban</BaseButton>
        </li>
      </ul>
      <p v-else class="no-items">No banned IPs found.</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.ip-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 24px;
  box-shadow:
    0px 1px 2px rgba(0, 0, 0, 0.04),
    0px 3px 8px rgba(0, 0, 0, 0.12),
    0px 3px 8px rgba(0, 0, 0, 0.6);

  span {
    color: var(--vt-c-gray-300);
    font-size: 18px;
    font-weight: 700;
    font-family: 'Nunito';
  }

  button {
    margin-left: auto;
  }
}
</style>
