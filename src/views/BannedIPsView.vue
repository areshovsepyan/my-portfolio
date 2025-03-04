<script setup>
import { admin } from '../../utils/axios';
import { ref, onMounted } from 'vue';
import BaseButton from '@/components/UI/BaseButton.vue';
import BaseLoader from '@/components/UI/BaseLoader.vue';
import { useToast } from 'vue-toastification';

const toast = useToast();

const isLoading = ref(false);
const isRotating = ref(false);
const bannedIPs = ref([]);

onMounted(() => fetchBannedIPs());

const fetchBannedIPs = async () => {
  try {
    isLoading.value = true;

    const { data } = await admin.get('banned-ips');

    bannedIPs.value = [...data.bannedIPs];
  } catch ({ error }) {
    toast.error(error);
  } finally {
    isLoading.value = false;
  }
};

const manualFetchBannedIPs = async () => {
  try {
    if (isLoading.value) return;

    isRotating.value = true;

    await fetchBannedIPs();
  } catch ({ error }) {
    toast.error(error);
  } finally {
    isRotating.value = false;
  }
};

const unbanIP = async (ip) => {
  try {
    isLoading.value = true;

    const { data } = await admin.delete(`banned-ips?ip=${ip}`);

    bannedIPs.value = [...data.bannedIPs];
    toast.success(data.message);
  } catch ({ error }) {
    toast.error(error);
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="settings">
    <div class="header-box">
      <h2 class="admin-header">Banned IPs</h2>
      <BaseButton @click="manualFetchBannedIPs()" btn_class="btn-icon">
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
        <ul v-if="bannedIPs.length">
          <li v-for="ip in bannedIPs" :key="ip" class="ip-item">
            <div class="dot"></div>
            <span>{{ ip }}</span>
            <BaseButton @click="unbanIP(ip)" btn_class="btn-admin">Unban</BaseButton>
          </li>
        </ul>
        <p v-else class="no-items">No banned IPs found.</p>
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
