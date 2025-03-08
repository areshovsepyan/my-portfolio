<script setup>
import { admin } from '../../utils/axios';
import { ref, onMounted } from 'vue';
import BaseButton from '@/components/UI/BaseButton.vue';
import BaseLoader from '@/components/UI/BaseLoader.vue';
import toast from '../../utils/toast';

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

onMounted(() => fetchLogs());

const fetchLogs = async () => {
  try {
    isLoading.value = true;
    logs.value.length = 0;

    const { data } = await admin.get('/logs');

    logs.value = [...data.logs];
  } catch ({ error }) {
    toast.error(error);
  } finally {
    isLoading.value = false;
  }
};
const manualFetchLogs = async () => {
  try {
    if (isLoading.value) return;

    isRotating.value = true;

    await fetchLogs();
  } catch (error) {
    toast.error(error);
  } finally {
    isRotating.value = false;
  }
};
</script>

<template>
  <div class="logs">
    <div class="header-box">
      <h2 class="admin-header">Error Logs</h2>
      <BaseButton @click="manualFetchLogs()" btn_class="btn-icon">
        <img
          src="/icons/admin/icon_refresh.svg"
          :class="{ rotating: isRotating }"
          alt="Refresh icon"
        />
      </BaseButton>
    </div>
    <div>
      <BaseLoader v-if="isLoading" :isLoading="isLoading" loader_type="code" />
      <div v-else>
        <ul v-if="logs.length">
          <li v-for="{ level, timestamp, message } in logs" :key="timestamp" class="log-item">
            <div class="dot-big" :class="level"></div>
            <span>{{ formatISO(timestamp) }}:</span>
            <span class="message">{{ message }}</span>
          </li>
        </ul>
        <p v-else class="no-items">No error logs found.</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.logs {
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

    // button {
    //   min-width: 80px;
    //   max-height: 35px;
    //   margin-left: auto;
    // }
  }
}
</style>
