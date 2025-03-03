<script setup>
import { admin } from '../../utils/axios';
import { ref, onMounted } from 'vue';
import BaseButton from '@/components/UI/BaseButton.vue';
import BaseLoader from '@/components/UI/BaseLoader.vue';
import { useToast } from 'vue-toastification';

const toast = useToast();

const isLoading = ref(false);
const isRotating = ref(false);
const logs = ref([]);

onMounted(() => fetchLogs());

const fetchLogs = async () => {
  try {
    isLoading.value = true;

    const { data } = await admin.get('/logs');
    console.log('ERROR LOGS:', data.logs);

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
    console.log(error);
  } finally {
    isRotating.value = false;
  }
};
</script>

<template>
  <div class="settings">
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
          <li v-for="{ timestamp, error } in logs" :key="timestamp" class="ip-item">
            <strong>{{ timestamp }}:</strong>
            <span>{{ error }}</span>
          </li>
        </ul>
        <p v-else class="no-ips">No error logs found.</p>
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
  .no-ips {
    color: var(--vt-c-gray-300);
    font-size: 18px;
    font-weight: 500;
    text-align: center;
    font-family: 'Nunito';
  }
}
</style>
