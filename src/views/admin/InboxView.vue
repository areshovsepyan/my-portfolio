<script setup>
import { ref, watch, onMounted } from 'vue';
import { admin } from '../../../utils/axios';
import toast from '../../../utils/toast';
import BaseLoader from '@/components/UI/BaseLoader.vue';
import TheHeader from '@/components/admin/TheHeader.vue';
import BasePaginator from '@/components/UI/BasePaginator.vue';

const isLoading = ref(false);
const isRotating = ref(false);
const inbox = ref([]);

const is_last_page = ref(false);
const page = ref(1);
const qty = ref(1);

onMounted(() => fetchInbox());

watch([page, qty], async () => await fetchInbox());

const formatISO = (iso) => {
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

const fetchInbox = async () => {
  try {
    isLoading.value = true;

    const { data } = await admin.get(`/inbox?page=${page.value}&qty=${qty.value}`);

    is_last_page.value = data.is_last_page;
    inbox.value = [...data.rows];
  } catch ({ error }) {
    toast.error(error);
  } finally {
    isLoading.value = false;
  }
};
const manualFetchInbox = async () => {
  try {
    if (isLoading.value) return;

    isRotating.value = true;

    await fetchInbox();
  } catch (error) {
    toast.error(error);
  } finally {
    isRotating.value = false;
  }
};
</script>

<template>
  <div class="inbox">
    <TheHeader title="Input" :onRefresh="manualFetchInbox" :isRotating="isRotating" />

    <div>
      <BaseLoader v-if="isLoading" :isLoading="isLoading" loader_type="code" />

      <div v-else>
        <ul v-if="inbox.length">
          <li v-for="row in inbox" :key="row.id">
            <div class="row">
              <b></b>
              <strong>{{ formatISO(row.created_at) }} / {{ row.template.user_country }}</strong>
            </div>

            <div class="row">
              <b>Name:</b>
              <p>{{ row.template.name }}</p>
            </div>
            <div class="row">
              <b>Email:</b>
              <p>{{ row.template.email }}</p>
            </div>
            <div class="row">
              <b>Message:</b>
              <p>{{ row.template.message }}</p>
            </div>
            <div class="row">
              <b>Device:</b>
              <p>{{ row.template.user_ip }} / {{ row.template.user_os }}</p>
            </div>
          </li>
        </ul>
        <p v-else class="no-items">Inbox is empty.</p>
      </div>
    </div>

    <BasePaginator
      v-if="inbox.length"
      :page="page"
      :itemsPerPage="qty"
      :isLastPage="is_last_page"
      :disabled="isLoading"
      @page-changed="(val) => (page = val)"
      @items-changed="(val) => (qty = val)"
    />
  </div>
</template>

<style lang="scss" scoped>
.inbox {
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;

  .paginator {
    margin-top: auto;
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 3rem;

    li {
      padding: 1rem 2.5rem;
      border-radius: 24px;
      box-shadow:
        0px 1px 2px rgba(0, 0, 0, 0.04),
        0px 3px 8px rgba(0, 0, 0, 0.12),
        0px 3px 8px rgba(0, 0, 0, 0.6);
    }
  }

  p,
  span {
    line-height: 1.5;
    font-size: 16px;
  }
  strong {
    font-size: 14px;
    color: var(--vt-c-purple-400);
  }
  .row {
    display: flex;
    justify-content: space-between;
    margin: 1rem 0;
    gap: 1rem;
  }
}
</style>
