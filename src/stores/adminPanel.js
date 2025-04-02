import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useAdminPanelStore = defineStore('adminPanel', () => {
  const isMobileModalOpen = ref(false);

  function toggleMobileModal() {
    isMobileModalOpen.value = !isMobileModalOpen.value;
  }

  function closeMobileModal() {
    isMobileModalOpen.value = false;
  }

  return { isMobileModalOpen, toggleMobileModal, closeMobileModal };
});
